{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Windwalker\Data\Data
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */

\Phoenix\Script\BootstrapScript::tabState();
?>

@extends($luna->extends)

@section('toolbar-buttons')
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
    <form name="admin-form" id="admin-form" action="{{ $router->route('module', array('id' => $item->id)) }}"
          method="POST" enctype="multipart/form-data">

        @include('luna.form.title-bar')

        <div class="row">
            <div class="col-md-8">
                <div id="module-title-block" class="form-horizontal">
                    <p class="module-description">
                        {{ $moduleType->description }}
                    </p>
                </div>
                {{--<fieldset class="form-horizontal">--}}
                {{--<legend>@translate($luna->langPrefix . 'module.edit.fieldset.basic')</legend>--}}

                {{--{!! $form->renderFields('basic') !!}--}}
                {{--</fieldset>--}}

                @include('params')
            </div>
            <div class="col-md-4">
                <fieldset class="form-horizontal">
                    <legend>@translate($luna->langPrefix . 'module.edit.fieldset.created')</legend>

                    {!! $form->renderFields('created') !!}
                </fieldset>
            </div>
        </div>

        <div class="hidden-inputs">
            @formToken
        </div>

    </form>
@stop
