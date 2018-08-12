{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Page\PageHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\PageRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */
?>

@extends('_global.luna.admin')

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('admin-body')
    <form name="admin-form" id="admin-form" action="{{ $router->route('page', ['id' => $item->id]) }}" method="POST"
        enctype="multipart/form-data">

        <div class="row">
            <div class="col-md-7">
                <fieldset id="fieldset-basic" class="form-horizontal">
                    <legend>@lang('luna.page.edit.fieldset.basic')</legend>

                    {!! $form->renderFields('basic') !!}
                </fieldset>

                <fieldset id="fieldset-text" class="form-horizontal">
                    <legend>@lang('luna.page.edit.fieldset.text')</legend>

                    {!! $form->renderFields('text') !!}
                </fieldset>
            </div>
            <div class="col-md-5">
                <fieldset id="fieldset-created" class="form-horizontal">
                    <legend>@lang('luna.page.edit.fieldset.created')</legend>

                    {!! $form->renderFields('created') !!}
                </fieldset>
            </div>
        </div>

        <div class="hidden-inputs">
            @formToken()
        </div>

    </form>
@stop
