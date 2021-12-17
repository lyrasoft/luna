<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $view      ViewModel       The view modal object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

<div x-id="toolbar" x-data="{ form: $store.grid.form, grid: $store.grid }">
    <a class="btn btn-primary btn-sm"
        href="{{ $nav->to('category_edit', ['new' => true]) }}"
        style="width: 150px"
    >
        <span class="fa fa-plus"></span>
        @lang('unicorn.toolbar.new')
    </a>

    <x-state-dropdown
        :workflow="$workflow"
        color-on="text"
        button-style=""
        use-states
        batch
    >
        @lang('unicorn.toolbar.state.change')
    </x-state-dropdown>

    <button type="button" class="btn btn-default btn-outline-primary btn-sm"
        @click="grid.batch('rebuild');"
        data-bs-toggle="tooltip"
        title="@lang('luna.toolbar.rebuild.desc')"
    >
        <span class="fa fa-sync fa-rotate"></span>
        @lang('luna.toolbar.rebuild')
    </button>

    <button type="button" class="btn btn-dark btn-sm"
        @click="grid.validateChecked(null, function () {
            (new bootstrap.Modal('#batch-modal')).show();
        })">
        <span class="fa fa-sliders fa-sliders-h"></span>
        @lang('unicorn.toolbar.batch')
    </button>

    <button type="button" class="btn btn-default btn-outline-danger btn-sm"
        @click="grid.deleteList();">
        <span class="fa fa-trash"></span>
        @lang('unicorn.toolbar.delete')
    </button>
</div>
