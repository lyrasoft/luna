<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        AuthLoginView          The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Module\Admin\Auth\AuthLoginView;
use Unicorn\Script\UnicornScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Core\Utilities\Base64Url;

$htmlFrame = $app->service(HtmlFrame::class);
$app->service(UnicornScript::class)
    ->data('challenge', Base64Url::encode(random_bytes(32)))
    ->data('sitename', $htmlFrame->getSiteName())
    ->data('siteid', $uri->host());

?>

@extends($app->config('luna.view_extends.admin.auth') ?? 'admin.global.auth')

@section('container')
    <form id="login-form" class="l-login" action="{{ $nav->to('login') }}" method="POST"
        enctype="multipart/form-data">

        <div class="container">
            <x-fieldset :form="$form" ns="user" is="div">

            </x-fieldset>

            <div id="input-user-remember-control" class="checkbox-field" style="margin-bottom: 20px">
                <div class="form-check checkbox checkbox-primary">
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
