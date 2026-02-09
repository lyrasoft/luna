<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        \Lyrasoft\Luna\Module\Admin\User\UserListView          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$callback = $app->input('callback');

$enabledButton = $vm->createEnabledButton();
$verifiedButton = $vm->createVerifiedButton();

$imgPlaceholder = $app->service(\Unicorn\Image\ImagePlaceholder::class);
$luna = $app->service(\Lyrasoft\Luna\LunaPackage::class);

$loginName = $luna->getLoginName();
?>

@extends($app->config('luna.view_extends.admin.modal') ?? 'admin.global.pure')

@push('script')
    <script type="text/javascript">
        for (const el of document.querySelectorAll('[data-task="post-message"]')) {
            el.addEventListener('click', () => {
                parent.postMessage([el.dataset.instanceId, JSON.parse(el.dataset.payload)]);
            });
        }
    </script>
@endpush

@section('body')
    <form id="admin-form" action="" x-data="{ grid: $store.grid }"
        x-ref="gridForm"
        data-ordering="{{ $ordering }}"
        method="post">

        <x-filter-bar :form="$form" :open="$showFilters"></x-filter-bar>

        <div>
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th class="text-nowrap">
                        <x-sort field="user.last_name">@lang('luna.user.field.name')</x-sort>
                        /
                        <x-sort field="user.email">@lang('luna.user.field.email')</x-sort>
                    </th>

                    @if ($loginName !== 'email')
                        <th>
                            <x-sort :field="'user.' . $loginName">@lang('luna.user.field.' . $loginName)</x-sort>
                        </th>
                    @endif

                    {{-- ENABLED --}}
                    <th width="3%" class="text-nowrap">
                        <x-sort field="user.enabled">@lang('luna.user.field.enabled')</x-sort>
                    </th>

                    {{-- Activation --}}
                    <th width="3%" class="text-nowrap">
                        <x-sort field="user.verified">@lang('luna.user.field.verified')</x-sort>
                    </th>

                    <th class="text-end">
                        <x-sort field="category.id">
                            ID
                        </x-sort>
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach($items as $i => $item)
                    @php($entity = $vm->prepareItem($item))
                    @php($data = [
                        'title' => $item->name,
                        'value' => $item->id,
                        'image' => $item->image,
                    ])
                    <tr>
                        {{-- NAME --}}
                        <td class="searchable">
                            <div class="d-flex align-items-center">
                                <div class="user-avatar-wrapper mr-2">
                                    @if (method_exists($entity, 'getAvatar'))
                                        @if ($entity->getAvatar())
                                            <img class="c-user-avatar rounded-circle me-2"
                                                src="{{ $item->avatar }}"
                                                height="45"
                                                alt="Avatar">
                                        @else
                                            <div class="user-avatar user-avatar-default"></div>
                                        @endif
                                    @endif
                                </div>
                                <div>
                                    <div class="user-name">
                                        <a href="javascript://"
                                            data-task="post-message"
                                            data-instance-id="{{ $callback }}"
                                            data-payload="@json($data)"
                                        >
                                            {{ $entity->getName() }}
                                        </a>
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

                        {{-- ENABLED --}}
                        <td class="text-center">
                            <x-state-button :states="$enabledButton"
                                :value="$item->enabled"
                                :id="$item->id"
                                :options="['onlyIcon' => true]"
                            ></x-state-button>
                        </td>

                        {{-- Activation --}}
                        <td class="text-center">
                            <x-state-button :states="$verifiedButton"
                                :value="$item->verified"
                                :id="$item->id"
                                :options="['onlyIcon' => true]"
                            ></x-state-button>
                        </td>

                        <td class="text-end">
                            {{ $item->id }}
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>

            <div>
                <x-pagination :pagination="$pagination" in-modal>
                    <x-slot name="end">
                        <x-pagination-jump :pagination="$pagination" />
                        <x-pagination-stats :pagination="$pagination" class="ms-0 ms-md-auto" />
                    </x-slot>
                </x-pagination>
            </div>
        </div>

        <div class="d-none">
            <input type="hidden" name="_method" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
