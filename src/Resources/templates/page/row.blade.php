{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\Chronos           PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $row      \Windwalker\Structure\Structure
 * @var $pageRenderer \Lyrasoft\Luna\PageBuilder\Renderer\RowRenderer
 */

$options = $row->extract('options');

$container = $options['fluid_row'] ? 'container-full' : 'container';
$noGutter = $options['no_gutter'] ? 'no-gutters' : '';

$classes = [];
$attrs = [];

$classes[] = implode(' ', $options['display']);
$classes[] = $options['html_class'];

$pageRenderer::prepareElement($options, $classes, $attrs);

$classes = array_filter($classes, '\strlen');
?>
<section id="{{ $row['options.html_id'] }}" class="l-section l-bg-container {{ implode(' ', $classes) }}"
    {!! \Windwalker\Dom\Builder\HtmlBuilder::buildAttributes($attrs) !!}>
    @if ($options['background.overlay'])
        <div class="l-bg-overlay"></div>
    @endif
    <div class="l-section__container l-bg-content {{ $container }}">
        @if ($options['title.text'] !== '')
            <div class="l-section__header c-box-header">
                <{{ $options['title.element'] ?: 'h3' }} class="l-section__title c-box-header__title">
                    {{ $options['title.text'] }}
                </{{ $options['title.element'] ?: 'h3' }}>
                <p class="l-section__subtitle c-box-header__subtitle">
                    {{ $options['subtitle.text'] }}
                </p>
            </div>
        @endif

        <div class="row {{ $noGutter }} l-section__row">
            @foreach ($row['columns'] as $column)
                @if ($column['disabled'])
                    @continue
                @endif

                {!! $pageRenderer->getFactory()->create('column')->render($column) !!}
            @endforeach
        </div>
    </div>
</section>
