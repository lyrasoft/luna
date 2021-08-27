<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Auth;

use Lyrasoft\Luna\User\UserService;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Attributes\TaskMapping;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Utilities\Base64Url;

/**
 * The AuthController class.
 */
#[Controller(
    // config: 'auth.config.php'
)]
#[TaskMapping(
    tasks: [
        'save' => 'login'
    ]
)]
class AuthController
{
    use TranslatorTrait;

    public function login(AppContext $app, UserService $userService, Navigator $nav)
    {
        if ($userService->getUser()->isLogin()) {
            return $nav->to('home');
        }

        [$email, $password] = $app->input('email', 'password')->values();
        
        $result = $userService->attemptToLogin(compact('email', 'password'), $resultSet);
        
        if (!$result) {
            /** @var ResultSet $resultSet */
            $app->addMessage(
                $this->trans(
                    'warder.login.message.' . $resultSet->first()->getStatus()
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
}
