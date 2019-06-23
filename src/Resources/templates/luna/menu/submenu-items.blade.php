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
?>

<ul class="dropdown-menu">
    @foreach ($menus->getChildren() as $menu)
        @php($hasChildren = $menu->hasChildren())
        <li class="{{ $hasChildren ? 'dropdown-submenu' : '' }}">
            <a href="{{ $menu->route($router) }}" class="dropdown-item  {{ $menu->isActive(true) ? 'active' : '' }}">
                {{ $menu->getValue()->title }}
            </a>

            @if ($menu->hasChildren())
                @include('luna.menu.submenu-items', ['menus' => $menu])
            @endif
        </li>
    @endforeach
</ul>
