<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        \Lyrasoft\Luna\Module\Front\Auth\AuthLoginView          The view model object.
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
                        <div class="mb-4">
                            <div class="alert alert-info text-center">
                                <p>
                                    @lang('luna.login.message.inactivated')
                                </p>
                                <div>
                                    <button type="button" class="btn btn-info disable-on-submit"
                                        onclick="form.action = '{{ $nav->to('resend_activate', ['email' => $reActivate]) }}'; form.submit()">
                                        @lang('luna.button.resend.activate.mail')
                                    </button>
                                </div>
                            </div>
                        </div>
                    @endif

                    @if ($vm->hasSocialProviders())
                        <div class="d-flex flex-column">
                            @foreach ($vm->getSocialProviders() as $provider => $config)
                                <a class="btn btn-secondary mb-2"
                                    href="{{ $nav->to('social_auth')->var('provider', $provider) }}">
                                    <i class="fa-brands fa-{{ strtolower($provider) }}"></i>
                                    {{ $provider }}
                                </a>
                            @endforeach

                            <div class="my-3 text-center">
                                OR
                            </div>
                        </div>
                    @endif

                    <x-fieldset :form="$form"></x-fieldset>

                    <div class="d-sm-flex justify-content-between mb-5">
                        <div id="input-user-remember-control mb-3 mb-sm-0" class="checkbox-field">
                            <div class="form-check checkbox checkbox-primary">
                                <input name="user[remember]" class="form-check-input" type="checkbox"
                                    id="input-user-remember" value="on">
                                <label class="form-check-label" for="input-user-remember">
                                    @lang('luna.user.field.remember')
                                </label>
                            </div>
                        </div>

                        <div class="l-login__action">
                            <a class="forget-link"
                                href="{{ $nav->to('forget_request') }}">
                                @lang('luna.button.forget')
                            </a>
                        </div>
                    </div>

                    <div class="l-login__buttons c-login-buttons d-flex flex-column mb-4">
                        <button
                            class="c-login-button btn btn-primary mb-3"
                            data-dos
                        >
                            @lang('luna.button.login')
                        </button>
                        <a class="c-register-button btn btn-success"
                            href="{{ $nav->to('registration') }}">
                            <span class="fa fa-user-plus"></span>
                            @lang('luna.button.register')
                        </a>
                    </div>

                    <div class="hidden-inputs">
                        @include('@csrf')
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop
