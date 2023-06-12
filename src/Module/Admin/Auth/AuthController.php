<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 LYRASOFT.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Auth;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Attributes\TaskMapping;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Utilities\Base64Url;
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

    public function login(AppContext $app, UserService $userService, Navigator $nav, ORM $orm): RouteUri
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

        $orm->updateWhere(
            User::class,
            ['last_login' => chronos()],
            ['id' => $userService->getCurrentUser()->getId()]
        );

        $app->addMessage($this->trans('luna.login.message.success'), 'success');

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
