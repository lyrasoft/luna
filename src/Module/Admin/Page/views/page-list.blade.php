<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        PageListView The view model object.
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
use Lyrasoft\Luna\Module\Admin\Page\PageListView;

/**
 * @var \Lyrasoft\Luna\Entity\Page $entity
 */

$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);

$localeService = $app->service(\Lyrasoft\Luna\Services\LocaleService::class);
?>

@extends($app->config('luna.view_extends.admin.list') ?? 'admin.global.body-list')

@section('toolbar-buttons')
    @include('list-toolbar')
@stop

@section('content')
    <form id="admin-form" action="" x-data="{ grid: $store.grid }"
        x-ref="gridForm"
        data-ordering="{{ $ordering }}"
        method="post">

        <x-filter-bar :form="$form" :open="$showFilters"></x-filter-bar>

        @if (count($items))
        {{-- RESPONSIVE TABLE DESC --}}
        <p class="d-sm-block d-md-none">
            @lang('unicorn.grid.responsive.table.desc')
        </p>

        <div class="grid-table table-responsive-lg">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th style="width: 1%">
                        <x-toggle-all></x-toggle-all>
                    </th>
                    <th style="width: 5%" class="text-nowrap">
                        <x-sort field="page.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>
                    <th style="width: 5%" class="text-nowrap">
                        <x-sort field="page.category_id">
                            @lang('luna.page.field.category')
                        </x-sort>
                    </th>
                    <th class="text-nowrap">
                        <x-sort field="page.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
{{--                    <th style="width: 10%" class="text-nowrap">--}}
{{--                        <div class="d-flex w-100 justify-content-end">--}}
{{--                            <x-sort--}}
{{--                                asc="page.category_id DESC, page.ordering ASC"--}}
{{--                                desc="page.category_id DESC, page.ordering DESC"--}}
{{--                            >--}}
{{--                                @lang('unicorn.field.ordering')--}}
{{--                            </x-sort>--}}
{{--                            @if($vm->reorderEnabled($ordering))--}}
{{--                                <x-save-order class="ms-2"></x-save-order>--}}
{{--                            @endif--}}
{{--                        </div>--}}
{{--                    </th>--}}
                    @if ($localeService->isEnabled())
                        <th style="width: 10%">
                            <x-sort field="article.language">
                                @lang('luna.field.language')
                            </x-sort>
                        </th>
                    @endif
                    <th style="width: 1%" class="text-nowrap">
                        @lang('unicorn.field.delete')
                    </th>
                    <th style="width: 1%" class="text-nowrap text-end">
                        <x-sort field="page.id">
                            @lang('unicorn.field.id')
                        </x-sort>
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach($items as $i => $item)
                    <?php
                        $entity = $vm->prepareItem($item);
                    ?>
                    <tr>
                        <td>
                            <x-row-checkbox :row="$i" :id="$entity->id"></x-row-checkbox>
                        </td>
                        <td>
                            <x-state-dropdown color-on="text"
                                button-style="width: 100%"
                                use-states
                                :workflow="$workflow"
                                :id="$entity->id"
                                :value="$item->state"
                            ></x-state-dropdown>
                        </td>
                        <td class="text-nowrap">
                            {{ $item->category?->title ?: '-' }}
                        </td>
                        <td>
                            <div>
                                <a href="{{ $nav->to('page_edit')->id($entity->id) }}">
                                    {{ $item->title ?: '(No Title)' }}
                                </a>
                            </div>
                            <div class="small text-muted">
                                {{ $item->alias }}
                            </div>
                        </td>
{{--                        <td class="text-end">--}}
{{--                            <x-order-control--}}
{{--                                :enabled="$vm->reorderEnabled($ordering)"--}}
{{--                                :row="$i"--}}
{{--                                :id="$entity->getId()"--}}
{{--                                :value="$item->ordering"--}}
{{--                            ></x-order-control>--}}
{{--                        </td>--}}
                        @if ($localeService->isEnabled())
                            <td>
                                <x-lang-dropdown
                                    type="page"
                                    :table="$entity::class"
                                    :item="$item"
                                    :language="$item->lang"
                                    class="w-100"
                                ></x-lang-dropdown>
                            </td>
                        @endif
                        <td class="text-center">
                            <button type="button" class="btn btn-sm btn-outline-secondary"
                                @click="grid.deleteItem('{{ $entity->id }}')"
                                data-dos
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                        <td class="text-end">
                            {{ $entity->id }}
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>

            <div>
                <x-pagination :pagination="$pagination">
                    <x-slot name="end">
                        <x-pagination-jump :pagination="$pagination" />
                        <x-pagination-stats :pagination="$pagination" class="ms-0 ms-md-auto" />
                    </x-slot>
                </x-pagination>
            </div>
        </div>
        @else
            <div class="grid-no-items card bg-light" style="padding: 125px 0;">
                <div class="card-body text-center">
                    <h3 class="text-secondary">@lang('unicorn.grid.no.items')</h3>
                </div>
            </div>
        @endif

        <div class="d-none">
            <input name="_method" type="hidden" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
