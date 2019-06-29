{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view          \Windwalker\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Core\Asset\AssetManager         The Asset manager.
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
