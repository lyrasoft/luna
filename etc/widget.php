<?php

declare(strict_types=1);

use Lyrasoft\Luna\Widget\Custom\CustomHtmlWidget;

return [
    'widget' => [
        'types' => [
            'custom_html' => CustomHtmlWidget::class,
        ],
        'positions' => [
            'demo' => 'Demo'
        ]
    ]
];
