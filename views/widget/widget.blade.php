<?php

declare(strict_types=1);

namespace App\View;

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

use Lyrasoft\Luna\Widget\AbstractWidget;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Core\View\View;
use Windwalker\Edge\Component\ComponentAttributes;

/**
 * @var $widget     AbstractWidget
 * @var $attributes ComponentAttributes
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
$view = $app->service(View::class, ['viewModel' => $widget]);
?>

<div {!! $attributes->class('c-widget-wrapper') !!}>
    {!! $widget->render($view, $data) !!}
</div>
