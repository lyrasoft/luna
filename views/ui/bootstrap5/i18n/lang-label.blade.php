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

$field ??= 'title';
?>

<div class="text-nowrap">
    @if ($item->language === '*')
        <span class="fa fa-earth-americas"></span>
        @lang('luna.language.all')
    @else
        <span class="" title="{{ $field === 'code' ? $item->lang->title : $item->lang->code }}"
            data-bs-toggle="tooltip"
            data-toggle="tooltip"
        >
            <span class="{{ $localeService->getFlagIconClass($item->lang->image) }}"></span>
            {{ $item->lang->$field }}
        </span>
    @endif
</div>
