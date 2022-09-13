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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

@extends('mail.mail-layout')

@section('content')
    <p>
        @lang('luna.email.hi', name: $user->getName())
    </p>

    <p>
        @lang('luna.email.forget.intro')
    </p>

    <p>
        @lang('luna.email.forget.actions')
    </p>

    <p>
        <a href="{{ $link }}" class="btn btn-primary">
            @lang('luna.email.forget.button.reset')
        </a>
    </p>
@stop
