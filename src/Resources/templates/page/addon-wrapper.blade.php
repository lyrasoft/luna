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
 * @var $addon      \Lyrasoft\Luna\PageBuilder\AbstractAddon
 * @var $classes    array
 * @var $attrs      array
 * @var $content    \Windwalker\Structure\Structure
 * @var $options    \Windwalker\Structure\Structure
 * @var $addonRenderer \Lyrasoft\Luna\PageBuilder\Renderer\AddonRenderer
 */
?>
<div id="{{ $options['html_id'] }}" class="c-addon c-addon--{{ $content['type'] }} {{ implode(' ', $classes) }}"
    {!! \Windwalker\Dom\Builder\HtmlBuilder::buildAttributes($attrs) !!}>
    @if ($options['background.overlay'])
        <div class="l-bg-overlay"></div>
    @endif
    <div class="l-bg-content c-addon__body">
        @yield('body', 'Addon Body')
    </div>
</div>
