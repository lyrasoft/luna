<?php

declare(strict_types=1);

namespace App\View;

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

use Lyrasoft\Luna\Auth\SRP\SRPService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$srp = $app->service(SRPService::class);
?>

@extends($app->config('luna.view_extends.admin.auth') ?? 'admin.global.auth')

@section('container')
    <form id="login-form" class="l-login" action="{{ $nav->to('login') }}" method="POST"
        enctype="multipart/form-data"
        {!! $srp->loginDirective() !!}
    >

        <div class="container d-flex flex-column gap-4">
            <x-fieldset :form="$form" ns="user" is="div">

            </x-fieldset>

            <div id="input-user-remember-control" class="checkbox-field">
                <div class="form-check checkbox checkbox-primary m-0">
                    <input name="user[remember]" class="form-check-input" type="checkbox" id="input-user-remember"
                        value="on">
                    <label class="form-check-label" for="input-user-remember">
                        @lang('luna.login.field.remember')
                    </label>
                </div>
            </div>

            <p class="login-button-group">
                <button class="login-button btn btn-primary w-100"
                    data-dos>
                    @lang('luna.button.login')
                </button>
            </p>

            <div class="hidden-inputs">
                @csrf
            </div>
        </div>
    </form>
@stop
