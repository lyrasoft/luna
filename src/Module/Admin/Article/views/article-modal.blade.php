<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
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
                        <x-sort field="article.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
                    <th style="width: 15%">
                        <x-sort field="article.category">
                            @lang('luna.article.field.category')
                        </x-sort>
                    </th>
                    <th style="width: 5%">
                        <x-sort field="article.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>
                    <th class="text-end text-nowrap" style="width: 1%">
                        <x-sort field="article.id">
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
                    @php($data = [
                        'title' => $item->title,
                        'value' => $item->id,
                        'image' => $item->image,
                    ])
                    <tr>
                        <td>
                            <div class="d-flex">
                                <div class="me-1">
                                    <span class="fa fa-angle-right text-muted"></span>
                                </div>
                                <div>
                                    <div>
                                        <a href="javascript://"
                                            onclick="parent.{{ $callback }}({{ json_encode($data) }})">
                                            {{ $item->title }}
                                        </a>
                                    </div>
                                    <div class="small text-muted">
                                        {{ $item->alias }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="">
                            {{ $item->category->title }}
                        </td>
                        <td>
                            <x-state-dropdown color-on="text"
                                style="width: 100%"
                                use-states
                                readonly
                                :workflow="$workflow"
                                :id="$entity->getId()"
                                :value="$item->state"
                            />
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
            <input name="_method" type="hidden" value="PUT" />
            @include('@csrf')
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
