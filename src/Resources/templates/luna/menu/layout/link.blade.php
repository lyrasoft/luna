{{-- Part of csie project. --}}
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
 * @var $viewInstance \Lyrasoft\Luna\Menu\AbstractMenuView
 */

$level = (int) ($level ?? 1);
$maxLevel = $maxLevel ?? 0;

$click = $click ?? false;
$dropdown = $dropdown ?? false;

$hasChildren = $menu->hasVisibleChildren() && (!$maxLevel || $level < $maxLevel);
$link = $menu->route($router);
?>

@if ($dropdown)
    @include('luna.menu.layout.link-dropdown', ['link' => $link])
@else
    @include('luna.menu.layout.link-nav', ['link' => $link])
@endif
