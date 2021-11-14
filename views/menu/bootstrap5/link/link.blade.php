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

/**
 * @var $item \Lyrasoft\Luna\Menu\MenuNode
 * @var $viewInstance \Lyrasoft\Luna\Menu\AbstractMenuView
 */

$level = (int) ($level ?? 1);
$maxLevel = $maxLevel ?? 0;

$click = $click ?? false;
$dropdown = $dropdown ?? false;

$hasChildren = $item->hasVisibleChildren() && (!$maxLevel || $level < $maxLevel);
$link = $item->route($nav);
?>

@if ($dropdown)
    @include('@menu::link.link-dropdown', ['link' => $link])
@else
    @include('@menu::link.link-nav', ['link' => $link])
@endif
