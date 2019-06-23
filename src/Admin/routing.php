<?php
/**
 * Part of Windwalker project.
 *
 * @copyright  Copyright (C) 2019 __ORGANIZATION__.
 * @license    __LICENSE__
 */

use Windwalker\Core\Router\RouteCreator;

/** @var $router RouteCreator */

// Category
$router->any('category', '/category/(type)(/id)')
    ->controller('Category')
    ->extraValues([
        'layout' => 'category',
        'active' => [
            'mainmenu' => 'categories'
        ],
    ]);

// Categories
$router->any('categories', '/categories/(type)')
    ->controller('Categories')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'categories',
        'active' => [
            'mainmenu' => 'categories'
        ],
    ]);

// Article
$router->any('article', '/article(/id)')
    ->controller('Article')
    ->extraValues([
        'layout' => 'article',
        'active' => [
            'mainmenu' => 'articles'
        ],
    ]);

// Articles
$router->any('articles', '/articles')
    ->controller('Articles')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'articles',
        'active' => [
            'mainmenu' => 'articles'
        ],
    ]);

// Tag
$router->any('tag', '/tag(/id)')
    ->controller('Tag')
    ->extraValues([
        'layout' => 'tag',
        'active' => [
            'mainmenu' => 'tags'
        ],
    ]);

// Tags
$router->any('tags', '/tags')
    ->controller('Tags')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'tags',
        'active' => [
            'mainmenu' => 'tags'
        ],
    ]);

// Comment
$router->any('comment', '/comment/(type)(/id)')
    ->controller('Comment')
    ->extraValues([
        'layout' => 'comment',
        'active' => [
            'mainmenu' => 'comments'
        ],
    ]);

// Comments
$router->any('comments', '/comments/(type)')
    ->controller('Comments')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'comments',
        'active' => [
            'mainmenu' => 'comments'
        ],
    ]);

// Language
$router->any('language', '/language(/id)')
    ->controller('Language')
    ->extraValues([
        'layout' => 'language',
        'active' => [
            'mainmenu' => 'languages'
        ],
    ]);

// Languages
$router->any('languages', '/languages')
    ->controller('Languages')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'languages',
        'active' => [
            'mainmenu' => 'languages'
        ],
    ]);

// Module
$router->any('module', '/module(/id)')
    ->controller('Module')
    ->extraValues([
        'layout' => 'module',
        'active' => [
            'mainmenu' => 'modules'
        ],
    ]);

// Modules
$router->any('modules', '/modules')
    ->controller('Modules')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'modules',
        'active' => [
            'mainmenu' => 'modules'
        ],
    ]);

// Contact
$router->any('contact', '/contact(/id)')
    ->controller('Contact')
    ->extraValues([
        'layout' => 'contact',
        'menu' => [
            'mainmenu' => 'contacts'
        ],
    ]);

// Contact Preview
$router->any('contact_preview', '/contact-preview')
    ->controller('Contact')
    ->extraValues([
        'format' => 'json',
    ]);

// Contacts
$router->any('contacts', '/contacts')
    ->controller('Contacts')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'contacts',
        'menu' => [
            'mainmenu' => 'contacts'
        ],
    ]);

// Page
$router->any('page', '/page(/id)')
    ->controller('Page')
    ->extraValues([
        'layout' => 'page',
        'menu' => [
            'mainmenu' => 'pages'
        ],
    ]);

// Pages
$router->any('pages', '/pages')
    ->controller('Pages')
    ->postAction('CopyController')
    ->patchAction('BatchController')
    ->putAction('FilterController')
    ->extraValues([
        'layout' => 'pages',
        'menu' => [
            'mainmenu' => 'pages'
        ],
    ]);

// Config
$router->any('config', '/config/(type)(/subtype)')
    ->controller('Config')
    ->extraValues([
        'layout' => 'config',
        'menu' => [
            'mainmenu' => 'config'
        ],
    ]);

// Menu
$router->group('menu')
    // Set menu active name
    ->extra('menu', ['mainmenu' => 'menus'])
    ->middleware(\Lyrasoft\Luna\Admin\Middleware\MenuTypeWebMiddleware::class)
    ->register(function (RouteCreator $router) {
        // Menu
        $router->any('menu', '/menu/(type)(/id)')
            ->controller('Menu')
            ->extra('layout', 'menu');

        // Menus
        $router->any('menus', '/menus/(type)')
            ->controller('Menus')
            ->postAction('CopyController')
            ->putAction('FilterController')
            ->patchAction('BatchController')
            ->extra('layout', 'menus');
    });

//  Luna Img Upload
$router->any('_luna_img_upload', '/_luna/image/upload')
    ->controller('Luna')
    ->saveAction('ImageUploadController');

//  Luna Ajax Tags
$router->any('_luna_ajax_tags', '/_luna/ajax/tags')
    ->controller('Lyrasoft\Luna\Admin\Controller\Luna\Ajax')
    ->getAction('TagsGetController');

//  Luna Ajax Tag
$router->any('_luna_ajax_tag', '/_luna/ajax/tag')
    ->controller('Lyrasoft\Luna\Admin\Controller\Luna\Ajax')
    ->saveAction('TagSaveController');
