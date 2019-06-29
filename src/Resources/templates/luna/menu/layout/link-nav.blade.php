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

$id = $id ?? 'menu-' . uniqid();
$click = $click ?? false;
$vertical = $vertical ?? false;
$link = ($link === $viewInstance::NO_LINK || (string) $link === '') ? false : $link;
?>

@if ($level === 1)
    <li class="nav-item"
        data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
        <a @attr('href', $link)
            class="nav-link {{ $menu->isActive(true) ? 'active' : '' }}"
            @attr('target', $link ? $menu->getValue()->target : false)
            @attr('data-target', $click ? "#$id" : false)
            @attr('data-toggle', $click && $hasChildren ? 'collapse' : false)>
            {{ $menu->getValue()->title }}
        </a>

        @if ($hasChildren)
            <div id="{{ $id }}" class="{{ $click ? 'collapse' : '' }} subnav-container">
                <ul class="{{ $vertical ? 'subnav flex-column' : 'subnav' }} "
                    data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
                    @include('luna.menu.submenu-items', ['menus' => $menu, 'level' => $level + 1])
                </ul>
            </div>
        @endif
    </li>
@else
    <li class="subnav-item {{ $hasChildren ? 'accordion-submenu' : '' }}"
        data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
        <a @attr('href', $link)
            class="subnav-link {{ $menu->isActive(true) ? 'active' : '' }}"
            @attr('target', $link ? $menu->getValue()->target : false)
        >
            {{ $menu->getValue()->title }}
        </a>

        @if ($hasChildren)
            <div class="subnav-container">
                <ul class="{{ $vertical ? 'subnav flex-column' : 'subnav' }}"
                    data-menu-id="{{ $menu->getValue()->id }}" data-level="{{ $level }}">
                    @include('luna.menu.submenu-items', ['menus' => $menu, 'level' => $level + 1])
                </ul>
            </div>
        @endif
    </li>
@endif
