<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
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

@section('content')
    <div class="container l-forget-complete" style="margin-top: 70px">
        <div class="row justify-content-center mb-5">
            <div class="col-md-6 mx-md-auto">
                <div class="mb-3 text-center">
                    @lang('luna.forget.complete.desc')
                </div>
                <div>
                    <a class="btn btn-primary btn-block w-100"
                        href="{{ $nav->to('login') }}">
                        @lang('luna.forget.complete.go.login.button')
                    </a>
                </div>
            </div>
        </div>
    </div>
@stop
