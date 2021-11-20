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

$btnClasses = [
    $options['style'],
    $options['size'],
    $options['block'] ? 'btn-block' : '',
];

?>

@extends('page.addon-wrapper')

@section('body')
    <a href="{{ $options['link'] }}" @attr('target', $options['link_target'])
        class="c-button btn {{ implode(' ', $btnClasses) }}">
        @if ($options['icon_position'] === 'left')
            <span class="c-button__icon {{ $options['icon'] }}"></span>
        @endif
        
        <span class="c-button__text">
            {{ $options['text'] }}
        </span>

        @if ($options['icon_position'] === 'right')
            <span class="c-button__icon {{ $options['icon'] }}"></span>
        @endif
    </a>
@stop
