<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        object          The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Lyrasoft\Luna\Entity\User;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var Form      $form
 * @var User $item
 */
?>

@extends($app->config('luna.view_extends.admin.edit') ?? 'global.admin.body-edit')

@section('sidebar', '')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        novalidate uni-form-validate='{"scroll": true}'
        action="{{ $nav->to('user_edit') }}"
        method="POST" enctype="multipart/form-data">

        <div class="row">
            <div class="col-md-7">
                <x-fieldset name="basic" :title="$lang('luna.fieldset.basic')"
                    :form="$form" class="mb-4" is="card"
                >
                </x-fieldset>
                <x-fieldset name="password" :title="$lang('luna.change.password')"
                    :form="$form" class="mb-4" is="card"
                >
                </x-fieldset>
            </div>
            <div class="col-md-5">
                <x-fieldset name="meta" :title="$lang('luna.fieldset.meta')"
                    :form="$form" class="mb-4" is="card"
                >
                </x-fieldset>
            </div>
        </div>

        <div class="d-none">
            @if ($idField = $form?->getField('id'))
                <input name="{{ $idField->getInputName() }}" type="hidden" value="{{ $idField->getValue() }}" />
            @endif

            @include('@csrf')
        </div>
    </form>
@stop
