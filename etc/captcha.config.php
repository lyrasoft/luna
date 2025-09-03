<?php

declare(strict_types=1);

namespace App\Config;

use Lyrasoft\Luna\Captcha\CaptchaFactory;
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
            'google' => static fn() => CaptchaFactory::recaptcha(
                (string) env('RECAPTCHA_KEY'),
                (string) env('RECAPTCHA_SECRET'),
                (string) env('RECAPTCHA_TYPE', 'checkbox'),
            ),
            'image' => static fn() => CaptchaFactory::gregwar(),
            'none' => static fn() => new NullCaptchaDriver(),
        ],
    ],
];
