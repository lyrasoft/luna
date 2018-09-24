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
 * @var $addon      \Lyrasoft\Luna\PageBuilder\Text\TextAddon
 * @var $classes    array
 * @var $attrs      array
 * @var $content    \Windwalker\Structure\Structure
 * @var $options    \Windwalker\Structure\Structure
 * @var $addonRenderer \Lyrasoft\Luna\PageBuilder\Renderer\AddonRenderer
 */

$text = $options['content'];

$text = \Windwalker\Filter\OutputFilter::stripScript($text);
$text = \Windwalker\Filter\OutputFilter::stripStyle($text);
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

    <p class="c-addon__content-text">
        {!! $text !!}
    </p>
@stop
