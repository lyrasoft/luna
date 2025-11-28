<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        MenuListView The view model object.
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
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;

/**
 * @var \Lyrasoft\Luna\Entity\Menu $entity
 */

$app->service(\Unicorn\Script\UnicornScript::class)
    ->addRoute('self', $nav->self()->var('type', '{{type}}'));

$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);

$typeField = $app->make(\Lyrasoft\Luna\Field\MenuTypeListField::class)
    ->setName('type')
    ->setValue($type);

$orders = [];
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

        <x-filter-bar :form="$form" :open="$showFilters">
            <x-slot name="start">
                <x-field :field="$typeField" no-label style="min-width: 300px"></x-field>
            </x-slot>
        </x-filter-bar>

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
                        <x-sort field="menu.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>
                    <th class="text-nowrap">
                        <x-sort field="menu.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
                    <th class="text-nowrap">
                        <x-sort field="menu.view">
                            @lang('luna.menu.field.view')
                        </x-sort>
                    </th>
                    <th style="width: 10%" class="text-nowrap">
                        <div class="d-flex w-100 justify-content-end">
                            <x-sort
                                asc="menu.lft ASC"
                                desc="menu.lft DESC"
                            >
                                @lang('unicorn.field.ordering')
                            </x-sort>
                            @if($vm->reorderEnabled($ordering))
                                <x-save-order class="ms-2"></x-save-order>
                            @endif
                        </div>
                    </th>
                    <th style="width: 1%" class="text-nowrap">
                        @lang('unicorn.field.delete')
                    </th>
                    <th style="width: 1%" class="text-nowrap text-end">
                        <x-sort field="menu.id">
                            @lang('unicorn.field.id')
                        </x-sort>
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach($items as $i => $item)
                    <?php
                        $entity = $vm->prepareItem($item);

                        $orders[$entity->parentId][] = $entity->id;
                        $order = count($orders[$entity->parentId]);
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
                            />
                        </td>
                        <td>
                            <div class="d-flex">
                                <div class="{{ $entity->level > 1 ? 'me-1' : '' }}">
                                    {{ str_repeat('—', $entity->level - 1) }}
                                </div>
                                <div>
                                    <a href="{{ $nav->to('menu_edit')->id($entity->id) }}">
                                        {{ $entity->title }}
                                    </a>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="small text-muted">
                                <?php $viewInstance = $vm->getViewInstance($entity->view) ?>
                                @if ($viewInstance)
                                    @lang('luna.menu.group.' . $viewInstance::getGroup())
                                @else
                                    @lang('luna.menu.unknown')
                                @endif
                            </div>
                            <div class="has-tooltip" title="{{ $entity->view }}">
                                @if ($viewInstance)
                                    {{ $viewInstance::getTitle($lang) }}
                                @else
                                    @lang('luna.menu.unknown')
                                @endif
                            </div>
                        </td>
                        <td class="text-end">
                            <x-order-control
                                :enabled="$vm->reorderEnabled($ordering)"
                                :row="$i"
                                :id="$entity->id"
                                :value="$order"
                            ></x-order-control>
                        </td>
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

                <tfoot>
                <tr>
                    <td colspan="20">
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

        <div class="d-none">
            <input name="_method" type="hidden" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
