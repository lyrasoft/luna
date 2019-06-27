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

$link = ($link === $viewInstance::NO_LINK || (string) $link === '') ? false : $link;
?>

@if ($level === 1)
    <li class="nav-item {{ $hasChildren ? 'dropdown' : '' }}"
        data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
        <a @attr('href', $link)
            class="nav-link {{ $hasChildren ? 'dropdown-toggle' : '' }} {{ $menu->isActive(true) ? 'active' : '' }}"
            @attr('target', $link ? $menu->getValue()->target : false)
            @attr('data-toggle', $click && $hasChildren ? 'doprdown' : false)>
            {{ $menu->getValue()->title }}
        </a>

        @if ($hasChildren)
            <ul class="dropdown-menu"
                data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
                @include('luna.menu.submenu-items', ['menus' => $menu, 'level' => $level + 1])
            </ul>
        @endif
    </li>
@else
    <li class="{{ $hasChildren ? 'dropdown-submenu' : '' }}"
        data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
        <a @attr('href', $link)
            class="dropdown-item {{ $menu->isActive(true) ? 'active' : '' }}"
            target="{{ $menu->getValue()->target }}"
            @attr('target', $link ? $menu->getValue()->target : false)
        >
            {{ $menu->getValue()->title }}
        </a>

        @if ($hasChildren)
            <ul class="dropdown-menu"
                data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
                @include('luna.menu.submenu-items', ['menus' => $menu, 'level' => $level + 1])
            </ul>
        @endif
    </li>
@endif
