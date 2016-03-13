{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Registry\Registry               Uri information, example: $uri['media.path']
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item  \Windwalker\Data\Data
 * @var $state \Windwalker\Registry\Registry
 * @var $form  \Windwalker\Form\Form
 */

\Phoenix\Script\BootstrapScript::tabState();
?>

@extends('_global.admin.admin-edit')

@section('toolbar')
    @include('toolbar')
@stop

@section('admin-body')
<style>
    #module-title-block {
        margin-bottom: 30px;
    }

    #module-param-block {
        margin: 30px 0;
    }
</style>
<form name="admin-form" id="admin-form" action="{{ $router->html('module') }}" method="POST" enctype="multipart/form-data">

    <div class="row">
        <div class="col-md-8">
            <div id="module-title-block" class="form-horizontal">
                {!! $form->renderField('title') !!}

                <br />
                <p class="module-description">
                    @translate($moduleType->description)
                </p>
            </div>
            {{--<fieldset class="form-horizontal">--}}
                {{--<legend>@translate($lunaPrefix . 'module.edit.fieldset.basic')</legend>--}}

                {{--{!! $form->renderFields('basic') !!}--}}
            {{--</fieldset>--}}

            @include('params')
        </div>
        <div class="col-md-4">
            <fieldset class="form-horizontal">
                <legend>@translate($lunaPrefix . 'module.edit.fieldset.created')</legend>

                {!! $form->renderFields('created') !!}
            </fieldset>
        </div>
    </div>

    <div class="hidden-inputs">
        {!! \Windwalker\Core\Security\CsrfProtection::input() !!}
    </div>

</form>
@stop
