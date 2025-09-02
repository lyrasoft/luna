<?php

declare(strict_types=1);

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Widget\Custom\CustomHtmlWidget;
use Windwalker\Core\Attributes\ConfigModule;

return #[ConfigModule(name: 'widget', enabled: true, priority: 100, belongsTo: LunaPackage::class)]
static fn() => [
    'types' => [
        'custom_html' => CustomHtmlWidget::class,
    ],
    'positions' => [
        'demo' => 'Demo',
    ],
];
