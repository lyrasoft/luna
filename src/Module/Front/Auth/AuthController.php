<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Auth;

use Brick\Math\BigInteger;
use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Auth\SocialAuthService;
use Lyrasoft\Luna\Auth\SRP\SRPService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Module\Front\Registration\Form\RegistrationForm;
use Lyrasoft\Luna\Module\Front\Registration\RegistrationRepository;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\UserService;
use Unicorn\Attributes\Ajax;
use Unicorn\Controller\AjaxControllerTrait;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Attributes\JsonApi;
use Windwalker\Core\Attributes\TaskMapping;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Utilities\Base64Url;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

use function Windwalker\chronos;

/**
 * The AuthController class.
 */
#[Controller(
    // config: 'auth.config.php'
)]
#[TaskMapping(
    tasks: [
        'save' => 'login',
    ]
)]
class AuthController
{
    use TranslatorTrait;
    use AjaxControllerTrait;

    public function login(AppContext $app, UserService $userService, Navigator $nav, ORM $orm): RouteUri
    {
        if ($userService->getUser()->isLogin()) {
            return $nav->to('home');
        }

        $data = $app->input('user');

        // Social Login
        if ($provider = $app->input('provider')) {
            $data = compact('provider');
        }

        $result = $userService->attemptToLogin(
            $data,
            ['remember' => (bool) ($data['remember'] ?? false)],
            $resultSet
        );

        if (!$result) {
            /** @var ResultSet $resultSet */
            $authResult = $resultSet->getFirstFailure();
            $message = $authResult?->getException()?->getMessage();

            if (!$message) {
                $status = $authResult?->getStatus();

                if (
                    $status === AuthResult::INVALID_USERNAME
                    || $status === AuthResult::INVALID_PASSWORD
                    || $status === AuthResult::USER_NOT_FOUND
                ) {
                    $message = $this->trans('luna.login.message.invalid.credential');
                } else {
                    $message = $this->trans('luna.login.message.' . $authResult?->getStatus());
                }
            }

            $app->addMessage($message, 'warning');

            return $nav->to('login');
        }

        $app->addMessage($this->trans('luna.login.message.success'), 'success');

        $orm->updateWhere(
            User::class,
            ['last_login' => chronos()],
            ['id' => $userService->getCurrentUser()->getId()]
        );

        if ($return = $app->getState()->getAndForget('login_return')) {
            return $nav->createRouteUri(Base64Url::decode($return));
        }

        return $nav->to('home');
    }

    public function logout(UserService $userService, Navigator $nav): RouteUri
    {
        $userService->logout();

        return $nav->to('login');
    }

    public function register(
        AppContext $app,
        #[Autowire]
        RegistrationRepository $repository,
        UserService $userService,
        Navigator $nav,
    ): RouteUri {
        if ($userService->getUser()->isLogin()) {
            return $nav->to('home');
        }

        $user = $app->input('user');

        $rememberData = $user;
        unset($rememberData['password'], $rememberData['password2']);

        $app->getState()->remember('reg.data', $rememberData);

        /** @var User $user */
        try {
            $srpService = $app->retrieve(\Lyrasoft\Luna\Auth\SRP\SRPService::class);
            $user = $srpService->handleRegister($app, $user);

            $user = $repository->register($user, RegistrationForm::class);
        } catch (\Throwable $e) {
            $app->addMessage($e->getMessage(), 'warning');

            return $nav->to('registration');
        }

        $this->saveUserRoles($user, $userService->getAccessService());

        $app->getState()->forget('reg.data');

        if (env('MAIL_ENABLED')) {
            $repository->sendActivateMail($user->getId());
        }

        $app->addMessage($this->trans('luna.message.registration.success'), 'success');

        return $nav->to('login');
    }

    public function saveUserRoles(User $user, AccessService $accessService): void
    {
        $basicRoles = $accessService->getBasicRoles();

        $accessService->addRolesToUser($user, $basicRoles);
    }

    public function activate(
        AppContext $app,
        #[Autowire] RegistrationRepository $repository,
        Navigator $nav
    ): RouteUri {
        $token = $app->input('token');

        if (!$token) {
            return $nav->to('home');
        }

        $repository->activate($token);

        $app->addMessage($this->trans('luna.message.activate.success'), 'success');

        return $nav->to('login');
    }

    public function resend(
        AppContext $app,
        #[Autowire] RegistrationRepository $repository,
        Navigator $nav
    ): RouteUri {
        $email = $app->getState()->getAndForget(ActivationService::RE_ACTIVATE_SESSION_KEY);
        $user = $repository->getItem(compact('email'));

        if (!$user) {
            return $nav->to('home');
        }

        $repository->sendActivateMail($user->getId());

        $app->addMessage($this->trans('luna.message.registration.success'), 'success');

        return $nav->to('login');
    }

    #[JsonApi]
    public function accountCheck(AppContext $app, LunaPackage $lunaPackage, UserService $userService): array
    {
        $field = $app->input('field');
        $value = $app->input('value');

        if ($field !== 'email') {
            $field = $lunaPackage->getLoginName() ?? 'username';
        }

        $user = $userService->load([$field => $value]);

        return ['exists' => (bool) $user];
    }

    public function socialAuth(
        string $provider,
        AppContext $app,
        SocialAuthService $socialAuth,
        UserService $userService,
        Navigator $nav,
    ): RouteUri {
        if (($msg = $app->input('error_message')) || $app->input('error_code')) {
            if ($msg) {
                $app->addMessage($msg, 'warning');
            }

            return $nav->to('login');
        }

        $result = $socialAuth->auth($provider);

        if (!$result) {
            return $nav->to('login');
        }

        [$user, $map] = $result;

        $userService->login($user);

        return $nav->to('home');
    }

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

        $password = $user->getPassword();

        if ($srpService::shouldFallback($password)) {
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

        $password = $user->getPassword();

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
