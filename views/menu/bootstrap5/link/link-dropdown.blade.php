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

use Lyrasoft\Luna\Menu\View\LinkMenuView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;

$link = ($link === LinkMenuView::NO_LINK || (string) $link === '') ? false : $link;
?>

@if ($level === 1)
    <li class="nav-item {{ $hasChildren ? 'dropdown' : '' }}"
        data-menu-id="{{ $item->getValue()?->getId() }}" data-level="{{ $level }}">
        <a @attr('href', $link)
        class="nav-link {{ $hasChildren ? 'dropdown-toggle' : '' }} {{ $item->isActive(true) ? 'active' : '' }}"
            @attr('target', $link ? (string) $item->getTarget() : false)
            @attr('data-bs-toggle', $click && $hasChildren ? 'dropdown' : false)>
            {{ $item->getTitle() }}
        </a>

        @if ($hasChildren)
            <ul class="dropdown-menu"
                data-menu-id="{{ $item->getValue()?->getId() }}"
                data-level="{{ $level }}"
            >
                @include('@menu::submenu-items', ['parent' => $item, 'level' => $level + 1])
            </ul>
        @endif
    </li>
@else
    <li class="{{ $hasChildren ? 'dropdown-submenu' : '' }}"
        data-menu-id="{{ $item->getValue()?->getId() }}" data-level="{{ $level }}">
        <a @attr('href', $link)
        class="dropdown-item {{ $item->isActive(true) ? 'active' : '' }}"
            target="{{ $item->getTarget() }}"
            @attr('target', $link ? $item->getTarget() : false)
        >
            @if ($item->getIcon())
                <span class="{{ $item->getIcon() }}"></span>
            @endif
            <span>{{ $item->getTitle() }}</span>
        </a>

        @if ($hasChildren)
            <ul class="dropdown-menu"
                data-menu-id="{{ $item->getValue()?->getId() }}" data-level="{{ $level }}">
                @include('@menu::submenu-items', ['parent' => $item, 'level' => $level + 1])
            </ul>
        @endif
    </li>
@endif
