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

@extends($luna->editExtends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    @if (!$item->id)
        <script>
            $('#options-modal').modal('show');
        </script>
    @endif
@endpush

@section('admin-body')
    <form name="admin-form" id="admin-form" action="{{ $router->route('page', ['id' => $item->id]) }}" method="POST"
        enctype="multipart/form-data">

        <page-builder-app class=""></page-builder-app>

        @include('modal-options')

        <div class="hidden-inputs">
            @formToken
        </div>
    </form>

    {{-- Components --}}
    @include('component.row')
    @include('component.column')
    @include('component.addon')
@stop
