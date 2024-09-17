<?php

declare(strict_types=1);

namespace App\View;

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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$originOrdering = [];

$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);
$localeService = $app->service(\Lyrasoft\Luna\Services\LocaleService::class);

$enableOrderControl = $ordering === 'category.lft ASC';

$orders = [];
?>

@extends($app->config('luna.view_extends.admin.list') ?? 'admin.global.body-list')

@section('toolbar-buttons')
    @include('list-toolbar')
@stop

@section('content')
    <form x-data="{ grid: $store.grid }" x-ref="gridForm" data-ordering="{{ $ordering }}" name="admin-form"
        id="admin-form" action="{{ $nav->to('category_list', ['type' => $type]) }}"
        method="POST" enctype="multipart/form-data">

        {{-- FILTER BAR --}}
        <div class="filter-bar">
            <x-filter-bar :form="$form" :open="$showFilters"></x-filter-bar>
        </div>

        @if (count($items))
        {{-- RESPONSIVE TABLE DESC --}}
        <p class="d-sm-block d-md-none">
            @lang('unicorn.grid.responsive.table.desc')
        </p>

        <div class="grid-table table-responsive">

            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    {{-- CHECKBOX --}}
                    <th width="1%">
                        <x-toggle-all></x-toggle-all>
                    </th>

                    {{-- STATE --}}
                    <th style="min-width: 90px;" width="7%">
                        <x-sort field="category.state" >@lang('unicorn.field.state')</x-sort>
                    </th>

                    {{-- TITLE --}}
                    <th style="min-width: 350px;">
                        <x-sort field="lang.title" >@lang('unicorn.field.title')</x-sort>
                    </th>

                    {{-- ORDERING --}}
                    <th width="9%" class="text-nowrap">
                        <x-sort field="category.lft" >@lang('unicorn.field.ordering')</x-sort>

                        @if ($enableOrderControl)
                            <x-save-order></x-save-order>
                        @endif
                    </th>

                    {{-- AUTHOR --}}
                    <th class="text-nowrap">
                        <x-sort field="category.created_by" >@lang('unicorn.field.author')</x-sort>
                    </th>

                    @if ($localeService->isEnabled())
                        <th>
                            <x-sort field="category.language">
                                @lang('luna.field.language')
                            </x-sort>
                        </th>
                    @endif

                    {{-- DELETE --}}
                    <th width="1%" class="text-nowrap">
                        @lang('unicorn.field.delete')
                    </th>

                    {{-- ID --}}
                    <th style="width: 1%" class="text-nowrap text-end">
                        <x-sort field="category.id" >@lang('unicorn.field.id')</x-sort>
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach ($items as $i => $item)
                    <?php
                    // $originOrdering[] = $item->ordering = $ordering
                    //     ? array_search($item->id, $ordering[$item->parent_id]) + 1
                    //     : '-';
                    $orders[$item->parent_id][] = $item->id;
                    $order = count($orders[$item->parent_id]);

                    $entity = $vm->prepareItem($item);
                    ?>
                    <tr data-order-group="{{ $item->parent_id }}">
                        {{-- CHECKBOX --}}
                        <td>
                            <x-row-checkbox :row="$i" :id="$item->id"></x-row-checkbox>
                        </td>

                        {{-- STATE --}}
                        <td class="text-center">
                            <x-state-dropdown
                                :workflow="$workflow"
                                color-on="text"
                                button-style="width: 100%"
                                style="width: 100%"
                                use-states
                                :id="$item->id"
                                :value="$item->state"
                            ></x-state-dropdown>
                        </td>

                        {{-- TITLE --}}
                        <td class="searchable">
                            <div class="d-flex">
                                @if ($item->level > 1)
                                    <div class="me-2">
                                        {{ str_repeat('—', $item->level - 1) }}
                                    </div>
                                @endif
                                <div>
                                    <div>
                                        <a href="{{ $nav->to('category_edit', array('id' => $item->id, 'type' => $type)) }}">
                                            {{ $item->title }}
                                        </a>
                                    </div>

                                    <div class="text-muted small">{{ $item->alias }}</div>
                                </div>
                            </div>
                        </td>

                        {{-- ORDERING --}}
                        <td class="text-end">
                            <x-order-control
                                :enabled="$enableOrderControl"
                                :row="$i"
                                :id="$item->id"
                                :value="$order"
                            ></x-order-control>
                        </td>

                        {{-- AUTHOR --}}
                        <td>
                            {{ $item->user->name ?? '' }}
                        </td>

                        @if ($localeService->isEnabled())
                            <td>
                                <x-lang-dropdown
                                    type="category"
                                    :table="$entity::class"
                                    :item="$item"
                                    :language="$item->lang"
                                    class="w-100"
                                ></x-lang-dropdown>
                            </td>
                        @endif

                        {{-- DELETE --}}
                        <td class="text-center">
                            <button type="button" class="btn btn-default btn-outline-secondary btn-sm"
                                data-bs-toggle="tooltip"
                                @click="grid.deleteItem({{ $item->id }});"
                                title="@lang('unicorn.toolbar.delete')">
                                <span class="fa fa-fw fa-trash"></span>
                            </button>
                        </td>

                        {{-- ID --}}
                        <td class="text-end">
                            {{ $item->id }}
                        </td>
                    </tr>
                @endforeach
                </tbody>

                <tfoot>
                <tr>
                    {{-- PAGINATION --}}
                    <td colspan="25">
                        <x-pagination :pagination="$pagination">
                            <x-slot name="end">
                                <x-pagination-stats :pagination="$pagination" class="ms-0 ms-md-auto" />
                            </x-slot>
                        </x-pagination>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
        @else
            <div class="grid-no-items card bg-light" style="padding: 125px 0;">
                <div class="card-body text-center">
                    <h3 class="text-secondary">@lang('unicorn.grid.no.items')</h3>
                </div>
            </div>
        @endif

        <div class="hidden-inputs">
            {{-- METHOD --}}
            <input type="hidden" name="_method" value="PUT" />
            <input type="hidden" name="origin_ordering" value="{{ implode(',', $originOrdering) }}" />

            {{-- TOKEN --}}
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>
@stop
