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

$app->service(\Lyrasoft\Luna\Script\LunaScript::class)->accountCheck();

?>

@extends($app->config('luna.view_extends.front.auth') ?? 'global.auth')

@section('content')
    <div class="l-registration">
        <form id="registration-form-extra" action="" method="post">

            @if ($vm->hasSocialProviders())
                <div class="d-flex flex-column">
                    @foreach ($vm->getSocialProviders() as $provider => $config)
                        <button class="btn btn-secondary mb-2"
                            type="button"
                            data-dos
                            onclick="form.action = '{{ $nav->to('social_auth')->var('provider', $provider) }}'; form.requestSubmit()">
                            <i class="fa-brands fa-{{ strtolower($provider) }}"></i>
                            {{ $provider }}
                        </button>
                    @endforeach

                    <div class="my-3 text-center">
                        OR
                    </div>
                </div>
            @endif

            <div class="d-none">
                <x-csrf></x-csrf>
            </div>
        </form>

        <form id="registration-form" class="" action="{{ $nav->to('registration') }}"
            uni-form-validate="@json(['scroll' => true])"
            method="POST"
            enctype="multipart/form-data">

            <x-fieldset :form="$form"></x-fieldset>

            <div class="l-registration-actions mt-4 mb-4">
                <button type="submit"
                    class="login-button btn btn-primary btn-block w-100" data-dos>
                    @lang('luna.button.register.submit')
                </button>
            </div>

            <div class="d-none">
                @csrf
            </div>
        </form>
    </div>
@stop
