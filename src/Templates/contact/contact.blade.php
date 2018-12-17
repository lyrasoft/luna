{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $form     \Windwalker\Form\Form
 */
?>

@extends('_global.html')

@section('content')
    <style>
        #input-item-subject {
            /*font-size: 1.3em;*/
            /*line-height: 34px;*/
        }

        .form-group {
            position: relative;
        }
    </style>
    <div class="container contact-item">
        <form id="contact-form" action="{{ $router->to('contact') }}" method="post" enctype="multipart/form-data">
            <div class="row">
                <div class="col-md-8 col-md-offset-2 mx-auto">
                    <h1>@translate($luna->langPrefix . 'contact.title')</h1>

                    <p>
                        @translate($luna->langPrefix . 'contact.form.description')
                    </p>

                    <hr/>

                    <fieldset class="basic-fieldset">
                        <div class="form-group">
                            {!! $form->getField('subject')->renderInput() !!}
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    {!! $form->getField('name')->renderInput() !!}
                                </div>
                                <div class="col-md-6">
                                    {!! $form->getField('email')->renderInput() !!}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    {!! $form->getField('phone')->renderInput() !!}
                                </div>
                                <div class="col-md-6">
                                    {!! $form->getField('url')->renderInput() !!}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    {!! $form->getField('content')->renderInput() !!}
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    @if (count($form->getFields(null, 'details')))
                        <hr/>

                        <fieldset id="details-fieldset">
                            @foreach ($form->getFields(null, 'details') as $field)
                                <div class="form-group">
                                    {!! $field->renderLabel() !!}
                                    <div class="input-container">
                                        {!! $field->renderInput() !!}
                                    </div>
                                </div>
                            @endforeach

                        </fieldset>
                    @endif

                    <div class="contact-captcha form-group">
                        {!! $form->getField('captcha')->renderInput() !!}
                    </div>

                    <div class="hidden-inputs">
                        @formToken
                    </div>

                    <div class="contact-actions">
                        <button type="button" class="btn btn-primary btn-block btn-lg"
                            onclick="jQuery(this.form).submit();">
                            @translate($luna->langPrefix . 'contact.button.submit')
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
@stop
