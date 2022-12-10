<?php

declare(strict_types=1);

namespace App\View;

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

use Lyrasoft\Luna\PageBuilder\Renderer\AbstractPageRenderer;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\DOM\DOMElement;

$options = $row->extract('options');

$container = $options->getDeep('fluid_row') ? 'container-full' : 'container';
$noGutter = $options->getDeep('no_gutter') ? 'no-gutters' : '';

$classes = [];
$attrs = [];

$classes[] = implode(' ', $options->getDeep('display'));
$classes[] = $options->getDeep('html_class');

/** @var AbstractPageRenderer $pageRenderer */
$pageRenderer->prepareElement($options, $classes, $attrs);

$classes = array_filter($classes, '\strlen');

?>
<section id="{{ $row->getDeep('options.html_id') }}" class="l-section l-bg-container {{ implode(' ', $classes) }}"
    uni-page-edit="row"
    data-path="{{ $path }}"
    {!! DOMElement::buildAttributes($attrs) !!}>
    @if ($options->getDeep('background.type') === 'image' && $options->getDeep('background.overlay'))
        <div class="l-bg-overlay"></div>
    @endif
    <div class="l-section__container l-bg-content {{ $container }}">
        <div class="l-section__body">
            @if ($options->getDeep('title.text') !== '')
                <div class="l-section__header c-box-header">
                    <{{ $options->getDeep('title.element') ?: 'h3' }} class="l-section__title c-box-header__title">
                    {{ $options->getDeep('title.text') }}
                </{{ $options->getDeep('title.element') ?: 'h3' }}>
                <p class="l-section__subtitle c-box-header__subtitle">
                    {{ $options->getDeep('subtitle.text') }}
                </p>
        </div>
        @endif

        <div
            class="row {{ $noGutter }} l-section__row l-section__content justify-content-{{ $options->getDeep('justify_content') }}">
            @foreach ($row['columns'] as $i => $column)
                @if ($column['disabled'])
                    @continue
                @endif

                {!! $pageRenderer->getFactory()->createRenderer('column')->render($column, $path . '.columns.' . $i) !!}
            @endforeach
        </div>
    </div>
    </div>
</section>
