{{-- Part of Front project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item  \Windwalker\Data\Data
 * @var $state \Windwalker\Structure\Structure
 * @var $exception  \Exception
 */
?>

@extends('_global.html')

@section('content')
<style>
    #error-code-title {
        font-size: 200px;
    }
</style>
<div class="container error-item">
    <div id="error-code" class="text-center">
        <h1 id="error-code-title">{{ $code }}</h1>
    </div>

    <div id="error-message" class="text-center">
        <h2 id="error-message-title">
            {{ $msg }}
        </h2>
    </div>
</div>
@stop
