<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

/**
 * @var \Lyrasoft\Luna\Entity\Article $item
 */
?>

@extends($app->config('luna.view_extends.front.base') ?? 'global.body')

@section('content')
    <div class="container l-article-list" style="margin-top: 50px">
        @foreach ($items as $item)
            <div class="card mb-4">
                <div class="card-body row">
                    <div class="col-md-3">
                        <img class="img-fluid rounded" src="{{ $item->getImage() }}" alt="Image">
                    </div>

                    <div class="col-md-9">
                        <div class="mb-3">
                            <h4>
                                <a href="{{ $nav->to('article_item')->id($item->getId())->alias($item->getAlias()) }}">
                                    {{ $item->getTitle() }}
                                </a>
                            </h4>
                        </div>

                        <div>
                            {!! \Windwalker\str($item->getIntrotext())->stripHtmlTags()->truncate(200, '...') !!}
                        </div>
                    </div>
                </div>
            </div>
        @endforeach

        <div>
            {!! $pagination->render() !!}
        </div>
    </div>
@stop
