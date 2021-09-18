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

@extends('admin.global.body')

@section('container')
    <div class="container l-login">
        <div class="row justify-content-center">

            <div class="col-md-6" style="margin-top: 50px">
                <form id="login-form" class="" action="{{ $nav->to('login') }}" method="POST"
                    enctype="multipart/form-data">

                    @include('@messages')

                    <x-fieldset :form="$form" ns="user" is="div">

                    </x-fieldset>

                    <div id="input-user-remember-control" class="checkbox-field" style="margin-bottom: 20px">
                        <div class="form-check checkbox checkbox-primary">
                            <input name="user[remember]" class="form-check-input" type="checkbox" id="input-user-remember" value="on">
                            <label class="form-check-label" for="input-user-remember">
                                @lang('luna.login.field.remember')
                            </label>
                        </div>
                    </div>

                    <p class="login-button-group">
                        <button class="login-button btn btn-primary btn-block disable-on-submit">
                            @lang('luna.button.login')
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
