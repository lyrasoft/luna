{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package       \Windwalker\Legacy\Core\Package\AbstractPackage    Package object.
 * @var $view          \Windwalker\Legacy\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Legacy\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 */

/**
 * @var $menu \Lyrasoft\Luna\Menu\MenuNode
 * @var $viewInstance \Lyrasoft\Luna\Menu\AbstractMenuView|\Lyrasoft\Luna\Menu\SelfRenderMenuInterface
 */

$variables = $menu->variables;
?>

<li class="text-muted d-block m-4"
    data-menu-id="{{ $menu->getValue()->id }}"
    data-lavel="{{ $menu->getDepth() }}">
    <div class="menu-placeholder-text">
        {!! html_escape($variables['text'] === '' ? $menu->getValue()->title : $variables['text'], true) !!}
    </div>
</li>
