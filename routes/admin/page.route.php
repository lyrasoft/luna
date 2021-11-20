<?php

namespace Lyrasoft\Luna\Routes;

use Lyrasoft\Luna\Module\Admin\Page\PageController;
use Lyrasoft\Luna\Module\Admin\Page\PageEditView;
use Lyrasoft\Luna\Module\Admin\Page\PageListView;
use Windwalker\Core\Router\RouteCreator;

/** @var  RouteCreator $router */

$router->group('page')
    ->register(function (RouteCreator $router) {
        $router->any('page_list', '/page/list')
            ->controller(PageController::class)
            ->view(PageListView::class)
            ->postHandler('copy')
            ->putHandler('filter')
            ->patchHandler('batch');

        $router->any('page_edit', '/page/edit[/{id}]')
            ->controller(PageController::class)
            ->view(PageEditView::class);
    });
