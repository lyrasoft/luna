<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        \Lyrasoft\Luna\Module\Admin\Widget\WidgetEditView  The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Module\Admin\Widget\WidgetEditView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var Form   $form
 * @var Widget $item
 * @var \Lyrasoft\Luna\Widget\AbstractWidget $typeClass
 * @var \Lyrasoft\Luna\Widget\AbstractWidget $widgetInstance
 */

$tabs = $form->getFieldsets();
unset($tabs['meta']);
?>

@extends('admin.global.body-edit')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        uni-form-validate='{"scroll": true}'
        action="{{ $nav->to('widget_edit') }}"
        method="POST" enctype="multipart/form-data">

        <x-title-bar :form="$form"></x-title-bar>

        <div class="mb-3">
            {!! $typeClass::getTypeDescription($lang) !!}
        </div>

        <div class="row">
            <div class="col-md-7">
                <ul class="nav nav-tabs" role="tablist">
                    <?php $i = 0; ?>
                    @foreach ($tabs as $name => $tab)
                        @if (!$tab->getTitle())
                            @continue
                        @endif

                        <li class="nav-item">
                            <a href="#tab-{{ $name }}"
                                class="nav-link {{ $i === 0 ? 'active' : '' }}"
                                data-bs-toggle="tab">
                                {{ $tab->getTitle() }}
                            </a>
                        </li>
                        <?php $i++; ?>
                    @endforeach
                </ul>

                <div class="tab-content mt-3" id="field-tabs">
                <?php $i = 0; ?>
                @foreach ($tabs as $name => $tab)
                    @if (!$tab->getTitle())
                        @continue
                    @endif

                    {{-- Tab --}}
                    <div class="tab-pane fade {{ $i === 0 ? 'active show' : '' }}"
                        id="tab-{{ $tab->getName() }}"
                        role="tabpanel"
                        aria-labelledby="{{ $tab->getName() }}-tab">
                        <x-fieldset
                            title=""
                            :name="$tab->getName()"
                            :form="$form"
                            class=""
                            is="card"
                        >
                        </x-fieldset>
                    </div>
                    <?php $i++; ?>
                @endforeach
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
