<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        object          The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var $form Form
 */
?>

<div x-title="toolbar" x-data="{ form: $store.grid.form, grid: $store.grid }">
    <a class="btn btn-primary btn-sm"
        href="{{ $nav->to('article_edit')->var('new', 1) }}"
        style="min-width: 150px"
    >
        <i class="fa fa-plus"></i>
        @lang('unicorn.toolbar.new')
    </a>
    <button type="button" class="btn btn-info btn-sm"
        @click="grid.form.post()"
    >
        <i class="fa fa-clone"></i>
        @lang('unicorn.toolbar.duplicate')
    </button>
    <x-state-dropdown
        :workflow="$workflow"
        color-on="text"
        button-style=""
        use-states
        batch
    >
        @lang('unicorn.toolbar.state.change')
    </x-state-dropdown>
    @if ($form?->countFields(null, 'batch'))
        <button type="button" class="btn btn-dark btn-sm"
            @click="grid.validateChecked(null, function () {
            (new bootstrap.Modal('#batch-modal')).show();
        })"
        >
            <i class="fa fa-sliders"></i>
            @lang('unicorn.toolbar.batch')
        </button>
    @endif
    <button type="button" class="btn btn-outline-danger btn-sm"
        @click="grid.deleteList()"
    >
        <i class="fa fa-trash"></i>
        @lang('unicorn.toolbar.delete')
    </button>
</div>
