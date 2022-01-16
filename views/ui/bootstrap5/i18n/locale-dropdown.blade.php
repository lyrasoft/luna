<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$localeService = $app->service(\Lyrasoft\Luna\Services\LocaleService::class);

/** @var \Windwalker\Edge\Component\ComponentAttributes $attributes */
$attributes = $attributes->exceptProps(
    [
        'buttonClass',
        'itemClass',
    ]
);
$attributes = $attributes->class('dropdown');

$buttonClass ??= 'nav-link';
$itemClass ??= '';
?>

@if ($localeService->isStageEnabled())
    <div {!! $attributes !!}>
        <a href="#" class="{{ $buttonClass }} dropdown-toggle"
            data-bs-toggle="dropdown"
            data-toggle="dropdown"
        >
            <span class="fa fa-earth-asia"></span>
            {{ $localeService->getCurrentLanguage()->getTitleNative() }}
        </a>

        <ul class="dropdown-menu">
            @foreach ($localeService->getAvailableLanguages() as $lang)
                <li class="{{ $itemClass }}">
                   <a class="dropdown-item"
                       href="{{ $nav->to('locale_switch')->var('alias', $lang->getAlias())->withReturn() }}">
                       {{ $lang->getTitleNative() }}
                   </a>
                </li>
            @endforeach
        </ul>
    </div>
@endif
