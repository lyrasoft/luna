<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        object          The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

@extends('mail.mail-layout')

@section('content')
<p>Hi: {{ $receiver['name'] }}</p>

<p>
    @lang('luna.contact.mail.intro')
</p>

<table border="0" class="table" style="width: 100%; border-collapse: collapse;">
    <tbody>
    @foreach (['id', 'subject', 'name', 'email', 'phone', 'url', 'created', 'content'] as $i => $key)

        @if (empty($data[$key]))
            @continue
        @endif

        @if ($key === 'content')
            @php( $data[$key] = nl2br(strip_tags($data[$key])) )
        @endif

        <tr>
            <th width="33%"
                style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd; {{ $i === 0 ? 'border-top: 1px solid #ddd;' : '' }}">
                @translate(\Lyrasoft\Luna\Helper\LunaHelper::getLangPrefix() . 'contact.field.' . $key)
            </th>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; {{ $i === 0 ? 'border-top: 1px solid #ddd;' : '' }}">
                {!! $data[$key] !!}
            </td>
        </tr>

    @endforeach
    </tbody>
</table>

<p style="margin-top: 30px">
    <a class="btn btn-primary btn-block"
        href="{{ $router->to('admin@contacts')->full() . '#contact-' . $data->id }}">
        @lang('luna.contact.mail.button.manage')
    </a>
</p>
@stop
