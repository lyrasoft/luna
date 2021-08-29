<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Auth;

use Lyrasoft\Luna\Module\Front\Registration\Form\RegistrationForm;
use Lyrasoft\Luna\Module\Front\Registration\RegistrationRepository;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Attributes\TaskMapping;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Utilities\Base64Url;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

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

    public function login(AppContext $app, UserService $userService, Navigator $nav): RouteUri
    {
        if ($userService->getUser()->isLogin()) {
            return $nav->to('home');
        }

        $data = $app->input('user');

        $result = $userService->attemptToLogin(
            $data,
            ['remember' => (bool) ($data['remember'] ?? false)],
            $resultSet
        );

        if (!$result) {
            /** @var ResultSet $resultSet */
            $app->addMessage(
                $this->trans(
                    'luna.login.message.' . $resultSet->getFirstFailure()?->getStatus()
                ),
                'warning'
            );

            return $nav->to('login');
        }

        $app->addMessage('Login success', 'success');

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
    ) {
        if ($userService->getUser()->isLogin()) {
            return $nav->to('home');
        }

        $user = $app->input('user');
        $app->getState()->remember('reg.data', $user);

        $user = $repository->register($user, RegistrationForm::class);

        $app->getState()->forget('reg.data');

        $repository->sendActivateMail($user->getId());

        $app->addMessage($this->trans('luna.message.registration.success'), 'success');

        return $nav->to('login');
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
}
