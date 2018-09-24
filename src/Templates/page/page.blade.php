{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\Chronos           PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\PageRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $builder  \Lyrasoft\Luna\PageBuilder\PageBuilder
 */

$builder = $package->getContainer()->get(\Lyrasoft\Luna\PageBuilder\PageBuilder::class);
?>

@extends('_global.html')

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('content')
    <div class="l-page-container">
        @if (is_array($rows))
            {!! $builder->renderPage($rows) !!}
        @endif
    </div>
@stop
