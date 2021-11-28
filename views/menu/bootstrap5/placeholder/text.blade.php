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
 * @var $item \Lyrasoft\Luna\Menu\MenuNode|\Lyrasoft\Luna\Menu\Tree\DbMenuNode
 * @var $viewInstance \Lyrasoft\Luna\Menu\AbstractMenuView|\Lyrasoft\Luna\Menu\SelfRenderMenuInterface
 */

$text = $item->getValue()?->getVariables()['text'] ?? '';
?>

<li class="text-muted d-block m-3"
    data-menu-id="{{ $item->getValue()?->getId() }}"
    data-lavel="{{ $item->getDepth() }}">
    <div class="menu-placeholder-text">
        @if ($item->getIcon())
            <span class="{{ $item->getIcon() }}"></span>
        @endif
        <span>{!! html_escape($text === '' ? $item->getTitle() : $text, true) !!}</span>
    </div>
</li>
