<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        TagListView The view model object.
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
use Lyrasoft\Luna\Module\Admin\Tag\TagListView;

/**
 * @var \Lyrasoft\Luna\Entity\Tag $entity
 */

$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);
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
                        <x-sort field="tag.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>
                    <th class="text-nowrap">
                        <x-sort field="tag.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
                    <th style="width: 1%" class="text-nowrap">
                        @lang('unicorn.field.delete')
                    </th>
                    <th style="width: 1%" class="text-nowrap text-end">
                        <x-sort field="tag.id">
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
                            <x-row-checkbox :row="$i" :id="$entity->getId()"></x-row-checkbox>
                        </td>
                        <td>
                            <x-state-dropdown color-on="text"
                                button-style="width: 100%"
                                use-states
                                :workflow="$workflow"
                                :id="$entity->getId()"
                                :value="$item->state"
                            ></x-state-dropdown>
                        </td>
                        <td>
                            <div>
                                <a href="{{ $nav->to('tag_edit')->id($entity->getId()) }}">
                                    {{ $item->title }}
                                </a>
                            </div>
                        </td>
                        <td class="text-center">
                            <button type="button" class="btn btn-sm btn-outline-secondary"
                                @click="grid.deleteItem('{{ $entity->getId() }}')"
                                data-dos
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                        <td class="text-end">
                            {{ $entity->getId() }}
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
