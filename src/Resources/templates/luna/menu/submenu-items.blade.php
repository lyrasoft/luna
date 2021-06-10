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
 * @var $menus         \Lyrasoft\Luna\Menu\MenuNode
 */

$level = $level ?? 2;
$dropdown = $dropdown ?? false;
$vertical = $vertical ?? false;
?>

@foreach ($menus->getChildren() as $menu)
    @if ($menu->getValue()->hidden)
        @continue
    @endif

    @php($viewInstance = $menu->getViewInstance())

    @if ($viewInstance instanceof \Lyrasoft\Luna\Menu\LayoutRenderedMenuInterface)
        @include($viewInstance->getLayout())
    @else
        @include('luna.menu.layout.link')
    @endif
@endforeach
