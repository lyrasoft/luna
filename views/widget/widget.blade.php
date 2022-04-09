<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

/**
 * @var $widget \Lyrasoft\Luna\Widget\AbstractWidget
 * @var $attributes \Windwalker\Edge\Component\ComponentAttributes
 */

$props = $attributes->props(
    'widget',
    'data'
);
$attributes->setAttributes(
    [
        'data-widget-id' => $widget->getData()->getId()
    ]
);

$data = $props['data'] ?: [];
$view = $app->service(\Windwalker\Core\View\View::class, ['viewModel' => $widget]);
?>

<div {!! $attributes->class('c-widget-wrapper') !!}>
    {!! $widget->render($view, $data) !!}
</div>
