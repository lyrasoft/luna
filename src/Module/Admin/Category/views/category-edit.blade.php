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

?>

@extends($app->config('luna.view_extends.admin.edit') ?? 'admin.global.body-edit')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        action="{{ $nav->self() }}"
        uni-form-validate='{"scroll": true}'
        method="POST" enctype="multipart/form-data">

        <x-title-bar :form="$form">
            @if ($vm->isLocaleEnabled())
                <x-slot name="end">
                    <?php $form['language']->currentId($item?->getId()) ?>
                    <x-field :field="$form['language']" no-label></x-field>
                </x-slot>
            @endif
        </x-title-bar>

        <div class="row">
            <div class="col-lg-7">
                <x-fieldset :form="$form" name="basic" :title="$lang('unicorn.fieldset.basic')" is="card"></x-fieldset>
            </div>

            <div class="col-lg-5">
                <x-fieldset :form="$form" name="meta" :title="$lang('unicorn.fieldset.meta')" is="card"></x-fieldset>
            </div>
        </div>

        <div class="hidden-inputs">
            @if ($idField = $form?->getField('id'))
                <input name="{{ $idField->getInputName() }}" type="hidden" value="{{ $idField->getValue() }}" />
            @endif

            @csrf
        </div>

    </form>
@stop
