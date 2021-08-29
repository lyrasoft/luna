<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        UserListView The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\User\UserListView;

/**
 * @var \Lyrasoft\Luna\Entity\User $entity
 */

$enabledButton = $vm->createEnabledButton();
$verifiedButton = $vm->createVerifiedButton();
?>

@extends('admin.global.body')

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
            <p class="visible-xs-block d-sm-block d-md-none">
                @lang('phoenix.grid.responsive.table.desc')
            </p>

            <div>

                <table class="table table-striped table-bordered table-responsive">
                    <thead>
                    <tr>
                        {{-- CHECKBOX --}}
                        <th width="1%" class="text-nowrap">
                            <x-toggle-all></x-toggle-all>
                        </th>

                        <th class="text-nowrap">
                            <x-sort field="user.last_name">@lang('luna.user.field.name')</x-sort>
                            /
                            <x-sort field="user.email">@lang('luna.user.field.email')</x-sort>
                        </th>

                        {{-- ENABLED --}}
                        <th width="3%" class="text-nowrap">
                            <x-sort field="user.blocked">@lang('luna.user.field.enabled')</x-sort>
                        </th>

                        {{-- Activation --}}
                        <th width="10%" class="text-nowrap">
                            <x-sort field="user.activation">@lang('luna.user.field.verified')</x-sort>
                        </th>

                        {{-- REGISTERED --}}
                        <th width="10%" class="text-nowrap">
                            <x-sort field="user.registered">@lang('luna.user.field.registered')</x-sort>
                        </th>

                        <th width="5%" class="text-nowrap">
                            @lang('luna.user.field.switch')
                        </th>

                        {{-- DELETE --}}
                        <th width="1%" class="text-nowrap">
                            @lang('luna.user.field.delete')
                        </th>

                        {{-- ID --}}
                        <th width="3%" class="text-nowrap text-right">
                            <x-sort field="user.id">@lang('luna.user.field.id')</x-sort>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach ($items as $i => $item)
                        <?php
                        $entity = $vm->prepareItem($item);
                        ?>
                        <tr data-order-group="">
                            {{-- CHECKBOX --}}
                            <td>
                                <x-row-checkbox :row="$i" :id="$item->id"></x-row-checkbox>
                            </td>

                            {{-- NAME --}}
                            <td class="searchable">
                                <div class="d-flex align-items-center">
                                    <div class="user-avatar-wrapper mr-2">
                                        @if (property_exists($item, 'avatar'))
                                            @if ($item->avatar)
                                                <img class="user-avatar" src="{{ $item->avatar }}" alt="Avatar">
                                            @else
                                                <div class="user-avatar user-avatar-default"></div>
                                            @endif
                                        @endif
                                    </div>
                                    <div>
                                        <div class="user-name">
                                            <a href="{{ $nav->to('user_edit', ['id' => $item->id]) }}">
                                                {{ $entity->getName() }}
                                            </a>
                                        </div>

                                        <span class="small user-email text-muted">{{ $item->email }}</span>
                                    </div>
                                </div>
                            </td>

                            {{-- ENABLED --}}
                            <td class="text-center">
                                <x-state-button :states="$enabledButton"
                                    :value="$item->enabled"
                                    :id="$item->id"
                                ></x-state-button>
                            </td>

                            {{-- Activation --}}
                            <td class="text-center">
                                <x-state-button :states="$verifiedButton"
                                    :value="$item->verified"
                                    :id="$item->id"
                                ></x-state-button>
                            </td>

                            {{-- REGISTERED --}}
                            <td>
                                {{--                                {{ Windwalker\Legacy\Core\DateTime\Chronos::toLocalTime($item->registered) }}--}}
                                {{ $chronos->toLocalFormat($item->registered) }}
                            </td>

                            <td class="text-center">
                                <div class="dropdown">
                                    <button
                                        class="user-switch-button btn btn-outline-secondary btn-sm dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span class="fa fa-eye"></span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <button type="button"
                                            class="dropdown-item"
                                            onclick="grid.doTask('switch', {{ $item->id }}, null, { keepgroup: 0 });">
                                            <span class="fa fa-people-arrows"></span>
                                            @lang('luna..user.switch.button.default')
                                        </button>
                                        <button type="button"
                                            class="dropdown-item"
                                            onclick="grid.doTask('switch', {{ $item->id }}, null, { keepgroup: 1 });">
                                            <span class="fa fa-user-shield"></span>
                                            @lang('luna..user.switch.button.keepgroup')
                                        </button>
                                    </div>
                                </div>
                            </td>

                            {{-- Delete --}}
                            <td class="text-center">
                                <button type="button"
                                    class="waves-effect btn btn-default btn-outline-secondary btn-sm hasTooltip"
                                    @click="grid.deleteItem({{ $item->id }});"
                                    title="@lang('phoenix.toolbar.delete')">
                                    <span class="glyphicon glyphicon-trash fa fa-trash"></span>
                                </button>
                            </td>

                            {{-- ID --}}
                            <td class="searchable text-right text-end">
                                {{ $item->id }}
                            </td>
                        </tr>
                    @endforeach
                    </tbody>

                    <tfoot>
                    <tr>
                        {{-- PAGINATION --}}
                        <td colspan="25">
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
            @include('@csrf')
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
