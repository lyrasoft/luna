{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package       \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view          \Windwalker\Legacy\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Legacy\Uri\UriData               Uri information, example: $uri->path
 * @var $chronos       \Windwalker\Legacy\Core\DateTime\Chronos           PHP DateTime object of current time.
 * @var $helper        \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $state         \Windwalker\Legacy\Structure\Structure
 * @var $items         \Windwalker\Legacy\Data\DataSet
 * @var $item          \Lyrasoft\Luna\Record\PageRecord
 * @var $pagination    \Windwalker\Legacy\Core\Pagination\Pagination
 */
?>

@extends('_global.html')

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('content')
    <div class="container page-list">
        <h1>Page List</h1>
        <div class="pages-items">
            @foreach ($items as $i => $item)
                <div class="page-item">
                    <p>
                        <span class="fa fa-angle-right text-muted"></span>
                        <a href="{{ $router->route('page', ['id' => $item->id]) }}">
                            {{ $item->title }}
                        </a>
                    </p>
                </div>
            @endforeach
        </div>
        <hr />
        <div class="pagination">
            {!! $pagination->route('pages', [])->render() !!}
        </div>
    </div>
@stop
