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
?>

@extends('_global.admin.admin-edit')

@section('toolbar')
    @include('toolbar')
@stop

@section('admin-body')
<form name="admin-form" id="admin-form" action="{{ $router->html('module') }}" method="POST" enctype="multipart/form-data">

    <div class="row form-horizontal">
        <div class="col-md-8">
            {!! $form->renderField('title') !!}
        </div>
    </div>

    <div class="row">
        <div class="col-md-7">
            {{--<fieldset class="form-horizontal">--}}
                {{--<legend>@translate($lunaPrefix . 'module.edit.fieldset.basic')</legend>--}}

                {{--{!! $form->renderFields('basic') !!}--}}
            {{--</fieldset>--}}

            <?php
            $moduleForm = $module->getForm($item->params);
            $fieldsets = $moduleForm->getFieldsets();

            if ($type == 'custom')
            {
                array_unshift($fieldsets, 'text');
            }
            ?>
            <ul class="nav nav-tabs" role="tablist">
                @foreach ($fieldsets as $i => $fieldset)
                    <li role="presentation" class="{{ $i != 0 ? null : 'active' }}">
                        <a href="#fieldset-{{ $fieldset }}" aria-controls="home" role="tab" data-toggle="tab">
                            @translate($module->getLangPrefix() . 'module.edit.fieldset.' . $fieldset)
                        </a>
                    </li>
                @endforeach
            </ul>

            <?php
            $firstSet = array_shift($fieldsets);
            ?>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="fieldset-{{ $firstSet }}">
                    <div class="form-horizontal" style="margin-top: 40px; margin-bottom: 40px;">
                        {!! $moduleForm->renderFields($firstSet) !!}
                    </div>

                    @if ($type == 'custom')
                        {!! $form->getField('content')->renderInput() !!}
                    @endif
                </div>

                @foreach ($fieldsets as $fieldset)
                    <div role="tabpanel" class="tab-pane fade" id="fieldset-{{ $fieldset }}">
                        <div class="form-horizontal" style="margin-top: 40px; margin-bottom: 40px;">
                            {!! $moduleForm->renderFields($fieldset) !!}
                        </div>
                    </div>
                @endforeach
            </div>

        </div>
        <div class="col-md-5">
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
