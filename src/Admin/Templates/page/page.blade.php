{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Page\PageHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\PageRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */

\Phoenix\Script\CoreScript::underscore();
\Phoenix\Script\PhoenixScript::phoenix();
\Phoenix\Script\JQueryScript::colorPicker();
\Phoenix\Script\VueScript::core();
\Phoenix\Script\VueScript::animate();
\Phoenix\Script\VueScript::switcher();
\Lyrasoft\Luna\Script\LunaScript::vueDraggable();
\Lyrasoft\Luna\Script\LunaScript::vueSlider();

$asset->addJS($package->name . '/js/admin/page-builder/page-builder.min.js');
$asset->addCSS($package->name . '/css/admin/page-builder/page-builder.min.css');
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
@endpush

@section('admin-body')
    <form name="admin-form" id="admin-form" action="{{ $router->route('page', ['id' => $item->id]) }}" method="POST"
        enctype="multipart/form-data">

        <div id="page-builder" class="card bg-light border-0">
            <div class="card-body">
                <div class="page-builder__body body">

                    <draggable v-model="content" @start="drag = true" @end="drag = false"
                        :options="{handle: '.row-move-handle'}">
                        <row v-for="(row, i) of content" class="body__row page-row mb-4"
                            :key="row.id"
                            :value="row"
                            @columns-change="columnsChange(row, $event)"
                            @delete="deleteRow(i)">
                        </row>
                    </draggable>

                </div>

                <div class="page-builder__bottom-toolbar text-center">
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click="addNewRow()">
                        Add New Row
                    </button>
                </div>

                <div class="hidden-inputs">
                    @formToken
                </div>

                <textarea name="item[content]" id="input-item-content" style="display: none;">@{{ getSaveValue() }}</textarea>

                {{-- Inline Components --}}

                {{-- Modals --}}
                @include('component.row-edit')
                @include('component.column-edit')
                @include('component.addon-edit')
                @include('modal.addons')
            </div>
        </div>

        @include('modal-options')
    </form>

    {{-- Components --}}
    @include('component.row')
    @include('component.column')
    @include('component.addon')
@stop
