<?php
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

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$htmlFrame->setTitle('Category Edit: ' . $lang("luna.$type.title"));
?>

@extends('admin.global.body')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        action="{{ $nav->to('category', ['type' => $type, 'code' => \App\Datavideo\Region\RegionService::getRegionCodeByInput()]) }}"
        uni-form-validate='{"scroll": true}'
        method="POST" enctype="multipart/form-data">

        @include('@lang-nav', ['regions' => $regions, 'type' => $type])

        <div class="row">
            <div class="col-md-7">
                <fieldset class="form-horizontal">
                    {!! $form->renderFields('basic') !!}
                </fieldset>

                @if ($type === \App\Services\CategoryService::TYPE_PRODUCT)
                    <div class="card">
                        <h3 class="card-header">
                            Spec Dividers
                        </h3>
                        <div class="card-body">
                            @include('repeatable.dividers')
                        </div>
                    </div>
                @endif
            </div>

            <div class="col-md-5">
                <fieldset class="form-horizontal">
                    <legend>@lang('luna.category.edit.fieldset.created')</legend>

                    {!! $form->renderFields('created') !!}
                </fieldset>
            </div>
        </div>

        <div class="hidden-inputs">
            <input name="item[type]" type="hidden" value="{{ $type }}" />
            @formToken
        </div>

    </form>
@stop
