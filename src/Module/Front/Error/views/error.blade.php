<?php

declare(strict_types=1);

namespace App\View;

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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

/**
 * @var Throwable $exception
 */

$code = $exception->getCode();

$msg = $exception->getMessage();

if ($code === 404) {
    $msg = $lang('luna.error.not.found');
} elseif ($code < 400 || $code >= 500) {
    $msg = $lang('luna.error.internal');
    $code = 500;
}

?>

@extends($app->config('luna.view_extends.' . $stage . '.error') ?? 'global.body')

@section('content')
    <style>
        #error-code-title {
            font-size: 200px;
        }
    </style>
    <div class="container error-item">
        <div id="error-code" class="text-center">
            <h1 id="error-code-title">{{ $code }}</h1>
        </div>

        <div id="error-message" class="text-center">
            <h2 id="error-message-title">
                {{ $msg }}
            </h2>
        </div>
    </div>
@stop
