<?php

declare(strict_types=1);

namespace App\Config;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Subscriber\AdminSessionSubscriber;
use Lyrasoft\Luna\Subscriber\RememberMeSubscriber;
use Lyrasoft\Luna\Subscriber\UserAuthSubscriber;
use Lyrasoft\Luna\Subscriber\UserSwitchSubscriber;
use Lyrasoft\Luna\User\Handler\UserHandler;
use Lyrasoft\Luna\User\Handler\UserHandlerInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ConfigModule;

return #[ConfigModule(name: 'user', enabled: true, priority: 100, belongsTo: LunaPackage::class)]
static fn() => [
    'login_name' => 'email',

    'entity' => User::class,

    'remember' => [
        'enabled' => false,
        'expires' => '+100days',
        'cookie_name' => 'WINDWALKER_REMEMBER',
        'clear_probability' => 1,
        'clear_divisor' => 100,
    ],

    'srp' => [
        'enabled' => false,
        'prime' => null,
        'generator' => null,
        'key' => null,
        'hasher' => 'sha256',
        'size' => 256,
    ],

    'bindings' => [
        UserHandlerInterface::class => UserHandler::class,
    ],

    'listeners' => [
        AppContext::class => [
            AdminSessionSubscriber::class,
            UserSwitchSubscriber::class,
        ],

        UserService::class => [
            UserAuthSubscriber::class,
            RememberMeSubscriber::class,
        ],
    ],

    'providers' => [
        //
    ],
];
