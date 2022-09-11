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
use Lyrasoft\Luna\Menu\View\LinkMenuView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;

use function Windwalker\uid;

$id = $id ?? 'menu-' . uid();
$click = $click ?? false;
$vertical = $vertical ?? false;
$link = ($link === LinkMenuView::NO_LINK || (string) $link === '') ? false : $link;

/**
 * @var MenuNodeInterface $item
 */
?>

@if ($level === 1)
    <li class="nav-item"
        data-menu-id="{{ $item->getValue()?->getId() }}"
        data-level="{{ $level }}"
    >
        <a class="nav-link {{ $item->isActive(true) ? 'active' : '' }}"
            @attr('href', $link)
            @attr('target', $link ? (string) $item->getTarget() : false)
            @attr('data-bs-target', $click ? "#$id" : false)
            @attr('data-bs-toggle', $click && $hasChildren ? 'collapse' : false)>
            {{ $item->getTitle() }}
        </a>

        @if ($hasChildren)
            <div id="{{ $id }}" class="{{ $click ? 'collapse' : '' }} subnav-container">
                <ul class="{{ $vertical ? 'subnav flex-column' : 'subnav' }} "
                    data-menu-id="{{ $item->getValue()?->getId() }}"
                    data-level="{{ $level }}"
                >
                    @include('@menu::submenu-items', ['parent' => $item, 'level' => $level + 1])
                </ul>
            </div>
        @endif
    </li>
@else
    <li class="subnav-item {{ $hasChildren ? 'accordion-submenu' : '' }}"
        data-menu-id="{{ $item->getValue()?->getId() }}"
        data-level="{{ $level }}">
        <a @attr('href', $link)
        class="subnav-link {{ $item->isActive(true) ? 'active' : '' }}"
            @attr('target', $link ? (string) $item->getTarget() : false)
        >
            @if ($item->getIcon())
                <span class="{{ $item->getIcon() }}"></span>
            @endif
            <span>{{ $item->getTitle() }}</span>
        </a>

        @if ($hasChildren)
            <div class="subnav-container">
                <ul class="{{ $vertical ? 'subnav flex-column' : 'subnav' }}"
                    data-menu-id="{{ $item->getValue()?->getId() }}"
                    data-level="{{ $level }}">
                    @include('@menu::submenu-items', ['parent' => $item, 'level' => $level + 1])
                </ul>
            </div>
        @endif
    </li>
@endif
