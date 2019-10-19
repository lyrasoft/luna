<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view          \Windwalker\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * @var $message       \Windwalker\Core\Mailer\MailMessage
 * @var $receiver      \Lyrasoft\Warder\Data\UserData
 * @var $data          \Windwalker\Data\Data
 */

?>

@extends('mail.mail-layout')

@section('content')
<p>Hi: {{ $receiver['name'] }}</p>

<p>
    You receive a new message.
</p>

<h3>Message Information</h3>

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
        Go to admin to see this message
    </a>
</p>
@stop
