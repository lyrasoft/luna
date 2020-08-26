<?php
/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

return [
    /*
     * Database table name.
     * ------------------------------------------------
     */
    'table' => [
        'categories' => 'categories',
        'articles' => 'articles',
        'tags' => 'tags',
        'tag_maps' => 'tag_maps',
        'languages' => 'languages',
        'contacts' => 'contacts',
        'pages' => 'pages',
        'configs' => 'configs',
        'menus' => 'menus',
    ],

    /*
     * The tags & categories type name to table mapping.
     * ------------------------------------------------
     */
    'type_table_map' => [
        'article' => 'articles'
    ],

    /*
     * The frontend package setting.
     * ------------------------------------------------
     */
    'frontend' => [
        'package' => 'front',
        'view' => [
            'extends' => '_global.html',
            'edit_extends' => '_global.html',
            'error_extends' => '_global.html'
        ],
        'redirect' => [
            'language' => 'home'
        ],
        'language' => [
            'prefix' => 'luna.',
            'enabled' => false,
            'default' => 'en-GB',
            'route' => false,
            'use_browser' => false
        ]
    ],

    /*
     * The backend package setting.
     * ------------------------------------------------
     */
    'admin' => [
        'package' => 'admin',
        'view' => [
            'extends' => '_global.admin.admin',
            'edit_extends' => '_global.admin.admin',
            'error_extends' => '_global.admin.admin'
        ],
        'redirect' => [
            'language' => 'articles'
        ],
        'language' => [
            'prefix' => 'luna.',
            'enabled' => false,
            'locale' => 'en-GB',
            'default' => 'en-GB',
            'route' => false,
            'use_browser' => false
        ]
    ],

    /*
     * The page builder configuration.
     * ------------------------------------------------
     */
    'page' => [
        'includes' => [

        ],
        'excludes' => [

        ],
        'extends' => [
            '_global.html' => 'luna.page.extends.global.html'
        ],
        'protects' => [
            'theme.'
        ],
        'styles' => [
            'font_size_unit' => 'px',
            'font_size_scale' => 1
        ]
    ],

    /*
     * The modules configuration.
     * ------------------------------------------------
     */
    'module' => [
        'includes' => [

        ],
        'excludes' => [

        ],
        'positions' => [

        ]
    ],

    /*
     * The menus configuration.
     * ------------------------------------------------
     */
    'menu' => [
        'types' => [
            'mainmenu' => 'luna.menu.type.mainmenu',
        ],

        'views' => [
            'link' => \Lyrasoft\Luna\Menu\View\LinkMenuView::class,
            'placeholder' => \Lyrasoft\Luna\Menu\View\PlaceholderMenuView::class,
            'route' => \Lyrasoft\Luna\Menu\View\RouteMenuView::class,
            'menu_alias' => \Lyrasoft\Luna\Menu\View\AliasMenuView::class,

            // Article
            'article' => \Lyrasoft\Luna\Menu\View\ArticleMenuView::class,
            'article_category' => \Lyrasoft\Luna\Menu\View\ArticleCategoryMenuView::class,
            'page' => \Lyrasoft\Luna\Menu\View\PageMenuView::class,
        ]
    ],

    'providers' => [
        'luna' => \Lyrasoft\Luna\Provider\LunaProvider::class,
        'menu' => \Lyrasoft\Luna\Menu\MenuService::class,
        'page_builder' => \Lyrasoft\Luna\PageBuilder\PageBuilder::class
    ],

    'listeners' => [
        'luna' => \Lyrasoft\Luna\Listener\LunaListener::class,
        'editor' => \Lyrasoft\Luna\Listener\EditorListener::class,
        'language' => \Lyrasoft\Luna\Listener\LanguageListener::class,
        'error' => \Lyrasoft\Luna\Listener\ErrorListener::class,
    ]
];
