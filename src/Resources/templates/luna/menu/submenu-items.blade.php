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
