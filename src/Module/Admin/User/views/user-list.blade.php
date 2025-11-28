<?php

declare(strict_types=1);

namespace App\View;

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

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\User\UserService;
use Unicorn\Image\ImagePlaceholder;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\User\UserListView;

/**
 * @var User $entity
 */

$enabledButton = $vm->createEnabledButton();
$verifiedButton = $vm->createVerifiedButton();

$userService = $app->service(UserService::class);
$accessService = $userService->getAccessService();
$currentUser = $userService->getCurrentUser();
$iAmSuperUser = $userService->getAccessService()->isSuperUser();
$imgPlaceholder = $app->service(ImagePlaceholder::class);
$luna = $app->service(LunaPackage::class);

$loginName = $luna->getLoginName();
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

            <div class="grid-table table-responsive">

                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        {{-- CHECKBOX --}}
                        <th width="1%" class="text-nowrap">
                            <x-toggle-all></x-toggle-all>
                        </th>

                        <th class="text-nowrap">
                            <x-sort field="user.name">@lang('luna.user.field.name')</x-sort>
                            /
                            <x-sort field="user.email">@lang('luna.user.field.email')</x-sort>
                        </th>

                        @if ($loginName !== 'email')
                            <th>
                                <x-sort :field="'user.' . $loginName">@lang('luna.user.field.' . $loginName)</x-sort>
                            </th>
                        @endif

                        {{-- Roles --}}
                        <th width="3%" class="text-nowrap">
                            @lang('luna.user.field.roles')
                        </th>

                        {{-- ENABLED --}}
                        <th width="3%" class="text-nowrap">
                            <x-sort field="user.enabled">@lang('luna.user.field.enabled')</x-sort>
                        </th>

                        {{-- Activation --}}
                        <th width="10%" class="text-nowrap">
                            <x-sort field="user.verified">@lang('luna.user.field.verified')</x-sort>
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
                            @lang('unicorn.toolbar.delete')
                        </th>

                        {{-- ID --}}
                        <th width="3%" class="text-nowrap text-end">
                            <x-sort field="user.id">@lang('unicorn.field.id')</x-sort>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach ($items as $i => $item)
                            <?php
                            $entity = $vm->prepareItem($item);
                            $superuser = $userService->isSuperUser($entity);
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
                                        @if (method_exists($entity, 'getAvatar'))
                                            <img class="c-user-avatar rounded-circle me-2"
                                                src="{{ $entity->avatar ?: $imgPlaceholder->avatar() }}"
                                                height="45"
                                                width="45"
                                                alt="Avatar">
                                        @endif
                                    </div>
                                    <div>
                                        <div class="user-name">
                                            @if ($superuser && !$iAmSuperUser)
                                                {{ $entity->name }}
                                            @else
                                                <a href="{{ $nav->to('user_edit', ['id' => $item->id]) }}">
                                                    {{ $entity->name }}
                                                </a>
                                            @endif
                                        </div>

                                        <span class="small user-email text-muted">{{ $item->email }}</span>
                                    </div>
                                </div>
                            </td>

                            @if ($loginName !== 'email')
                                <td>
                                    {{ $item->$loginName }}
                                </td>
                            @endif

                            {{-- Roles --}}
                            <td>
                                @php($roles = $vm->getUserRoles($entity->id))

                                @foreach ($roles as $role)
                                    <div>
                                        <span class="badge bg-primary">
                                            {{ $accessService->wrapUserRole($role->getRoleId())?->title ?? $role->roleId }}
                                        </span>
                                    </div>
                                @endforeach

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
                                <div data-bs-toggle="tooltip"
                                    title="{{ $chronos->toLocalFormat($item->registered) }}">
                                    {{ $chronos->toLocalFormat($item->registered, 'Y-m-d') }}
                                </div>
                            </td>

                            <td class="text-center">
                                <button
                                    class="user-switch-button btn btn-outline-secondary btn-sm"
                                    type="button"
                                    uni-user-switch-button="@json(['id' => $item->id, 'name' => $item->name])"
                                >
                                    <i class="fa-solid fa-people-arrows-left-right"></i>
                                </button>
                            </td>

                            {{-- Delete --}}
                            <td class="text-center">
                                <button type="button"
                                    @attr('disabled', $currentUser?->id === $entity->id)
                                    class="waves-effect btn btn-default btn-outline-secondary btn-sm hasTooltip"
                                    @click="grid.deleteItem({{ $item->id }});"
                                    title="@lang('unicorn.toolbar.delete')">
                                    <span class="fa fa-trash"></span>
                                </button>
                            </td>

                            {{-- ID --}}
                            <td class="searchable text-end">
                                {{ $entity->id }}
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

        <div class="d-none">
            <input type="hidden" name="_method" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
        <x-user-switch-modal></x-user-switch-modal>
    </form>

@stop
