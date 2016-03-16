{{-- Part of Front project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                   Package object.
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
    <div class="container category-item">
        <h1>Category</h1>
        <p>Hello World.</p>
        <div class="articles-items">
            @foreach ($items as $i => $item)
                <div class="article-item">
                    <h2>
                        <a href="{{ $router->html('article', array('id' => $item->id, 'alias' => $item->alias)) }}">
                            {{ $item->title }}
                        </a>
                    </h2>

                    <span class="text-muted">
                        {{ $item->created }}
                    </span>

                    <div class="article-content">
                        {!! $item->introtext !!}
                    </div>

                    <hr />

                    @foreach ($item->tags as $tagItem)
                        <a class="label label-info" href="{{ $router->html('article_tag', array('tag' => $tagItem->alias)) }}">
                            {{ $tagItem->title }}
                        </a>
                        &nbsp;
                    @endforeach

                </div>
            @endforeach
        </div>
        <hr />
        <div class="pagination">
            @if ($category->notNull())
                {!! $pagination->render($package->name . '@article_category', array('path' => $category->path)) !!}
            @elseif ($tag->notNull())
                {!! $pagination->render($package->name . '@article_tag', array('tag' => $tag->alias)) !!}
            @else
                {{-- Home route --}}
            @endif
        </div>
    </div>
@stop
