<?php

declare(strict_types=1);

namespace App\Routes;

use Lyrasoft\Luna\Module\Admin\User\UserController;
use Lyrasoft\Luna\Module\Admin\User\UserEditView;
use Lyrasoft\Luna\Module\Admin\User\UserListView;
use Windwalker\Core\Router\RouteCreator;

/** @var  RouteCreator $router */

$router->group('user')
    ->extra('menu', ['sidemenu' => 'user_list'])
    ->register(function (RouteCreator $router) {
        $router->any('user_list', '/user/list')
            ->controller(UserController::class)
            ->view(UserListView::class)
            ->postHandler('copy')
            ->putHandler('filter')
            ->patchHandler('batch');

        $router->any('user_edit', '/user/edit[/{id}]')
            ->controller(UserController::class)
            ->view(UserEditView::class);

        // Check Account
        $router->any('account_check', '/user/account/check')
            ->controller(UserController::class, 'accountCheck');
    });

$router->post('user_switch_recover', '/user/switch/recover')
    ->controller(UserController::class, 'recover');
