<?php

declare(strict_types=1);

namespace App\View;

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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

/**
 * @var \Lyrasoft\Luna\Entity\Article $item
 * @var \Lyrasoft\Luna\Entity\Category $category
 */
?>

@extends($app->config('luna.view_extends.front.base') ?? 'global.body')

@section('content')
    <div class="container l-article-item" style="margin-top: 50px">
        <article>
            <header>
                <h1 class="h3">
                    {{ $item->title }}
                </h1>
            </header>

            <div class="text-muted my-4">
                <div>
                    <i class="fa fa-calendar-days"></i>
                    {{ $chronos->toLocalFormat($item->created, 'Y/m/d H:i:s') }}
                </div>
            </div>

            <div class="article-content">
                {!! $item->introtext !!}
                {!! $item->fulltext !!}
            </div>
        </article>
    </div>
@stop
