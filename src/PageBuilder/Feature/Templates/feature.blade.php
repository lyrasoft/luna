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
 * @var $addon      \Lyrasoft\Luna\PageBuilder\Feature\FeatureAddon
 * @var $classes    array
 * @var $attrs      array
 * @var $content    \Windwalker\Legacy\Structure\Structure
 * @var $options    \Windwalker\Legacy\Structure\Structure
 * @var $addonRenderer \Lyrasoft\Luna\PageBuilder\Renderer\AddonRenderer
 */

$text = $options['content'];

$text = \Windwalker\Legacy\Filter\OutputFilter::stripScript($text);
$text = \Windwalker\Legacy\Filter\OutputFilter::stripStyle($text);
?>

@extends('page.addon-wrapper')

@section('body')
    <div class="c-feature-icon text-center">
        @if ($options['link'] !== '' && in_array($options['link_element'], ['icon', 'both']))
            <a href="{{ $options['link'] }}">
        @endif

            @if ($options['layout_type'] === 'image')
                <img class="img-fluid" src="{{ $options['image'] }}" alt="{{ $options['title.text'] }}">
            @else
                <span class="c-feature-icon__wrapper">
                    <span class="{{ $options['icon.name'] }}"></span>
                </span>
            @endif

        @if ($options['link'] !== '' && in_array($options['link_element'], ['icon', 'both']))
            </a>
        @endif
    </div>

    @if ($options['title.text'] !== '')
        <div class="c-addon__header c-box-header">
            @if ($options['link'] !== '' && in_array($options['link_element'], ['title', 'both']))
                <a href="{{ $options['link'] }}">
            @endif

                <{{ $options['title.element'] ?: 'h3' }} class="c-addon__title c-box-header__title">
                    {{ $options['title.text'] }}
                </{{ $options['title.element'] ?: 'h3' }}>

            @if ($options['link'] !== '' && in_array($options['link_element'], ['title', 'both']))
                </a>
            @endif
        </div>
    @endif

    <div class="c-addon__content-text">
        {!! $text !!}
    </div>
@stop
