<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $view      ViewModel       The view modal object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
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

@extends('mail.mail-layout')

@section('content')
    <p>
        @lang('luna.email.hi', name: $user->getName())
    </p>

    <p>
        @lang('luna.email.registration.intro')
    </p>

    <p>
        @lang('luna.email.registration.actions')
    </p>

    <p>
        <a class="btn btn-primary" href="{{ $link }}">
            @lang('luna.email.registration.button.confirm')
        </a>
    </p>
@stop
