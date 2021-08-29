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
        Hi {{ $user->getName() }}
    </p>

    <p>
        You register a new user account at Datavideo.
        Please verify your email.
    </p>

    <p>
        Click this button to:
    </p>

    <p>
        <a class="btn btn-primary" href="{{ $link }}">
            Verify my email
        </a>
    </p>

    <p>
        Thank you.
    </p>
@stop
