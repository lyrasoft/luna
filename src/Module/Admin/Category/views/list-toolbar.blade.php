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
    <a role="button" class="btn btn-primary btn-sm phoenix-btn-new"
        href="{{ $nav->to('category_edit', ['new' => true]) }}">
        <span class="glyphicon glyphicon-plus fa fa-plus"></span>
        @lang('unicorn.toolbar.new')
    </a>

    {{--<button type="button" class="btn btn-info btn-info btn-sm" onclick="grid.hasChecked();Phoenix.post();">--}}
    {{--<span class="glyphicon glyphicon-duplicate fa fa-copy"></span>--}}
    {{--@lang('phoenix.toolbar.duplicate')--}}
    {{--</button>--}}

    <x-state-dropdown
        :workflow="$workflow"
        color-on="text"
        button-style=""
        use-states
        batch
    >
        @lang('unicorn.toolbar.state.change')
    </x-state-dropdown>

    <button type="button" class="btn btn-default btn-outline-info btn-sm"
        @click="grid.batch('rebuild');"
        data-bs-toggle="tooltip"
        title="@lang('luna.toolbar.rebuild.desc')"
    >
        <span class="glyphicon glyphicon-refresh fa fa-refresh fa-sync"></span>
        @lang('luna.toolbar.rebuild')
    </button>

    <button type="button" class="btn btn-default btn-outline-secondary btn-sm" data-toggle="modal"
    data-target="#batch-modal" onclick="grid.hasChecked(null, event);">
        <span class="glyphicon glyphicon-modal-window fa fa-sliders fa-sliders-h"></span>
        @lang('unicorn.toolbar.batch')
    </button>

    <button type="button" class="btn btn-default btn-outline-danger btn-sm"
        @click="grid.deleteList();">
        <span class="glyphicon glyphicon-trash fa fa-trash"></span>
        @lang('unicorn.toolbar.delete')
    </button>
</div>
