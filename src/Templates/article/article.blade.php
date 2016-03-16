{{-- Part of Front project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                  Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Registry\Registry               Uri information, example: $uri['media.path']
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item  \Windwalker\Data\Data
 * @var $state \Windwalker\Registry\Registry
 */
?>

@extends('_global.html')

@section('content')
<div class="container article-item">
    <p style="margin-top: 40px">
        <a class="btn btn-default" href="{{ $router->html('article_category', array('path' => $item->category->path)) }}">
            <span class="glyphicon glyphicon-chevron-left fa fa-chervon-left"></span>
            Back to List
        </a>
    </p>
    <p>
        <img src="{{ $item->image }}" alt="Image">
    </p>
    <hr />
    <h2>{{ $item->title }}</h2>
    <p>{{ $item->introtext }}</p>
    <p>{{ $item->fulltext }}</p>

    @if ($item->tags->notNull())
        <hr />

        @foreach ($item->tags as $tag)
            <a class="label label-info" href="{{ $router->html('article_tag', array('tag' => $tag->alias)) }}">
                {{ $tag->title }}
            </a>
            &nbsp;
        @endforeach

    @endif

</div>
@stop
