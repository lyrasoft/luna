{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view     \Windwalker\Legacy\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Legacy\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Legacy\Core\DateTime\Chronos           PHP DateTime object of current time.
 * @var $helper   \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\PageRecord
 * @var $state    \Windwalker\Legacy\Structure\Structure
 * @var $builder  \Lyrasoft\Luna\PageBuilder\PageBuilder
 */

$builder = $app->make(\Lyrasoft\Luna\PageBuilder\PageBuilder::class);
?>

@extends($item->extends)

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
