<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Firebase\JWT\SignatureInvalidException;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Router\Navigator;
use Windwalker\ORM\ORM;

class ActivationServiceTest extends TestCase
{
    private function createService(string $secret = 'secret-a'): ActivationService
    {
        $app = $this->createStub(AppContext::class);
        // HS256 requires a key of at least 32 bytes.
        $app->method('getSecret')->willReturn(str_pad($secret, 32, '_'));

        return new ActivationService(
            $this->createStub(UserService::class),
            $app,
            $this->createStub(ORM::class),
            $this->createStub(Navigator::class),
            $this->createStub(RendererService::class),
        );
    }

    #[Test]
    public function tokenRoundTripKeepsDefaultUserInfo(): void
    {
        $service = $this->createService();
        $user = (object) ['id' => 7, 'email' => 'user@example.com'];

        $token = $service->createToken($user);
        $payload = $service->decodeToken($token);

        self::assertSame(['email' => 'user@example.com', 'id' => 7], [
            'email' => $payload['email'],
            'id' => $payload['id'],
        ]);
    }

    #[Test]
    public function createTokenUsesCustomUserInfoGetter(): void
    {
        $service = $this->createService();
        $service->setUserInfoGetter(
            static fn(object $user): array => ['uid' => $user->id]
        );

        $payload = $service->decodeToken($service->createToken((object) ['id' => 3, 'email' => 'x']));

        self::assertSame(3, $payload['uid']);
        self::assertArrayNotHasKey('email', $payload);
    }

    #[Test]
    public function getUserInfoGetterReturnsCustomGetterWhenSet(): void
    {
        $service = $this->createService();
        $getter = static fn(object $user): array => ['custom' => true];

        $service->setUserInfoGetter($getter);

        self::assertSame($getter, $service->getUserInfoGetter());
    }

    #[Test]
    public function decodeTokenRejectsTokenSignedWithOtherSecret(): void
    {
        $token = $this->createService('secret-a')
            ->createToken((object) ['id' => 1, 'email' => 'a@example.com']);

        $this->expectException(SignatureInvalidException::class);

        $this->createService('secret-b')->decodeToken($token);
    }
}
