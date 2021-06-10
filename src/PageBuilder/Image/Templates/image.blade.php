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
 * @var $addon      \Lyrasoft\Luna\PageBuilder\Image\ImageAddon
 * @var $classes    array
 * @var $attrs      array
 * @var $content    \Windwalker\Legacy\Structure\Structure
 * @var $options    \Windwalker\Legacy\Structure\Structure
 * @var $addonRenderer \Lyrasoft\Luna\PageBuilder\Renderer\AddonRenderer
 */
?>

@extends('page.addon-wrapper')

@section('body')
    @if ($options['title.text'] !== '')
        <div class="c-addon__header c-box-header">
            <{{ $options['title.element'] ?: 'h3' }} class="c-addon__title c-box-header__title">
                {{ $options['title.text'] }}
            </{{ $options['title.element'] ?: 'h3' }}>
        </div>
    @endif

    @if ($options['link'] !== '')
        <a href="{{ $options['link'] }}" @attr('target', $options['link_target'])>
    @endif

            <img class="img-fluid c-image" src="{{ $options['image'] }}"
                alt="{{ $options['alt'] ?: $options['label'] ?: $options['title.text'] ?: 'Image' }}"
            >

    @if ($options['link'] !== '')
        </a>
    @endif
@stop
