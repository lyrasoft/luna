<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2019 __ORGANIZATION__.
 * @license    __LICENSE__
 */

use Lyrasoft\Luna\Module\Front\Page\PageView;
use Windwalker\Core\Router\RouteCreator;

/** @var $router RouteCreator */

$router->group('page')
    ->register(
        function (RouteCreator $router) {
            $router->any('page', '/page/{path:.+}')
                ->view(PageView::class);
        }
    );
