<?php

declare(strict_types=1);

namespace App\Routes;

use Lyrasoft\Luna\Module\Front\Article\ArticleItemView;
use Lyrasoft\Luna\Module\Front\Article\ArticleListView;
use Windwalker\Core\Router\RouteCreator;

/** @var RouteCreator $router */

$router->group('article')
    ->register(
        function (RouteCreator $router) {
            $router->get('article_category', '/articles[/{path:.+}]')
                ->view(ArticleListView::class);

            $router->get('article_item', '/article/{id:\d+}-{alias}')
                ->view(ArticleItemView::class);
        }
    );
