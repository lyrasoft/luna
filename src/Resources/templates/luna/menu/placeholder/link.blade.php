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

$level = (int) $menu->getDepth();

$click = $params['click'] ?? false;
$dropdown = $dropdown ?? false;

$dropdownClass = $dropdown ? 'dropdown' : 'accordion-submenu';
$submenuToggleClass = $dropdown ? 'dropdown-toggle' : '';
$submenuDropdownClass = $dropdown ? 'dropdown-submenu' : 'accordion-submenu';
$submenuItemClass = $dropdown ? 'dropdown-item' : 'subnav-link';
?>

@php($hasChildren = $menu->hasVisibleChildren())
@php($link = $menu->route($router))

@if ($level === 1)
    <li class="nav-item {{ $hasChildren ? $dropdownClass : '' }}"
        data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $menu->getDepth() }}">
        <a @attr('href', $link === $viewInstance::NO_LINK ? false : $link)
            class="nav-link {{ $hasChildren ? $submenuToggleClass : '' }} {{ $menu->isActive(true) ? 'active' : '' }}"
            @attr('data-toggle', $click && $hasChildren ? 'dropdown' : false)
            >
            {{ $menu->getValue()->title }}
        </a>

        @if ($hasChildren)
            @include('luna.menu.submenu-items', ['menus' => $menu])
        @endif
    </li>
@else
    <li class="{{ $dropdown ? '' : 'subnav-item' }} {{ $hasChildren ? $submenuDropdownClass : '' }}"
        data-menu-id="{{ $menu->getValue()->id }}">
        <a @attr('href', $link === $viewInstance::NO_LINK ? false : $link)
            class="{{ $submenuItemClass }} {{ $menu->isActive(true) ? 'active' : '' }}"
            >
            {{ $menu->getValue()->title }}
        </a>

        @if ($hasChildren)
            @include('luna.menu.submenu-items', ['menus' => $menu])
        @endif
    </li>
@endif

