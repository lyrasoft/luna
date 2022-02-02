<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        MenuEditView  The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Module\Admin\Menu\MenuEditView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var Form      $form
 * @var Menu $item
 */

$app->service(\Unicorn\Script\UnicornScript::class)->data('current.type', $type);
$app->service(\Unicorn\Script\UnicornScript::class)->data('current.view', $viewInstance ? $viewInstance::getName() : '');

$options = [];

$tabs = $form->getFieldsets();
unset($tabs['basic'], $tabs['meta']);
?>

@extends($app->config('luna.view_extends.admin.edit') ?? 'admin.global.body-edit')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        x-data="{item: {}}"
        novalidate uni-form-validate='{"scroll": true}'
        action="{{ $nav->to('menu_edit') }}"
        method="POST" enctype="multipart/form-data">

        <x-title-bar :form="$form"></x-title-bar>

        <div class="row">
            <div class="col-md-7">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a href="#tab-basic" class="nav-link active" data-bs-toggle="tab">
                            @lang('unicorn.fieldset.basic')
                        </a>
                    </li>

                    @if (isset($tabs))
                        @foreach ($tabs as $name => $tab)
                            @if (!$tab->getTitle())
                                @continue
                            @endif

                            <li class="nav-item">
                                <a href="#tab-{{ $name }}" class="nav-link" data-bs-toggle="tab">
                                    {{ $tab->getTitle() }}
                                </a>
                            </li>
                        @endforeach
                    @endif
                </ul>

                <div class="tab-content mt-3" id="field-tabs">
                    {{-- Basic Tab --}}
                    <div class="tab-pane fade show active" id="tab-basic" role="tabpanel" aria-labelledby="basic-tab">
                        <x-card :title="$lang('unicorn.fieldset.basic')" class="mb-4">
                            <x-fieldset name="basic"
                                :form="$form"
                                class="mb-4"
                                is="div"
                            >
                            </x-fieldset>
                            <x-slot name="end">
                                @if (isset($viewInstance))
                                    <hr />
                                    <div class="card-body">
                                        <h4 class="card-title">
                                            @lang('luna.menu.view.desc.title')
                                        </h4>
                                        {!! html_escape($viewInstance::getDescription($lang)) !!}
                                    </div>
                                @endif
                            </x-slot>
                        </x-card>

                        <x-fieldset :title="$lang('luna.menu.edit.fieldset.variables')"
                            ns="variables"
                            :form="$form"
                            class="mb-4"
                            is="card"
                        >
                        </x-fieldset>
                    </div>

                    @if (isset($tabs))
                        @foreach ($tabs as $name => $tab)
                            @if (!$tab->getTitle())
                                @continue
                            @endif

                            {{-- Tab --}}
                            <div class="tab-pane fade" id="tab-{{ $tab->getName() }}" role="tabpanel" aria-labelledby="{{ $tab->getName() }}-tab">
                                <x-fieldset
                                    title=""
                                    :name="$tab->getName()"
                                    :form="$form"
                                    class=""
                                    is="card"
                                >
                                </x-fieldset>
                            </div>
                        @endforeach
                    @endif
                </div>
            </div>
            <div class="col-md-5">
                <x-fieldset name="meta" :title="$lang('unicorn.fieldset.meta')"
                    :form="$form"
                    class="mb-4"
                    is="card"
                >
                </x-fieldset>
            </div>
        </div>

        <div class="d-none">
            @if ($idField = $form?->getField('id'))
                <input name="{{ $idField->getInputName() }}" type="hidden" value="{{ $idField->getValue() }}" />
            @endif

            @csrf
        </div>
    </form>
@stop
