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
 * @var $item  \Lyrasoft\Luna\Admin\Record\Traits\ArticleDataTrait
 * @var $state \Windwalker\Structure\Structure
 * @var $form  \Windwalker\Form\Form
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
<form name="admin-form" id="admin-form" action="{{ $router->route('article', ['id' => $item->id]) }}" method="POST" enctype="multipart/form-data">

    @include('luna.form.title-bar')

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
        @formToken()
    </div>

</form>
@stop
