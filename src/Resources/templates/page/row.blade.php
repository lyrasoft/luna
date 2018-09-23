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
 * @var $builder  \Lyrasoft\Luna\PageBuilder\PageBuilder
 */

$options = $row->extract('options');

$container = $options['fluid_row'] ? 'container-fluid' : 'container';
$noGutter = $options['no_gutter'] ? 'no-gutters' : '';

$classes = [];
$attrs = [];

$classes[] = implode(' ', $options['display']);
$classes[] = $options['html_class'];

if ($options['animation.name'] !== '') {
    \Lyrasoft\Luna\Script\LunaScript::wow(true);
    \Lyrasoft\Luna\Script\LunaScript::animate();

    $classes[] = 'wow';
    $classes[] = $options['animation.name'];

    $attrs['data-wow-duration'] = $options['animation.duration'] . 'ms';
    $attrs['data-wow-delay'] = $options['animation.delay'] . 'ms';
}

if ($options['background.type'] === 'video') {
    \Lyrasoft\Luna\Script\LunaScript::vide();

    $attrs['data-vide-bg'] = sprintf(
        'mp4: %s, poster: %s',
        $options['background.video.url'],
        $options['background.image.url']
    );
}
?>
<section id="{{ $row['options.html_id'] }}" class="l-section l-bg-container {{ implode(' ', $classes) }}"
    {!! \Windwalker\Dom\Builder\HtmlBuilder::buildAttributes($attrs) !!}>
    @if ($options['background.overlay'])
        <div class="l-bg-overlay"></div>
    @endif
    <div class="l-section__container l-bg-content {{ $container }}">
        @if ($options['title.text'] !== '')
            <div class="l-section__header">
                <{{ $options['title.element'] ?: 'h3' }} class="c-section-title">
                    {{ $options['title.text'] }}
                </{{ $options['title.element'] ?: 'h3' }}>
                <p class="c-section-subtitle">
                    {{ $options['subtitle.text'] }}
                </p>
            </div>
        @endif

        <div class="row {{ $noGutter }} l-section__row">
            @foreach ($row['columns'] as $column)
                C
            @endforeach
        </div>
    </div>
</section>

@shown($row['options'])
