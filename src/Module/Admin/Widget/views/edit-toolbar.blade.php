<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $view      \Lyrasoft\Luna\Module\Admin\Widget\WidgetEditView  The view modal object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Module\Admin\Widget\WidgetEditView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

<div x-title="toolbar" x-data="{ form: $store.form }">

    {{-- Save --}}
    <div class="btn-group">
        <button type="button" class="btn btn-success btn-sm"
            @click="form.post();"
            style="width: 150px"
        >
            <span class="fa fa-save"></span>
            @lang('unicorn.toolbar.save')
        </button>

        {{-- Split Toggle --}}
        <button type="button" class="btn btn-success btn-sm dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only visually-hidden">Toggle Dropdown</span>
        </button>

        <ul class="dropdown-menu dropdown-menu-end">
            {{-- Save2Copy --}}
            <li>
                <a class="dropdown-item"
                    href="javascript://"
                    @click="form.post(null, { task: 'save2copy' });">
                    <span class="fa fa-copy"></span>
                    @lang('unicorn.toolbar.save2copy')
                </a>
            </li>

            {{-- Save2New --}}
            <li>
                <a class="dropdown-item"
                    href="javascript://"
                    @click="form.post(null, { task: 'save2new' });">
                    <span class="fa fa-plus"></span>
                    @lang('unicorn.toolbar.save2new')
                </a>
            </li>
        </ul>
    </div>

    {{-- Save2Close --}}
    <button type="button" class="btn btn-primary btn-sm"
        @click="form.post(null, { task: 'save2close' });">
        <span class="fa fa-check"></span>
        @lang('unicorn.toolbar.save2close')
    </button>

    {{-- Cancel --}}
    <a class="btn btn-default btn-outline-secondary btn-sm"
        href="{{ $nav->to('widget_list') }}">
        <span class="fa fa-times"></span>
        @lang('unicorn.toolbar.cancel')
    </a>
</div>
