{{-- Part of earth project. --}}

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

<p>
    Please go to admin to manage this message:
    <a href="{{ $router->to('admin@contacts')->full() . '#contact-' . $data->id }}">
        {{ $router->to('admin@contacts')->full() . '#contact-' . $data->id }}
    </a>
</p>
