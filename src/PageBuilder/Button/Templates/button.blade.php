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
 * @var $addon      \Lyrasoft\Luna\PageBuilder\Button\ButtonAddon
 * @var $classes    array
 * @var $attrs      array
 * @var $content    \Windwalker\Structure\Structure
 * @var $options    \Windwalker\Structure\Structure
 * @var $addonRenderer \Lyrasoft\Luna\PageBuilder\Renderer\AddonRenderer
 */

$btnClasses = [
    $options['style'],
    $options['size'],
    $options['block'] ? 'btn-block' : '',
];
?>

@extends('page.addon-wrapper')

@section('body')
    <a href="{{ $options['link'] }}" @attr('target', $options['link_target'])
        class="c-button btn {{ implode(' ', $btnClasses) }}">
        {{ $options['text'] }}
    </a>
@stop
