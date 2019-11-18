<?php
/**
 * Part of Windwalker project.
 *
 * @copyright  Copyright (C) 2019 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

use Windwalker\Core\Router\RouteCreator;

/** @var $router RouteCreator */

// Article
$router->any('article', '/post/(id)-(alias)')
    ->controller('Article')
    ->requirements([
        'id' => '\\d+',
    ])
    ->extraValues([
        'layout' => 'article',
        'category' => [
            'type' => 'article'
        ],
        'active' => [
            'manimenu' => 'articles'
        ],
    ]);

// Article Category
$router->any('article_category', '/category/(*path)')
    ->controller('Category')
    ->requirements([
        'page' => '\\d+',
    ])
    ->extraValues([
        'layout' => 'category',
        'category' => [
            'type' => 'article',
            'repository' => 'Articles',
            'view' => 'Category',
            'ordering' => 'article.created',
            'direction' => 'DESC',
            'limit' => 15,
            'deep' => 1
        ],
        'active' => [
            'manimenu' => 'category'
        ],
    ]);

// Article Tag
$router->any('article_tag', '/article-tag/(tag)(/page)')
    ->controller('Category')
    ->extraValues([
        'layout' => 'category',
        'category' => [
            'type' => 'article'
        ],
        'active' => [
            'manimenu' => 'tag'
        ],
    ]);

// Page Root
$router->any('page_root', '/page')
    ->controller('Page')
    ->extraValues([
        'layout' => 'page',
        'active' => [
            'mainmenu' => 'pages'
        ],
    ]);

// Page
$router->any('page', '/page/(*path)')
    ->controller('Page')
    ->extraValues([
        'layout' => 'page',
        'active' => [
            'mainmenu' => 'pages'
        ],
    ]);

// Menu
$router->any('menu_to', '/_menu/to(/id)')
    ->controller(\Lyrasoft\Luna\Controller\Menu\MenuRedirectController::class);

// Change Language
$router->any('change_language', '/language/checkout/(lang)')
    ->controller('Language')
    ->allActions('ChangeController');

// Contact
$router->any('contact', '/contact')
    ->controller('Contact')
    ->extraValues([
        'layout' => 'contact',
        'active' => [
            'mainmenu' => 'contact'
        ],
    ]);

//  Captcha Image
$router->any('_captcha_image', '/_captcha/image')
    ->controller('Captcha')
    ->allActions('CaptchaImageController');

//  Luna Img Upload
$router->any('_luna_img_upload', '/_luna/image/upload')
    ->controller('Luna')
    ->saveAction('ImageUploadController')
    ->middleware(\Lyrasoft\Warder\Middleware\RequireLoginMiddleware::class)
    ->extra('warder', [
        'require_login' => true
    ]);
