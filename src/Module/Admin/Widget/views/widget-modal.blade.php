<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        \Lyrasoft\Luna\Module\Admin\Widget\WidgetListView  The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Module\Admin\Widget\WidgetListView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$callback = $app->input('callback');
$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);
?>

@extends('admin.global.pure')

@push('script')
    <script type="text/javascript">
        for (const el of document.querySelectorAll('[data-task="post-message"]')) {
            el.addEventListener('click', () => {
                parent.postMessage([el.dataset.instanceId, JSON.parse(el.dataset.payload)], '{{ $uri->root() }}');
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
                    <th>
                        <x-sort field="widget.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
                    <th>
                        <x-sort field="widget.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>
                    <th class="text-end text-nowrap" style="width: 1%">
                        <x-sort field="widget.id">
                            @lang('unicorn.field.id')
                        </x-sort>
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach($items as $i => $item)
                    @php($data = [
                        'title' => $item->title,
                        'value' => $item->id,
                        'image' => $item->image,
                    ])
                    <tr>
                        <td>
                            <a href="javascript:void(0)"
                                data-task="post-message"
                                data-instance-id="{{ $callback }}"
                                data-payload="@json($data)"
                            >
                                <span class="fa fa-angle-right text-muted"></span>
                                {{ $item->title }}
                            </a>
                        </td>
                        <th>
                            <x-state-dropdown color-on="text"
                                button-style="width: 100%"
                                use-states
                                readonly
                                :workflow="$workflow"
                                :id="$item->id"
                                :value="$item->state"
                            ></x-state-dropdown>
                        </th>
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
            <input name="_method" type="hidden" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
