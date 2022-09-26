<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        MenuListView  The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$callback = $app->input('callback');
$workflow = $app->service(\Unicorn\Workflow\BasicStateWorkflow::class);

$app->service(\Unicorn\Script\UnicornScript::class)
    ->addRoute('self', $nav->self()->var('type', '{{type}}'));

$typeField = $app->make(\Lyrasoft\Luna\Field\MenuTypeListField::class)
    ->setName('type')
    ->setValue($type);
?>

@extends($app->config('luna.view_extends.admin.modal') ?? 'admin.global.pure')

@section('body')
    <form id="admin-form" action="" x-data="{ grid: $store.grid }"
        x-ref="gridForm"
        data-ordering="{{ $ordering }}"
        method="post">

        <x-filter-bar :form="$form" :open="$showFilters">
            <x-slot name="start">
                <x-field :field="$typeField" no-label style="min-width: 300px"></x-field>
            </x-slot>
        </x-filter-bar>

        <div>
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th>
                        <x-sort field="menu.title">
                            @lang('unicorn.field.title')
                        </x-sort>
                    </th>
                    <th class="text-nowrap">
                        <x-sort field="menu.view">
                            @lang('luna.menu.field.view')
                        </x-sort>
                    </th>
                    <th>
                        <x-sort field="menu.state">
                            @lang('unicorn.field.state')
                        </x-sort>
                    </th>
                    <th class="text-end text-nowrap" style="width: 1%">
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

                    $orders[$entity->getParentId()][] = $entity->getId();
                    $order = count($orders[$entity->getParentId()]);
                    ?>
                    @php($data = [
                        'title' => $item->title,
                        'value' => $item->id,
                        'image' => $item->image,
                    ])
                    <tr>
                        <td>
                            <div class="d-flex">
                                <div class="{{ $entity->getLevel() > 1 ? 'me-1' : '' }}">
                                    {{ str_repeat('—', $entity->getLevel() - 1) }}
                                </div>
                                <div>
                                    <a href="javascript://"
                                        onclick="parent.{{ $callback }}({{ json_encode($data) }})">
                                        {{ $item->title }}
                                    </a>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="small text-muted">
                                <?php $viewInstance = $vm->getViewInstance($entity->getView()) ?>
                                @if ($viewInstance)
                                    @lang('luna.menu.group.' . $viewInstance::getGroup())
                                @else
                                    @lang('luna.menu.unknown')
                                @endif
                            </div>
                            <div class="has-tooltip" title="{{ $entity->getView() }}">
                                @if ($viewInstance)
                                    {{ $viewInstance::getTitle($lang) }}
                                @else
                                    @lang('luna.menu.unknown')
                                @endif
                            </div>
                        </td>
                        <td>
                            <x-state-dropdown color-on="text"
                                button-style="width: 100%"
                                use-states
                                readonly
                                :workflow="$workflow"
                                :id="$entity->getId()"
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
            <input name="_method" type="hidden" value="PUT" />
            @csrf
        </div>

        <x-batch-modal :form="$form" namespace="batch"></x-batch-modal>
    </form>

@stop
