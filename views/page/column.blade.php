<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $view      ViewModel       The view modal object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$options = $col->extract('options');

$classes = [];
$attrs = [];

$classes[] = $options->getDeep('html_class');

$pageRenderer->prepareElement($options, $classes, $attrs);

$classes = array_filter($classes, '\strlen');
?>
<div class="l-column {{ implode(' ', array_filter($options->getDeep('width'), 'strlen')) }}"
    uni-page-edit="column"
    data-path="{{ $path }}"
>
    <div id="{{ $options->getDeep('html_id') }}" class="l-column__body {{ implode(' ', $classes) }}"
        {!! \Windwalker\DOM\DOMElement::buildAttributes($attrs) !!}>
        @if ($options->getDeep('background.overlay'))
            <div class="l-bg-overlay"></div>
        @endif

        <div class="l-column__content l-bg-content">
            @foreach ($col['addons'] as $i => $addon)
                @if ($addon['disabled'])
                    @continue
                @endif

                @if (isset($addon['is']) && $addon['is'] === 'addon')
                    {!! $pageRenderer->getFactory()->createRenderer('addon')->render($addon, $path . '.addons.' . $i) !!}
                @else
                    @php($addon['child'] = true)
                    {!! $pageRenderer->getFactory()->createRenderer('row')->render($addon, $path . '.addons.' . $i) !!}
                @endif
            @endforeach
        </div>
    </div>
</div>
