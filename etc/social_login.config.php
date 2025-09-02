<?php

declare(strict_types=1);

namespace App\Config;

use Lyrasoft\Luna\LunaPackage;
use Windwalker\Core\Attributes\ConfigModule;

return #[ConfigModule(name: 'social_login', enabled: true, priority: 100, belongsTo: LunaPackage::class)]
static fn() => [
    'social_providers' => [
        'Facebook' => [
            'enabled' => false,
            'keys' => [
                'id' => env('FACEBOOK_SOCIAL_ID'),
                'secret' => env('FACEBOOK_SOCIAL_SECRET'),
            ],
            'scope' => 'email',
            'profile_handler' => \Lyrasoft\Luna\Auth\Profile\FacebookProfileHandler::class,
        ],
        'Google' => [
            'enabled' => false,
            'keys' => [
                'id' => env('GOOGLE_SOCIAL_ID'),
                'secret' => env('GOOGLE_SOCIAL_SECRET'),
            ],
            'scope' => 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            'profile_handler' => \Lyrasoft\Luna\Auth\Profile\GoogleProfileHandler::class,
        ],
    ],
];
