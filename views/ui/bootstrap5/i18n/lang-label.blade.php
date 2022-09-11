<?php

declare(strict_types=1);

namespace App\View;

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

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Data\Collection;
use Windwalker\ORM\ORM;

$localeService = $app->service(LocaleService::class);

$field ??= 'title';

if ($item->lang ?? null) {
    $lang = $item->lang;
}

$code ??= $item->language ?? '';

/**
 * @var $lang Language|Collection
 */
?>

<div class="text-nowrap">
    @if ($code === '*')
        <span class="fa fa-earth-americas"></span>
        @lang('luna.language.all')
    @else
        <span class="" title="{{ $field === 'code' ? $lang->title : $lang->code }}"
            data-bs-toggle="tooltip"
            data-toggle="tooltip"
        >
            <span class="{{ $localeService->getFlagIconClass((string) $lang->image) }}"></span>
            {{ $lang->$field }}
        </span>
    @endif
</div>
