{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                  Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\Traits\ArticleDataTrait
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */

\Lyrasoft\Luna\Script\LunaScript::vueDragUploader();
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    <script>
        {{--new Vue({--}}
            {{--name: 'image',--}}
            {{--el: '#product-images',--}}
            {{--data: {--}}
                {{--images: [],--}}
                {{--uploadUrl: '{!! $router->route('_luna_img_upload', ['crop' => 1, 'size' => '300x300']) !!}',--}}
            {{--},--}}
            {{--mounted() {--}}
                {{--this.addFancybox();--}}
            {{--},--}}
            {{--updated() {--}}

            {{--},--}}
            {{--methods: {--}}
                {{--addFancybox() {--}}
                    {{--$(this.$el).find('.preview-img').attr('data-fancybox', 'product-images');--}}
                {{--}--}}
            {{--},--}}
            {{--watch: {--}}
                {{--images() {--}}
                    {{--this.$nextTick(() => {--}}
                        {{--this.addFancybox();--}}
                    {{--});--}}
                {{--}--}}
            {{--}--}}
        {{--});--}}
    </script>
@endpush

@section('admin-body')
    <form name="admin-form" id="admin-form" action="{{ $router->route('article', ['id' => $item->id]) }}" method="POST"
          enctype="multipart/form-data">

        @include('luna.form.title-bar')

        {{--<div id="product-images">--}}
            {{--<vue-drag-uploader--}}
                {{--:images="images"--}}
                {{--:url="uploadUrl"--}}
                {{--:max-files="6"--}}
                {{--@change="images = $event"--}}
            {{-->--}}
                {{--<template slot="extra" slot-scope="{ item, i }">--}}
                    {{--<div class="d-none">--}}
                        {{--<input type="hidden" :name="`item[images][${i}]`" :value="item.url" />--}}
                    {{--</div>--}}
                {{--</template>--}}
            {{--</vue-drag-uploader>--}}
        {{--</div>--}}

        <div class="row">
            <div class="col-md-8">
                <fieldset class="form-horizontal">
                    <legend>@translate($luna->langPrefix . 'article.edit.fieldset.basic')</legend>

                    {!! $form->renderFields('basic') !!}
                </fieldset>

                {{--<fieldset class="form-horizontal">--}}
                {{--<legend>@translate($luna->langPrefix . 'article.edit.fieldset.text')</legend>--}}

                {{--{!! $form->getField('text')->renderInput() !!}--}}
                {{--</fieldset>--}}
            </div>
            <div class="col-md-4">
                <fieldset class="form-horizontal">
                    <legend>@translate($luna->langPrefix . 'article.edit.fieldset.created')</legend>

                    {!! $form->renderFields('created') !!}
                </fieldset>
            </div>
        </div>

        <div class="row" style="margin-top: 40px">
            <div class="col-md-12">
                <fieldset class="form-horizontal">
                    {!! $form->getField('text')->renderInput() !!}
                </fieldset>
            </div>
        </div>

        <div class="hidden-inputs">
            @formToken
        </div>

    </form>
@stop
