{{-- Part of earth project. --}}
<?php
/**
 * @var $item \Lyrasoft\Luna\Admin\Record\ContactRecord
 */
?>

<div class="btn-group">
    <button
        class="btn btn-{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateColor($item->state) }} btn-sm dropdown-toggle"
        type="button" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        <span class="{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateIcon($item->state) }}"></span>

        {{ \Lyrasoft\Luna\Contact\ContactHelper::translateState($item->state) }}
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
        @foreach([0, 1, 2, -1] as $k)
            <li>
                <a class="" href="javascript:void(0);"
                   onclick="Phoenix.Grid.doTask('{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateSymbol($k) }}', {{ $i }});">
                    <span
                        class="{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateIcon($k) }} text-{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateColor($k) }}"></span>
                    {{ \Lyrasoft\Luna\Contact\ContactHelper::translateState($k) }}
                </a>
            </li>
        @endforeach
        <li>
            <a class="" href="javascript:void(0);" onclick="Phoenix.Grid.deleteRow({{ $i }});"
               title="@translate('phoenix.toolbar.delete')">
                <span class="glyphicon glyphicon-trash fa fa-fw fa-trash"></span>
                @translate('phoenix.toolbar.delete')
            </a>
        </li>
    </ul>
</div>
