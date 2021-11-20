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
    @if ($options['title.text'] !== '')
        <div class="c-addon__header c-box-header">
            <{{ $options['title.element'] ?: 'h3' }} class="c-addon__title c-box-header__title">
                {{ $options['title.text'] }}
            </{{ $options['title.element'] ?: 'h3' }}>
        </div>
    @endif

    <div class="c-addon__content-text">
        {!! $text !!}
    </div>
@stop
