{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Core\Widget\Widget
 * @var $filterForm    \Windwalker\Form\Form
 * @var $form     \Windwalker\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Structure\Structure
 * @var $items         \Windwalker\Data\DataSet
 * @var $item          \Windwalker\Data\Data
 * @var $i             integer
 * @var $pagination    \Windwalker\Core\Pagination\Pagination
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
<div id="phoenix-admin" class="comments-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->route('comments', array('type' => $type)) }}" method="POST" enctype="multipart/form-data">

        {{-- FILTER BAR --}}
        <div class="filter-bar">
            {!! $filterBar->render(array('form' => $form, 'show' => $showFilterBar)) !!}
        </div>

        {{-- RESPONSIVE TABLE DESC --}}
        <p class="visible-xs-block">
            @translate('phoenix.grid.responsive.table.desc')
        </p>

        <div class="grid-table table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    {{-- CHECKBOX --}}
                    <th width="1%" class="text-nowrap">
                        {!! $grid->checkboxesToggle(array('duration' => 150)) !!}
                    </th>

                    {{-- STATE --}}
                    <th style="min-width: 70px;" width="4%" class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.state', 'comment.state') !!}
                    </th>

                    {{-- EDIT --}}
                    <th class="text-nowrap">
                        @translate($luna->langPrefix . 'comment.button.edit')
                    </th>

                    <th width="20%" class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.target.title', 'comment.target_id') !!}
                        /
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.created', 'comment.created') !!}
                    </th>

                    {{-- CONTENT --}}
                    <th class="text-nowrap">
                        @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.author', 'comment.created_by') !!}
                        /
                        @endif
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.content', 'comment.content') !!}
                    </th>

                    {{-- REPLY --}}
                    <th class="text-nowrap">
                        @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.replyer', 'comment.reply_user_id') !!}
                        /
                        @endif
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.reply', 'comment.reply') !!}
                    </th>

                    <th class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'comment.field.id', 'comment.id') !!}
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach ($items as $i => $item)
                    <?php
                    $grid->setItem($item, $i);
                    ?>
                    <tr data-order-group="{{ $item->type }}-{{ $item->target_id }}">
                        {{-- CHECKBOX --}}
                        <td>
                            {!! $grid->checkbox() !!}
                        </td>

                        {{-- STATE --}}
                        <td>
                            <span class="btn-group">
                                {!! $grid->published($item->state) !!}
                                <button type="button" class="btn btn-default btn-xs hasTooltip" onclick="Phoenix.Grid.deleteRow({{ $i }});"
                                    title="@translate('phoenix.toolbar.delete')">
                                    <span class="glyphicon glyphicon-trash fa fa-trash"></span>
                                </button>
                            </span>
                        </td>

                        {{-- EDIT --}}
                        <td>
                            <a class="btn btn-default btn-xs" href="{{ $router->route('comment', array('id' => $item->id, 'type' => $type)) }}">
                                <span class="glyphicon glyphicon-edit fa fa-pencil"></span>
                            </a>
                        </td>

                        <td class="hasHighlight">
                            <p>
                                {{ $item->target_title }}
                            </p>
                            <small class="text-muted">
                                {{ Windwalker\Core\DateTime\Chronos::toLocalTime($item->created) }}
                            </small>
                        </td>

                        <td class="hasHighlight">
                            @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                            <strong>
                                {{ $item->user_name }} :
                            </strong>
                            <br />
                            @endif
                            {!! \Windwalker\String\Utf8String::substr(e($item->content), 0, 150) !!}...
                        </td>

                        <td class="hasHighlight">
                            @if ($item->reply)
                                @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                                <strong>
                                    {{ $item->replyer_name }} :
                                </strong>
                                <br />
                                @endif
                                {!! \Windwalker\String\Utf8String::substr(e($item->reply), 0, 150) !!}...
                            @endif
                        </td>

                        {{-- ID --}}
                        <td>
                            {{ $item->id }}
                        </td>
                    </tr>
                @endforeach
                </tbody>

                <tfoot>
                <tr>
                    {{-- PAGINATION --}}
                    <td colspan="25">
                        {!! $pagination->route($view->name, [])->render() !!}
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>

        <div class="hidden-inputs">
            {{-- METHOD --}}
            <input type="hidden" name="_method" value="PUT" />

            {{-- TOKEN --}}
            @formToken()
        </div>

        @include('batch')
    </form>
</div>
@stop
