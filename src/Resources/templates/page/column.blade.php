{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view     \Windwalker\Legacy\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Legacy\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Legacy\Core\DateTime\Chronos           PHP DateTime object of current time.
 * @var $helper   \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $col      \Windwalker\Legacy\Structure\Structure
 * @var $pageRenderer \Lyrasoft\Luna\PageBuilder\Renderer\ColumnRenderer
 */

$options = $col->extract('options');

$classes = [];
$attrs = [];

$classes[] = $options['html_class'];

$pageRenderer::prepareElement($options, $classes, $attrs);

$classes = array_filter($classes, '\strlen');
?>
<div class="l-column {{ implode(' ', array_filter($options['width'], 'strlen')) }}">
    <div id="{{ $options['html_id'] }}" class="l-column__body {{ implode(' ', $classes) }}"
        {!! \Windwalker\Legacy\Dom\Builder\HtmlBuilder::buildAttributes($attrs) !!}>
        @if ($options['background.overlay'])
            <div class="l-bg-overlay"></div>
        @endif

        <div class="l-column__content l-bg-content">
            @foreach ($col['addons'] as $addon)
                @if ($addon['disabled'])
                    @continue
                @endif

                @if (isset($addon['is']) && $addon['is'] === 'addon')
                    {!! $pageRenderer->getFactory()->create('addon')->render($addon) !!}
                @else
                    @php($addon['child'] = true)
                    {!! $pageRenderer->getFactory()->create('row')->render($addon) !!}
                @endif
            @endforeach
        </div>
    </div>
</div>
