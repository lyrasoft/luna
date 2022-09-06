<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        ArticleEditView  The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;
use Lyrasoft\Luna\Module\Admin\Article\ArticleEditView;

/**
 * @var Form  $form
 * @var \Lyrasoft\Luna\Entity\Article $item
 */
?>

@extends($app->config('luna.view_extends.admin.edit') ?? 'admin.global.body-edit')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        novalidate uni-form-validate='{"scroll": true}'
        action="{{ $nav->to('article_edit') }}"
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
            <div class="col-md-8">
                <x-fieldset name="text"
                    :form="$form" class="mb-4"
                >
                </x-fieldset>
            </div>
            <div class="col-md-4">
                <x-fieldset name="meta" title="Meta"
                    :form="$form" class="mb-4"
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
