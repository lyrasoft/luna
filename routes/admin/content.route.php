<?php

declare(strict_types=1);

namespace App\Routes;

use Lyrasoft\Luna\Module\Admin\Article\ArticleController;
use Lyrasoft\Luna\Module\Admin\Article\ArticleEditView;
use Lyrasoft\Luna\Module\Admin\Article\ArticleListView;
use Unicorn\Middleware\KeepUrlQueryMiddleware;
use Windwalker\Core\Router\RouteCreator;

/** @var  RouteCreator $router */

$router->group('article')
    ->register(function (RouteCreator $router) {
        $router->any('article_list', '/article/list')
            ->controller(ArticleController::class)
            ->view(ArticleListView::class)
            ->postHandler('copy')
            ->putHandler('filter')
            ->patchHandler('batch');

        $router->any('article_edit', '/article[/{id}]')
            ->controller(ArticleController::class)
            ->view(ArticleEditView::class);
    });
