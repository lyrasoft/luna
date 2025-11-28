<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth\SRP;

use Brick\Math\BigInteger;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\User\UserService;
use Unicorn\Attributes\Ajax;
use Windwalker\Core\Application\AppContext;

trait SRPControllerTrait
{
    #[Ajax]
    public function srpChallenge(
        AppContext $app,
        LunaPackage $luna,
        UserService $userService,
        SRPService $srpService,
    ): ?array {
        if (!$srpService->isEnabled()) {
            return null;
        }

        $identity = $app->input('identity');

        $loginName = $luna->getLoginName();

        /** @var User $user */
        $user = $userService->load([$loginName => $identity]);

        if (!$user) {
            return null;
        }

        $password = $user->password;

        if (!$srpService::isValidSRPHash($password)) {
            return [
                'salt' => '',
                'B' => '',
                'fallback' => true,
            ];
        }

        $pf = $srpService::decodePasswordVerifier($password);

        $e = $srpService->step1($identity, $pf->salt, $pf->verifier);

        return [
            'salt' => $pf->salt->toBase(16),
            'B' => $e->public->toBase(16),
            'fallback' => false,
        ];
    }

    #[Ajax]
    public function srpAuthenticate(
        AppContext $app,
        LunaPackage $luna,
        UserService $userService,
        SRPService $SRPService
    ): array {
        [$identity, $A, $M1] = $app->input('identity', 'A', 'M1')->values();

        $loginName = $luna->getLoginName();

        /** @var User $user */
        $user = $userService->mustLoad([$loginName => $identity]);

        $password = $user->password;

        $pf = $SRPService::decodePasswordVerifier($password);

        $A = BigInteger::fromBase($A, 16);
        $M1 = BigInteger::fromBase($M1, 16);

        $result = $SRPService->step2(
            $identity,
            $pf->salt,
            $pf->verifier,
            $A,
            $M1
        );

        return [
            'key' => $result->key->toBase(16),
            'proof' => $result->proof->toBase(16),
        ];
    }
}
