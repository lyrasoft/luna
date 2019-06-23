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
?>

@php($hasChildren = $menu->hasChildren())

@php($link = $menu->route($router))
<li class="{{ $hasChildren ? 'dropdown-submenu' : '' }}"
    data-menu-id="{{ $menu->getValue()->id }}">
    <a @attr('href', $link === $viewInstance::NO_LINK ? false : $link)
        class="dropdown-item"
    >
        {{ $menu->getValue()->title }}
    </a>

    @if ($menu->hasChildren())
        @include('luna.menu.submenu-items', ['menus' => $menu])
    @endif
</li>
