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

use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Edge\Component\ComponentAttributes;
use Windwalker\ORM\ORM;

$asset->js('@vendor/lyrasoft/luna/dist/lang-dropdown.js');

$localeService = $app->service(LocaleService::class);

$labelField ??= 'title';
$langField ??= 'language';
$routeName ??= '';

$orm = $app->service(ORM::class);
$metadata = $orm->getEntityMetadata($table);
$idName = $metadata->getMainKey();

$id = $item?->$idName;

/**
 * @var ComponentAttributes $attributes
 */

$props = $attributes->props(
    'type',
    'labelField',
    'langField',
    'language',
    'ajaxUrl',
    'table',
    'item',
    'routeName'
);

$attributes = $attributes->class('c-lang-dropdown dropdown');

$jsOptions = [
    'id' => $id,
    'type' => $type,
    'table' => $table,
    'idName' => $idName,
    'langField' => $langField,
    'routeName' => $routeName,
    'ajaxUrl' => $ajaxUrl ?? (string) $nav->to('language_ajax')->task('getAssociations')
];

$currentLang = $item?->$langField ?: '*';
?>

<div {!! $attributes !!} x-data="LangDropdown(@json($jsOptions))">
    <button type="button" class="btn btn-light btn-sm dropdown-toggle d-flex align-items-center w-100"
        x-on:click="buttonClicked"
        data-bs-toggle="dropdown"
    >
        <span class="ml-auto me-auto">
            @if ($currentLang === '*')
                <span class="fa fa-earth-americas"></span>
                @lang('luna.language.all')
            @else
                <span class="" title="{{ $labelField === 'code' ? $language?->title : $language?->code }}"
                    data-bs-toggle="tooltip"
                    data-toggle="tooltip"
                >
                <span class="{{ $localeService->getFlagIconClass($language?->image ?? '') }}"></span>
                    {{ $language?->$labelField }}
                </span>
            @endif
        </span>
    </button>

    <div class="dropdown-menu">
        <template x-if="loaded && items.length > 0">
            <template x-for="item of items">
                <a class="dropdown-item"
                    :href="item.lang.editLink">
                    <span :class="item.lang.flagClass"></span>
                    <span x-text="item.lang.{{ $labelField }}"></span>
                </a>
            </template>
        </template>
        <template x-if="loaded && items.length === 0">
            <div class="text-muted p-2 text-nowrap">
                @lang('luna.lang.dropdown.empty')
            </div>
        </template>
        <template x-if="!loaded">
            <div class="text-muted p-2 text-nowrap">
                @lang('luna.lang.dropdown.loading')
            </div>
        </template>
    </div>
</div>
