<?php

declare(strict_types=1);

namespace App\Routes;

use Lyrasoft\Luna\Module\Admin\Tag\TagController;
use Lyrasoft\Luna\Module\Admin\Tag\TagEditView;
use Lyrasoft\Luna\Module\Admin\Tag\TagListView;
use Windwalker\Core\Router\RouteCreator;

/** @var  RouteCreator $router */

$router->group('tag')
    ->extra('menu', ['sidemenu' => 'tag_list'])
    ->register(function (RouteCreator $router) {
        $router->any('tag_list', '/tag/list')
            ->controller(
                TagController::class,
                post: 'copy',
                put: 'filter',
                patch: 'batch',
            )
            ->view(TagListView::class);

        $router->any('tag_edit', '/tag/edit[/{id}]')
            ->controller(TagController::class)
            ->view(TagEditView::class);

        $router->any('tag_ajax', '/tag/task[/{task}]')
            ->controller(TagController::class, 'ajax');
    });
