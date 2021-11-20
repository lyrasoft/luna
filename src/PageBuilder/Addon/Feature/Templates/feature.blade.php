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

$text = $options['content'];

$text = \Windwalker\Filter\OutputFilter::stripScript($text);
$text = \Windwalker\Filter\OutputFilter::stripStyle($text);
?>

@extends('page.addon-wrapper')

@section('body')
    <div class="c-feature-icon text-center">
        @if ($options['link'] !== '' && in_array($options['link_element'], ['icon', 'both']))
            <a href="{{ $options['link'] }}">
        @endif

            @if ($options['layout_type'] === 'image')
                <img class="img-fluid" src="{{ $options['image'] }}" alt="{{ $options['title.text'] }}">
            @else
                <span class="c-feature-icon__wrapper">
                    <span class="{{ $options['icon.name'] }}"></span>
                </span>
            @endif

        @if ($options['link'] !== '' && in_array($options['link_element'], ['icon', 'both']))
            </a>
        @endif
    </div>

    @if ($options['title.text'] !== '')
        <div class="c-addon__header c-box-header">
            @if ($options['link'] !== '' && in_array($options['link_element'], ['title', 'both']))
                <a href="{{ $options['link'] }}">
            @endif

                <{{ $options['title.element'] ?: 'h3' }} class="c-addon__title c-box-header__title">
                    {{ $options['title.text'] }}
                </{{ $options['title.element'] ?: 'h3' }}>

            @if ($options['link'] !== '' && in_array($options['link_element'], ['title', 'both']))
                </a>
            @endif
        </div>
    @endif

    <div class="c-addon__content-text">
        {!! $text !!}
    </div>
@stop
