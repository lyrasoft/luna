<?php

declare(strict_types=1);

namespace App\Config;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Menu\View\AliasMenuView;
use Lyrasoft\Luna\Menu\View\ArticleCategoryMenuView;
use Lyrasoft\Luna\Menu\View\ArticleMenuView;
use Lyrasoft\Luna\Menu\View\LinkMenuView;
use Lyrasoft\Luna\Menu\View\PageMenuView;
use Lyrasoft\Luna\Menu\View\PlaceholderMenuView;
use Lyrasoft\Luna\Menu\View\RouteMenuView;
use Windwalker\Core\Attributes\ConfigModule;

return #[ConfigModule(name: 'menu', enabled: true, priority: 100, belongsTo: LunaPackage::class)]
static fn() => [
    'views' => [
        // Core
        AliasMenuView::class,
        LinkMenuView::class,
        PlaceholderMenuView::class,
        RouteMenuView::class,

        // Article
        ArticleCategoryMenuView::class,
        ArticleMenuView::class,

        // Page
        PageMenuView::class,
    ],

    'types' => [
        'mainmenu' => 'luna.menu.type.mainmenu',
    ],
];
