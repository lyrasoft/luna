<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        \Lyrasoft\Luna\Module\Admin\Widget\WidgetListView  The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Module\Admin\Widget\WidgetListView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

<div x-title="toolbar" x-data="{ form: $store.grid.form, grid: $store.grid }">
    {{-- Create --}}
    <a class="btn btn-primary btn-sm"
        href="javascript://"
        data-bs-toggle="modal"
        data-bs-target="#create-modal"
        data-toggle="modal"
        data-target="#create-modal"
        style="min-width: 150px"
    >
        <i class="fa fa-plus"></i>
        @lang('unicorn.toolbar.new')
    </a>

    {{-- Duplicate --}}
    <button type="button" class="btn btn-info btn-sm"
        @click="grid.form.post()"
    >
        <i class="fa fa-clone"></i>
        @lang('unicorn.toolbar.duplicate')
    </button>

    {{-- Change State --}}
    <x-state-dropdown color-on="text"
        button-style="width: 100%"
        use-states
        batch
        :workflow="[$workflow]"
    >
        @lang('unicorn.toolbar.state.change')
    </x-state-dropdown>

    {{-- Batch --}}
    <button type="button" class="btn btn-dark btn-sm"
        @click="grid.validateChecked(null, function () {
            (new bootstrap.Modal('#batch-modal')).show();
        })"
    >
        <i class="fa fa-sliders"></i>
        @lang('unicorn.toolbar.batch')
    </button>

    {{-- Delete --}}
    <button type="button" class="btn btn-outline-danger btn-sm"
        @click="grid.deleteList()"
    >
        <i class="fa fa-trash"></i>
        @lang('unicorn.toolbar.delete')
    </button>
</div>
