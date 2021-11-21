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
    $options->getDeep('style'),
    $options->getDeep('size'),
    $options->getDeep('block') ? 'btn-block' : '',
];

?>

@extends('page.addon-wrapper')

@section('body')
    <a href="{{ $options->getDeep('link') }}" @attr('target', $options->getDeep('link_target'))
        class="c-button btn {{ implode(' ', $btnClasses) }}">
        @if ($options->getDeep('icon_position') === 'left')
            <span class="c-button__icon {{ $options->getDeep('icon') }}"></span>
        @endif
        
        <span class="c-button__text">
            {{ $options->getDeep('text') }}
        </span>

        @if ($options->getDeep('icon_position') === 'right')
            <span class="c-button__icon {{ $options->getDeep('icon') }}"></span>
        @endif
    </a>
@stop
