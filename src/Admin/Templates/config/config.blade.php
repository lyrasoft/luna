{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Config\ConfigHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\ConfigRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */
?>

@extends($luna->editExtends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('admin-body')
    <form name="admin-form" id="admin-form" 
        action="{{ $router->route('config', ['type' => $type, 'subtype' => $subtype]) }}" method="POST"
        enctype="multipart/form-data">

        @include('types.' . $type)

        <div class="hidden-inputs">
            @formToken()
        </div>

    </form>
@stop
