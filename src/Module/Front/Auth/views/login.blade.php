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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

@extends('global.body')

@section('style')
    <style>
        body.enlarged {
            min-height: inherit;
        }

        body {
            padding-bottom: 0;
        }
    </style>
@stop

@section('body')
    <div class="container l-login" style="margin-top: 100px">
        <div class="row justify-content-center">
            <div class="col-md-10 col-lg-4">
                @include('@messages')

                <form id="login-form" class="form-horizontal" action="{{ $nav->to('login') }}"
                    uni-form-validate
                    method="POST"
                    enctype="multipart/form-data">

                    {{-- Todo: Implement re-activate--}}
                    @if ($reActivate ?? null)
                        Re-send activate email
                        <div class="mb-4">
                            <div class="alert alert-info text-center">
                                <p>
                                    @lang('luna.login.message.inactivated')
                                </p>
                                <div>
                                    <button type="button" class="btn btn-info disable-on-submit"
                                        onclick="$('#user-form').attr('action', '{{ $nav->to('resend_activate', ['email' => $reActivate]) }}').submit()">
                                        @lang('luna.button.resend.activate.mail')
                                    </button>
                                </div>
                            </div>
                        </div>
                    @endif

                    <x-fieldset :form="$form"></x-fieldset>

                    <div class="d-sm-flex justify-content-between mb-5">
                        <div id="input-user-remember-control mb-3 mb-sm-0" class="checkbox-field">
                            <div class="form-check checkbox checkbox-primary">
                                <input name="remember" class="form-check-input" type="checkbox"
                                    id="input-user-remember" value="on">
                                <label class="form-check-label" for="input-user-remember">
                                    @lang('luna.user.field.remember')
                                </label>
                            </div>
                        </div>

                        <div class="l-login__action">
                            <a class="forget-link"
                                href="{{ $nav->to('forget_request') }}">
                                @lang('luna.login.forget.link')
                            </a>
                        </div>
                    </div>

                    <div class="l-login__buttons c-login-buttons d-flex flex-column mb-4">
                        <button
                            class="c-login-button btn btn-primary mb-3"
                            data-dos
                        >
                            @lang('luna.login.submit.button')
                        </button>
                        <a class="c-register-button btn btn-success"
                            href="{{ $nav->to('registration') }}">
                            <span class="fa fa-user-plus"></span>
                            @lang('luna.login.register.button')
                        </a>
                    </div>

                    <div class="text-center mb-2">or</div>

                    <p class="position-relative">
                        <button
                            type="button"
                            class="social-login-google-button btn btn-google btn-block disable-on-submit d-flex align-items-center"
                        >
                            <span class="fa fab fa-fw fa-google c-icon"></span>
                            <span class="flex-grow-1">
                                            @lang('datavideo.user.login.btn.google')
                                        </span>
                        </button>
                    </p>

                    <p class="position-relative">
                        <button
                            type="button"
                            class="social-login-facebook-button btn btn-facebook btn-block disable-on-submit d-flex align-items-center"
                        >
                            <i class="fa fab fa-fw fa-facebook-square c-icon"></i>
                            <span class="flex-grow-1">
                                            @lang('datavideo.user.login.btn.facebook')
                                        </span>
                        </button>
                    </p>

                    <div class="hidden-inputs">
                        @include('@csrf')
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop
