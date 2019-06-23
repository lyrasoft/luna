{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Menu\MenuHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\MenuRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 * @var $viewInstance     \Lyrasoft\Luna\Menu\AbstractMenuView
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    <script>
        $(function () {
            var currentType = '{{ $type }}';
            var typeField = $('#input-item-type');

            typeField.on('change', function (e) {
                if (typeField.val() !== currentType) {
                    Phoenix.validation('#admin-form').options.enabled = false;
                    Phoenix.post(null, { task: 'switch_type' });
                }
            });

            var currentView = '{{ $viewInstance ? $viewInstance::getName() : '' }}';
            var viewField = $('#input-item-view');

            viewField.on('change', function (e) {
                if (viewField.val() !== currentView) {
                    Phoenix.validation('#admin-form').options.enabled = false;
                    Phoenix.post(null, { task: 'switch_view' });
                }
            });
        });
    </script>
@endpush

@section('admin-body')
    <form name="admin-form" id="admin-form" action="{{ $router->route('menu', ['id' => $item->id]) }}" method="POST"
        enctype="multipart/form-data">

        @include('luna.form.title-bar')

        <div class="row">
            <div class="col-md-7">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a href="#basic" class="nav-link active" data-toggle="tab">
                            @lang($luna->langPrefix . 'menu.edit.fieldset.basic')
                        </a>
                    </li>

                    @if (isset($tabs))
                        @foreach ($tabs as $name => $tab)
                            <li class="nav-item">
                                <a href="#tab-{{ $name }}" class="nav-link" data-toggle="tab">
                                    {{ $tab['title'] }}
                                </a>
                            </li>
                        @endforeach
                    @endif
                </ul>

                <div class="tab-content mt-3" id="field-tabs">
                    <div class="tab-pane fade show active" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                        <div id="fieldset-basic" class="fieldset-card form-horizontal card mb-4">
                            <h5 class="card-header">@lang($luna->langPrefix . 'menu.edit.fieldset.basic')</h5>
                            <div class="card-body">
                                {!! $form->renderFields('basic') !!}
                            </div>
                            @if (isset($viewInstance))
                                <hr />
                                <div class="card-body">
                                    <h4 class="card-title">
                                        @lang($luna->langPrefix . 'menu.type.desc.title')
                                    </h4>
                                    {!! html_escape($viewInstance::getDescription()) !!}
                                </div>
                            @endif
                        </div>

                        @if (isset($viewInstance))
                            <div id="fieldset-variables" class="fieldset-card form-horizontal card mb-4">
                                <h5 class="card-header">
                                    @lang($luna->langPrefix . 'menu.edit.fieldset.variables')
                                </h5>
                                <div class="card-body">
                                    {!! $form->renderFields(null, 'variables') !!}
                                </div>
                            </div>
                        @endif
                    </div>

                    @if (isset($tabs))
                        @foreach ($tabs as $name => $tab)
                            <div class="tab-pane fade" id="tab-{{ $name }}"
                                role="tabpanel" aria-labelledby="{{ $name }}-tab">
                                <div class="card-body">
                                    {!! $form->renderFields($name, 'params') !!}
                                </div>
                            </div>
                        @endforeach
                    @endif
                </div>
            </div>
            <div class="col-md-5">
                <div id="fieldset-created" class="fieldset-card form-horizontal card mb-4">
                    <h5 class="card-header">@lang($luna->langPrefix . 'menu.edit.fieldset.created')</h5>
                    <div class="card-body">
                    {!! $form->renderFields('created') !!}
                    </div>
                </div>
            </div>
        </div>

        <div class="hidden-inputs">
            @formToken
        </div>

    </form>
@stop
