<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        \Lyrasoft\Luna\Module\Admin\Widget\WidgetListView The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Module\Admin\Widget\WidgetListView;use Windwalker\Core\Application\AppContext;use Windwalker\Core\Asset\AssetService;use Windwalker\Core\DateTime\ChronosService;use Windwalker\Core\Language\LangService;use Windwalker\Core\Router\Navigator;use Windwalker\Core\Router\SystemUri;

/**
 * @var \Lyrasoft\Luna\Entity\Widget $entity
 */

$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);

$widgetService = $app->service(\Lyrasoft\Luna\Widget\WidgetService::class);
$localeService = $app->service(\Lyrasoft\Luna\Services\LocaleService::class);
?>

@extends('admin.global.body-list')

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
        <div class="d-block d-lg-none mb-3">
            @lang('unicorn.grid.responsive.table.desc')
        </div>

        <div class="grid-table table-lg-responsive">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    {{-- Toggle --}}
                    <th style="width: 1%">
                        <x-toggle-all></x-toggle-all>
                    </th>

                    {{-- State --}}
                    <th style="width: 5%" class="text-nowrap">
                        <x-sort field="widget.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>

                    {{-- Title --}}
                    <th class="text-nowrap">
                        <x-sort field="widget.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>

                    {{-- Widget --}}
                    <th class="text-nowrap" style="width: 5%">
                        <x-sort field="widget.type">
                            @lang('luna.widget.field.type')
                        </x-sort>
                    </th>

                    {{-- Position --}}
                    <th class="text-nowrap" style="width: 1%">
                        <x-sort field="widget.position">
                            @lang('luna.widget.field.position')
                        </x-sort>
                    </th>

                    {{-- Ordering --}}
                    <th style="width: 10%" class="text-nowrap">
                        <div class="d-flex w-100 justify-content-end">
                            <x-sort
                                asc="widget.ordering ASC"
                                desc="widget.ordering DESC"
                            >
                                @lang('unicorn.field.ordering')
                            </x-sort>
                            @if($vm->reorderEnabled($ordering))
                                <x-save-order class="ml-2 ms-2"></x-save-order>
                            @endif
                        </div>
                    </th>

                    @if ($localeService->isEnabled())
                        <th>
                            <x-sort field="article.language">
                                @lang('luna.field.language')
                            </x-sort>
                        </th>
                    @endif

                    {{-- Delete --}}
                    <th style="width: 1%" class="text-nowrap">
                        @lang('unicorn.field.delete')
                    </th>

                    {{-- ID --}}
                    <th style="width: 1%" class="text-nowrap text-end">
                        <x-sort field="widget.id">
                            @lang('unicorn.field.id')
                        </x-sort>
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach($items as $i => $item)
                    <?php
                        $entity = $vm->prepareItem($item);
                        $widgetType = $vm->getWidgetType($entity->getType());
                    ?>
                    <tr>
                        {{-- Checkbox --}}
                        <td>
                            <x-row-checkbox :row="$i" :id="$entity->getId()"></x-row-checkbox>
                        </td>

                        {{-- State --}}
                        <td>
                            <x-state-dropdown color-on="text"
                                button-style="width: 100%"
                                use-states
                                :workflow="$workflow"
                                :id="$entity->getId()"
                                :value="$item->state"
                            />
                        </td>

                        {{-- Title --}}
                        <td>
                            <div>
                                <a href="{{ $nav->to('widget_edit')->id($entity->getId()) }}">
                                    {{ $item->title }}
                                </a>
                            </div>
                            <div class="small text-muted">
                                {{ $entity->getNote() }}
                            </div>
                        </td>

                        <td class="text-nowrap">
                            <div data-bs-toggle="tooltip"
                                title="{{ $widgetType }}">
                                {{ $widgetType ? $widgetType::getTypeTitle($lang) : $lang('luna.widget.type.not.found') }}
                            </div>
                        </td>

                        <td class="text-nowrap">
                            <div>
                                <span class="badge"
                                    style="
                                        background-color: {{ $bg = $widgetService->getPositionColor($entity->getPosition()) }};
                                        color: {{ $widgetService::getTextColor($bg) }}
                                    ">
                                    @if ($entity->getPosition())
                                        <?php
                                        $position = $entity->getPosition();

                                        $posName = $widgetService->getAllPositions()[$position] ?? null;
                                        ?>
                                        {{ $position }}
                                        @if ($position !== $posName)
                                            ({{ $posName }})
                                        @endif
                                    @else
                                        @lang('luna.widget.position.none')
                                    @endif
                                </span>
                            </div>
                        </td>

                        {{-- Ordering --}}
                        <td class="text-end text-right">
                            <x-order-control
                                :enabled="$vm->reorderEnabled($ordering)"
                                :row="$i"
                                :id="$entity->getId()"
                                :value="$item->ordering"
                            ></x-order-control>
                        </td>

                        @if ($localeService->isEnabled())
                            <td>
                                <x-lang-label :item="$item"></x-lang-label>
                            </td>
                        @endif

                        {{-- Delete --}}
                        <td class="text-center">
                            <button type="button" class="btn btn-sm btn-outline-secondary"
                                @click="grid.deleteItem('{{ $entity->getId() }}')"
                                data-dos
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>

                        {{-- ID --}}
                        <td class="text-end">
                            {{ $entity->getId() }}
                        </td>
                    </tr>
                @endforeach
                </tbody>

                <tfoot>
                <tr>
                    <td colspan="20">
                        {!! $pagination->render() !!}
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

        <div class="d-none">
            <input name="_method" type="hidden" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>

        <x-create-modal></x-create-modal>
    </form>

@stop
