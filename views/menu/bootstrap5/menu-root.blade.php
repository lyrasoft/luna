<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        MenuListView The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;

$click = $click ?? false;
$fade = $fade ?? false;
$vertical = $vertical ?? false;
$dropdown = $dropdown ?? false;
$level = (int) ($level ?? 1);
$tag ??= 'ul';
$menu ??= 'mainmenu';

$menuService = $app->service(\Lyrasoft\Luna\Services\MenuService::class);

if (is_string($menu)) {
    $menu = $menuService->getMenusTree($menu);
}

$attributes ??= new \Windwalker\Edge\Component\ComponentAttributes();
$attributes = $attributes->exceptProps(
    [
        'click',
        'fade',
        'vertical',
        'dropdown',
        'level',
        'tag',
        'root',
        'menu'
    ]
);
$attributes = $attributes->class('c-luna-menu nav');

if ($vertical) {
    $attributes = $attributes->class('flex-column');
}

if (!$click) {
    $attributes = $attributes->class('dropdown-hover');
}

if ($fade) {
    $attributes = $attributes->class('dropdown-fade');
}

if ($dropdown) {
    $app->service(\Unicorn\Script\BootstrapScript::class)->multiLevelMenu();
}

/**
 * @var \Lyrasoft\Luna\Menu\Tree\MenuNodeInterface $root
 */
?>

<{{ $tag }} {!! $attributes !!}
    data-menu-id="{{ $menu->getValue()?->getId() }}"
    data-level="1">
    @include('@menu::menu-items', ['parent' => $menu])
</{{ $tag }}>
