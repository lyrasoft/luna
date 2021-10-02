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

@extends($app->config('luna.view_extends.front.auth') ?? 'global.body')

@section('content')
    <div class="container l-forget-request" style="margin-top: 70px">
        <div class="row justify-content-center">
            <div class="col-sm-10 col-md-8 col-lg-6">
                <form id="forget-form" class="form-horizontal" action="{{ $nav->to('forget_request') }}"
                    method="POST" enctype="multipart/form-data">

                    <p class="lead text-center">
                        @lang('luna.forget.text.desc')
                    </p>

                    <div class="mb-4">
                        <label for="input-forget-email" class="form-label">
                            @lang('luna.user.field.email')
                        </label>
                        <input id="input-forget-email"
                            type="email"
                            name="email"
                            class="form-control"
                            required
                        />
                    </div>

                    <div class="text-center">
                        <p class="reset-button-group">
                            <button class="request-button btn btn-primary c-btn-width"
                                data-dos>
                                @lang('luna.forget.button.request')
                            </button>
                        </p>
                    </div>

                    <div class="hidden-inputs">
                        @include('@csrf')
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop
