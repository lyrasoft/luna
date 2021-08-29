<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $view      ViewModel       The view modal object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

@extends('global.body')

@section('body')
<div class="container l-registration" style="margin-top: 70px">
    <div class="row justify-content-center">
        <div class="col-sm-8 col-md-6 col-lg-4">
            <form id="registration-form" class="" action="{{ $nav->to('registration') }}"
                method="POST"
                enctype="multipart/form-data">

                <x-fieldset :form="$form"></x-fieldset>

                <div class="l-registration-actions mt-4 mb-4">
                    <button type="submit"
                        class="login-button btn btn-primary btn-block w-100" data-dos>
                        @lang('luna.registration.submit.button')
                    </button>
                </div>

                <div class="d-none">
                    @include('@csrf')
                </div>
            </form>
        </div>
    </div>
</div>
@stop
