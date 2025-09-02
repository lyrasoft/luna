<?php

declare(strict_types=1);

namespace App\Config;

use Lyrasoft\Luna\Captcha\CaptchaManager;
use Lyrasoft\Luna\Captcha\NullCaptchaDriver;
use Lyrasoft\Luna\LunaPackage;
use Windwalker\Core\Attributes\ConfigModule;

return #[ConfigModule(name: 'captcha', enabled: true, priority: 100, belongsTo: LunaPackage::class)]
static fn() => [

    'default' => env('CAPTCHA_DEFAULT') ?? 'none',

    'listeners' => [
    ],

    'providers' => [
    ],

    'factories' => [
        'instances' => [
            'google' => CaptchaManager::recaptcha(
                (string) env('RECAPTCHA_KEY'),
                (string) env('RECAPTCHA_SECRET'),
                (string) env('RECAPTCHA_TYPE', 'checkbox'),
            ),
            'image' => CaptchaManager::gregwar(),
            'none' => fn() => new NullCaptchaDriver(),
        ],
    ],
];
