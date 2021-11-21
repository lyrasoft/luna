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

$text = $options->getDeep('content');

$text = \Windwalker\Filter\OutputFilter::stripScript($text);
$text = \Windwalker\Filter\OutputFilter::stripStyle($text);
?>

@extends('page.addon-wrapper')

@section('body')
    <div class="c-feature-icon text-center">
        @if ($options->getDeep('link') !== '' && in_array($options->getDeep('link_element'), ['icon', 'both']))
            <a href="{{ $options->getDeep('link') }}">
        @endif

            @if ($options->getDeep('layout_type') === 'image')
                <img class="img-fluid" src="{{ $options->getDeep('image') }}" alt="{{ $options->getDeep('title.text') }}">
            @else
                <span class="c-feature-icon__wrapper">
                    <span class="{{ $options->getDeep('icon.name') }}"></span>
                </span>
            @endif

        @if ($options->getDeep('link') !== '' && in_array($options->getDeep('link_element'), ['icon', 'both']))
            </a>
        @endif
    </div>

    @if ($options->getDeep('title.text') !== '')
        <div class="c-addon__header c-box-header">
            @if ($options->getDeep('link') !== '' && in_array($options->getDeep('link_element'), ['title', 'both']))
                <a href="{{ $options->getDeep('link') }}">
            @endif

                <{{ $options->getDeep('title.element') ?: 'h3' }} class="c-addon__title c-box-header__title">
                    {{ $options->getDeep('title.text') }}
                </{{ $options->getDeep('title.element') ?: 'h3' }}>

            @if ($options->getDeep('link') !== '' && in_array($options->getDeep('link_element'), ['title', 'both']))
                </a>
            @endif
        </div>
    @endif

    <div class="c-addon__content-text">
        {!! $text !!}
    </div>
@stop
