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
 * @var $menus         \Lyrasoft\Luna\Menu\MenuNode
 */

$click = $click ?? false;
$fade = $fade ?? false;
$vertical = $vertical ?? false;
$dropdown = $dropdown ?? false;
$level = (int) ($level ?? 1);

if ($dropdown) {
    \Phoenix\Script\BootstrapScript::multiLevelMenu();
}
?>

<div class="c-luna-menu nav {{ $class ?? '' }} {{ $vertical ? 'flex-column' : '' }} {{ $click ? '' : 'dropdown-hover' }} {{ $fade ? 'drodown-fade' : '' }}"
    data-menu-id="{{ $menus->getValue()->id ?? '1' }}"
    data-level="1">
    @include('luna.menu.menu-items')
</div>
