<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        MetaRuleEditView  The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Entity\MetaRule;
use Lyrasoft\Luna\Module\Admin\MetaRule\MetaRuleEditView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Form\Form;

/**
 * @var $form Form
 * @var $item MetaRule
 */
?>

@push('macro')
<style data-macro type="text/scss" data-scope=".view-meta-rule-edit">
</style>

<script data-macro="admin.meta.rule.edit" lang="ts" type="module">
</script>
@endpush

@extends('admin.global.body-edit')

@section('toolbar-buttons')
    @include('edit-toolbar')
@stop

@section('content')
    <form name="admin-form" id="admin-form"
        uni-form-validate='{"scroll": true}'
        action="{{ $nav->to('meta_rule_edit') }}"
        method="POST" enctype="multipart/form-data">

        <x-title-bar :form="$form" ns="item"></x-title-bar>

        <div class="row">
            <div class="col-lg-7">
                <x-fieldset name="basic" :title="$lang('unicorn.fieldset.basic')"
                    :form="$form"
                    class="mb-4"
                    is="card"
                >
                </x-fieldset>

                <x-fieldset name="meta" :title="$lang('luna.meta.rule.fieldset.meta')"
                    :form="$form"
                    class="mb-4"
                    is="card"
                >
                </x-fieldset>

                <x-fieldset name="custom_code" :title="$lang('luna.meta.rule.fieldset.custom.code')"
                    :form="$form"
                    class="mb-4"
                    is="card"
                >
                    <div class="alert alert-warning">
                        @lang('luna.meta.rule.custom.code.warning')
                    </div>
                </x-fieldset>
            </div>
            <div class="col-lg-5">
                <x-fieldset name="publishing" :title="$lang('luna.meta.rule.fieldset.publishing')"
                    :form="$form"
                    class="mb-4"
                    is="card"
                >
                </x-fieldset>

                <x-fieldset name="json_ld" :title="$lang('luna.meta.rule.fieldset.json.ld')"
                    :form="$form"
                    class="mb-4"
                    is="card"
                >
                </x-fieldset>

                @if ($item?->id)
                    <x-fieldset name="info" :title="$lang('luna.meta.rule.fieldset.info')"
                        :form="$form"
                        class="mb-4"
                        is="card"
                    >
                    </x-fieldset>
                @endif
            </div>
        </div>

        <div class="d-none">
            @if ($idField = $form?->getField('item/id') ?? $form?->getField('id'))
                <input name="{{ $idField->getInputName() }}" type="hidden" value="{{ $idField->getValue() }}" />
            @endif

            <x-csrf></x-csrf>
        </div>
    </form>
@stop
