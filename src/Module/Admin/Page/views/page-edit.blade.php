<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        PageEditView  The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Module\Admin\Page\PageEditView;
use Unicorn\Script\UnicornScript;
use Unicorn\Script\VueScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var Form $form
 * @var Page $item
 */

$uni = $app->retrieve(UnicornScript::class);
$uni->data(
    'tinymce_content_css',
    $asset->appendVersion(
        $asset->handleUri('@unicorn/editor.css')
    )
);
?>

@extends($app->config('luna.view_extends.admin.edit') ?? 'admin.global.body-edit')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <div class="">
        <page-builder-app id="page-builder-app"
            class="env-{{ $app->getMode() }}"
            page-id="{{ $item?->id }}"
        ></page-builder-app>
    </div>

    <form name="admin-form" id="admin-form"
        novalidate uni-form-validate='{"scroll": true}'
        action="{{ $nav->to('page_edit') }}"
        method="POST" enctype="multipart/form-data">

        <div class="d-none">
            @if ($idField = $form?->getField('id'))
                <input name="{{ $idField->getInputName() }}" type="hidden" value="{{ $idField->getValue() }}" />
            @endif

            @csrf
        </div>

        <x-modal-options :form="$form" :item="$item"></x-modal-options>
        <textarea name="item[content]" id="input-item-content" style="display: none;"></textarea>
        <textarea name="item[css]" id="input-item-css" style="display: none;"></textarea>
    </form>
@stop
