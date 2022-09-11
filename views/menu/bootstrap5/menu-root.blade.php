<?php

declare(strict_types=1);

namespace App\View;

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

use Lyrasoft\Luna\Menu\Tree\MenuNodeInterface;
use Lyrasoft\Luna\Services\MenuService;
use Unicorn\Script\BootstrapScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;
use Windwalker\Edge\Component\ComponentAttributes;

$click = $click ?? false;
$fade = $fade ?? false;
$vertical = $vertical ?? false;
$dropdown = $dropdown ?? false;
$level = (int) ($level ?? 1);
$tag ??= 'ul';
$menu ??= 'mainmenu';

$menuService = $app->service(MenuService::class);

if (is_string($menu)) {
    $menu = $menuService->getMenusTree($menu);
}

$attributes ??= new ComponentAttributes();
$attributes = $attributes->exceptProps(
    [
        'click',
        'fade',
        'vertical',
        'dropdown',
        'level',
        'tag',
        'root',
        'menu',
        'start',
        'end'
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
    $app->service(BootstrapScript::class)->multiLevelMenu();
}

/**
 * @var MenuNodeInterface $root
 */
?>

<{{ $tag }} {!! $attributes !!}
    data-menu-id="{{ $menu->getValue()?->getId() }}"
data-level="1">
{!! $start ?? '' !!}

@if ($slot)
    {!! $slot !!}
@else
    @include('@menu::menu-items', ['parent' => $menu])
@endif

{!! $end ?? '' !!}
</{{ $tag }}>
