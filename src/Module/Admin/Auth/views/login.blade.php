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
use Unicorn\Script\UnicornScript;
use Unicorn\Script\VueScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$srp = $app->service(SRPService::class);
$vueScript = $app->service(VueScript::class);
$uniScript = $app->service(UnicornScript::class);

$vueScript->vue();
$asset->js('js/admin/login/login.js');

$uniScript->addRoute('@auth_ajax');
$uniScript->data('login.props', [
    'mfaEnabled' => (bool) env('MFA_ENABLED')
]);
?>

@extends('global.html')

@section('superbody')
    <form id="login-form" class="l-login" action="{{ $nav->to('login') }}" method="POST"
        enctype="multipart/form-data"
        {!! $srp->loginDirective() !!}
    >
        <div>
            <div class="container-fluid p-0">
                <div class="row g-0">

                    <div class="col-xl-9">
                        <div class="auth-full-bg pt-lg-5 p-4"
                            style="background-image: url(assets/images/admin/taipei-bg.jpg); background-size: cover">
                            <div class="w-100">
                                <div class="bg-overlay"
                                    style="background: rgba(76, 132, 255, .85)"
                                ></div>
                                <div class="d-flex h-100 flex-column">

                                    <div class="p-4 my-auto">
                                        <div class="row">
                                            <div class="col-lg-7">
                                                <div class="">

                                                    <h4 class="mb-3 display-3 text-white"
                                                        style="font-weight: 900; font-family: system-ui;">
                                                        UR HOUSE
                                                    </h4>

                                                    <p class="text-white fs-3">
                                                        給客戶一個最好的家

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end col -->

                    <div class="col-xl-3">
                        <div class="auth-full-page-content d-flex align-items-center p-md-5 p-4">
                            <div class="w-100">

                                <div class="mx-4 mb-4 text-center">
                                    <img src="{{ $asset->path('images/global/logo-en.svg') }}" alt="LOGO">

                                    <p class="text-muted my-3">登入管理員帳號</p>
                                </div>

                                <!-- Form -->
                                <login-app>

                                </login-app>

                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
        </div>
    </form>
@stop
