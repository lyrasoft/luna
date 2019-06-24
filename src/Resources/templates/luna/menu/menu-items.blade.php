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
 * @var $menus         \Lyrasoft\Luna\Menu\MenuNode
 */

\Phoenix\Script\BootstrapScript::multiLevelDropdown();

$click = $click ?? false;
?>

@foreach ($menus->getChildren() as $menu)
    @if ($menu->getValue()->hidden)
        @continue
    @endif

    @if ($menu->getViewInstance() instanceof \Lyrasoft\Luna\Menu\SelfRenderMenuInterface)
        {!! $menu->render(['click' => $click]) !!}
    @else
        @php($hasChildren = $menu->hasVisibleChildren())

        <li class="nav-item dropdown"
            data-menu-id="{{ $menu->getValue()->id }}">
            <a href="{{ $menu->route($router) }}"
                class="nav-link {{ $hasChildren ? 'dropdown-toggle' : '' }} {{ $menu->isActive(true) ? 'active' : '' }}"
                target="{{ $menu->getValue()->target }}"
                @attr('data-toggle', $click && $hasChildren ? 'dropdown' : false)>
                {{ $menu->getValue()->title }}
            </a>

            @if ($hasChildren)
                @include('luna.menu.submenu-items', ['menus' => $menu])
            @endif
        </li>
    @endif
@endforeach
