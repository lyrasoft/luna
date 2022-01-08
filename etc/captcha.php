<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

use Lyrasoft\Luna\Captcha\CaptchaManager;
use Lyrasoft\Luna\Captcha\NullCaptchaDriver;

return [
    'captcha' => [
        'enabled' => true,

        'default' => env('CAPTCHA_DEFAULT') ?? 'none',

        'listeners' => [
        ],

        'providers' => [
        ],

        'factories' => [
            'instances' => [
                'google' => CaptchaManager::recaptcha(
                    env('RECAPTCHA_KEY'),
                    env('RECAPTCHA_SECRET'),
                    env('RECAPTCHA_TYPE', 'checkbox'),
                ),
                'image' => CaptchaManager::gregwar(),
                'none' => fn () => new NullCaptchaDriver()
            ]
        ]
    ]
];
