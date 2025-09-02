<?php

declare(strict_types=1);

namespace App\Config;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Subscriber\AutoOpenGraphSubscriber;
use Lyrasoft\Luna\Subscriber\BuildFormFieldSubscriber;
use Lyrasoft\Luna\Subscriber\EntityBuildingSubscriber;
use Lyrasoft\Luna\Subscriber\LocaleSubscriber;
use Lyrasoft\Luna\User\Handler\SessionDatabaseHandler;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ConfigModule;
use Windwalker\Core\Console\ConsoleApplication;
use Windwalker\Core\Router\Navigator;
use Windwalker\Session\Handler\DatabaseHandler;

return #[ConfigModule(name: 'luna', enabled: true, priority: 100, belongsTo: LunaPackage::class)]
static fn() => [
    'providers' => [
        LunaPackage::class,
    ],

    'listeners' => [
        ConsoleApplication::class => [
            EntityBuildingSubscriber::class,
            BuildFormFieldSubscriber::class,
        ],
        AppContext::class => [
            LocaleSubscriber::class,
            AutoOpenGraphSubscriber::class,
        ],
    ],

    'aliases' => [
        DatabaseHandler::class => SessionDatabaseHandler::class,
    ],

    'view_extends' => [
        'front' => [
            'base' => 'global.body',
            'auth' => 'global.auth',
            'error' => 'global.body',
        ],

        'admin' => [
            'base' => 'admin.global.body',
            'auth' => 'admin.global.auth',
            'edit' => 'admin.global.body-edit',
            'list' => 'admin.global.body-list',
            'modal' => 'admin.global.pure',
            'error' => 'admin.global.pure',
        ],
    ],

    'i18n' => [
        'enabled' => false,
        'uri_prefix' => true,
        'front' => [
            'enabled' => true,
        ],
        'admin' => [
            'enabled' => false,
        ],
        'types' => [
            'article' => [
                'edit_route' => function (Navigator $nav, Article $item) {
                    return $nav->to('article_edit')->id($item->getId());
                },
            ],
        ],
    ],

    'error' => [
        'route' => 'front::home',
        'layout' => null,
    ],
];
