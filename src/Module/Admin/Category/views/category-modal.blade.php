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

$callback = $app->input('callback');
$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);
?>

@extends($app->config('luna.view_extends.admin.modal') ?? 'admin.global.pure')

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
                        <x-sort field="category.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
                    {{-- STATE --}}
                    <th style="min-width: 90px;" width="7%">
                        <x-sort field="category.state" >@lang('unicorn.field.state')</x-sort>
                    </th>
                    <th class="text-end text-nowrap" style="width: 1%">
                        <x-sort field="category.id">
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
                            <div class="d-flex">
                                @if ($item->level > 1)
                                    <div class="me-2">
                                        {{ str_repeat('—', $item->level - 1) }}
                                    </div>
                                @endif
                                <div>
                                    <div>
                                        <a href="javascript://"
                                            onclick="parent.{{ $callback }}({{ json_encode($data) }})">
                                            {{ $item->title }}
                                        </a>
                                    </div>

                                    <div class="text-muted small">{{ $item->alias }}</div>
                                </div>
                            </div>
                        </td>
                        {{-- STATE --}}
                        <td class="">
                            <x-state-dropdown
                                :workflow="$workflow"
                                color-on="text"
                                button-style="width: 100%"
                                style="width: 100%"
                                use-states
                                readonly
                                :id="$item->id"
                                :value="$item->state"
                            ></x-state-dropdown>
                        </td>
                        <td class="text-end">
                            {{ $item->id }}
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

        <div class="d-none">
            @formToken

            <input name="_method" type="hidden" value="PUT" />
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
