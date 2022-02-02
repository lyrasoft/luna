<?php

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

declare(strict_types=1);

use Lyrasoft\Luna\Entity\User;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var Form $form
 * @var User $item
 */
?>

@extends($app->config('luna.view_extends.front.base') ?? 'global.body')

@section('content')
    <div class="container l-profile-edit" style="margin-top: 70px">
        <form name="profile-form" id="profile-form"
            novalidate
            uni-form-validate='{"scroll": true}'
            action="{{ $nav->to('profile_edit') }}"
            method="POST"
            enctype="multipart/form-data">

            <div class="row justify-content-center">
                <div class="col-sm-8 col-md-6">
                    <x-fieldset :form="$form" name="basic"
                        :title="$lang('unicorn.fieldset.basic')"
                        class="mb-4"
                    >
                    </x-fieldset>

                    <x-fieldset :form="$form" class="mb-4"
                        name="password"
                        :title="$lang('luna.change.password')"
                    >
                    </x-fieldset>

                    <div class="my-4">
                        <button class="btn btn-primary w-100">
                            @lang('luna.profile.edit.button.save')
                        </button>
                    </div>
                </div>
            </div>

            <div class="d-none">
                @if ($idField = $form?->getField('id'))
                    <input name="{{ $idField->getInputName() }}" type="hidden" value="{{ $idField->getValue() }}" />
                @endif

                @csrf
            </div>
        </form>
    </div>
@stop
