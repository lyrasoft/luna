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
    <div class="container l-forget-request-complete" style="margin-top: 70px">
        <div class="d-flex justify-content-center mb-5 mb-md-6">
            <div class="text-center">
                <div class="mb-4">
                    <span class="fa fa-inbox fa-4x"></span>
                </div>
                <p class="lead">
                    @lang('luna.forget.request.complete.desc')
                </p>
            </div>
        </div>
    </div>
@stop
