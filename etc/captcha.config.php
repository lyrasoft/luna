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
                (string) env('RECAPTCHA_TYPE') ?: 'invisible',
            ),
            'google_enterprise' => static fn() => CaptchaFactory::recaptchaEnterprise(
                (string) env('RECAPTCHA_ENTERPRISE_KEY'),
                (string) env('RECAPTCHA_ENTERPRISE_PROJECT_ID'),
                (string) env('RECAPTCHA_ENTERPRISE_API_KEY'),
                (string) env('RECAPTCHA_ENTERPRISE_TYPE') ?: 'checkbox',
                [
                    'min_score' => (float) (env('RECAPTCHA_ENTERPRISE_MIN_SCORE') ?: 0.5),
                ],
            ),
            'image' => static fn() => CaptchaFactory::gregwar(),
            'none' => static fn() => new NullCaptchaDriver(),
        ],
    ],
];
