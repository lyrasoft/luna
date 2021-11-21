<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $view      ViewModel       The view modal object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
?>

@extends('page.addon-wrapper')

@section('body')
    @if ($options->getDeep('title.text') !== '')
        <div class="c-addon__header c-box-header">
            <{{ $options->getDeep('title.element') ?: 'h3' }} class="c-addon__title c-box-header__title">
                {{ $options->getDeep('title.text') }}
            </{{ $options->getDeep('title.element') ?: 'h3' }}>
        </div>
    @endif

    @if ($options->getDeep('link') !== '')
        <a href="{{ $options->getDeep('link') }}" @attr('target', $options->getDeep('link_target'))>
    @endif

            <img class="img-fluid c-image" src="{{ $options->getDeep('image') }}"
                alt="{{ $options->getDeep('alt') ?: $options->getDeep('label') ?: $options->getDeep('title.text') ?: 'Image' }}"
            >

    @if ($options->getDeep('link') !== '')
        </a>
    @endif
@stop
