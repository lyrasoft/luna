{{-- Part of Front project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                  Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\ArticleRecord
 * @var $state    \Windwalker\Structure\Structure
 */
?>

@extends('_global.html')

@section('content')
    <style>
        .comment-user-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }
    </style>
    <div class="container article-item">
        <p style="margin-top: 40px">
            <a class="btn btn-default btn-outline-secondary"
               href="{{ $router->route('article_category', ['path' => $item->category->path]) }}">
                <span class="glyphicon glyphicon-chevron-left fa fas fa-chevron-left"></span>
                Back to List
            </a>
        </p>
        <p>
            <img src="{{ $item->image }}" alt="Image">
        </p>
        <hr/>
        <h2>{{ $item->title }}</h2>
        <p>{!! $item->introtext !!}</p>
        <p>{!! $item->fulltext !!}</p>

        @if ($item->tags->notNull())
            <hr/>

            @foreach ($item->tags as $tag)
                <a class="badge badge-info label label-info" href="{{ $router->route('article_tag', ['tag' => $tag->alias]) }}">
                    {{ $tag->title }}
                </a>
                &nbsp;
            @endforeach

        @endif

        @if ($item->comments !== null)
            <hr/>

            <div id="comments">
                <h4>
                    {{ count($item->comments) }} Comment(s)
                </h4>

                @foreach ($item->comments as $comment)
                    <div class="row">
                        <div class="col-xs-1 col-1 text-center">
                            <img class="comment-user-avatar" src="{{ $comment->user_avatar }}" alt="Avatar">
                        </div>
                        <div class="col-xs-11 col-11">
                            <div class="panel panel-default card mb-4">
                                <div class="panel-heading card-header">
                                    <div class="panel-title">
                                        {{ $comment->user_name }}
                                        <small class="pull-right float-right">{{ $comment->created }}</small>
                                    </div>
                                </div>
                                <div class="panel-body card-body">
                                    {!! nl2br($this->escape($comment->content)) !!}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif

    </div>
@stop
