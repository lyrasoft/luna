{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Luna\LunaPackage                 Package object.
 * @var $view     \Luna\View\Contact\ContactHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Luna\Record\ContactRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
    <form name="admin-form" id="admin-form" action="{{ $router->route('contact', ['id' => $item->id]) }}" method="POST"
          enctype="multipart/form-data">

        <div class="row">
            <div class="col-md-7">
                <fieldset id="fieldset-basic" class="form-horizontal">
                    <legend>@translate('luna.contact.edit.fieldset.basic')</legend>

                    {!! $form->renderFields('basic') !!}
                </fieldset>

                <fieldset id="fieldset-text" class="form-horizontal">
                    <legend>@translate('luna.contact.edit.fieldset.text')</legend>

                    {!! $form->renderFields('text') !!}
                </fieldset>
            </div>
            <div class="col-md-5">
                <fieldset id="fieldset-created" class="form-horizontal">
                    <legend>@translate('luna.contact.edit.fieldset.created')</legend>

                    {!! $form->renderFields('created') !!}
                </fieldset>

                @if (count($form->getFields(null, 'details')))
                    <fieldset id="fieldset-created" class="form-horizontal">
                        <legend>@translate('luna.contact.edit.fieldset.details')</legend>

                        {!! $form->renderFields(null, 'details') !!}
                    </fieldset>
                @endif
            </div>
        </div>

        <div class="hidden-inputs">
            @formToken()
        </div>

    </form>
@stop
