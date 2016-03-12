{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Admin\AdminPackage                 Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Registry\Registry               Uri information, example: $uri['media.path']
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Core\Widget\BladeWidget
 * @var $filterForm    \Windwalker\Form\Form
 * @var $batchForm     \Windwalker\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Registry\Registry
 * @var $items         \Windwalker\Data\DataSet
 * @var $item          \Windwalker\Data\Data
 * @var $i             integer
 * @var $pagination    \Windwalker\Core\Pagination\Pagination
 */
?>

@extends($lunaExtends)

@section('toolbar')
    @include('toolbar')
@stop

@section('admin-body')
<div id="phoenix-admin" class="comments-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->html('comments', array('type' => $type)) }}" method="POST" enctype="multipart/form-data">

        {{-- FILTER BAR --}}
        <div class="filter-bar">
            {!! $filterBar->render(array('form' => $filterForm, 'show' => $showFilterBar)) !!}
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
                    <th>
                        {!! $grid->checkboxesToggle(array('duration' => 150)) !!}
                    </th>

                    {{-- STATE --}}
                    <th style="min-width: 90px;">
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.state', 'comment.state') !!}
                    </th>

                    {{-- EDIT --}}
                    <th>
                        @translate($lunaPrefix . 'comment.button.edit')
                    </th>

                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.target.title', 'comment.target_id') !!}
                    </th>

                    {{-- TITLE --}}
                    {{--<th>--}}
                        {{--{!! $grid->sortTitle($lunaPrefix . 'comment.field.title', 'comment.title') !!}--}}
                    {{--</th>--}}

                    {{-- CONTENT --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.author', 'comment.created_by') !!}
                        /
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.content', 'comment.content') !!}
                    </th>

                    {{-- REPLY --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.replyer', 'comment.reply_user_id') !!}
                        /
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.reply', 'comment.reply') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.ordering', 'comment.type, comment.target_id, comment.ordering') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    {{-- CREATED --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.created', 'comment.created') !!}
                    </th>

                    {{-- LANGUAGE --}}
                    {{--<th>--}}
                        {{--{!! $grid->sortTitle($lunaPrefix . 'comment.field.language', 'comment.language') !!}--}}
                    {{--</th>--}}

                    {{-- ID --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'comment.field.id', 'comment.id') !!}
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
                            <a class="btn btn-default btn-xs" href="{{ $router->html('comment', array('id' => $item->id, 'type' => $type)) }}">
                                <span class="glyphicon glyphicon-edit fa fa-pencil"></span>
                            </a>
                        </td>

                        <td>
                            {{ $item->target_title }}
                        </td>

                        {{-- TITLE --}}
                        {{--<td>--}}
                            {{--<a href="{{ $router->html('comment', array('id' => $item->id)) }}">--}}
                                {{--{{ $item->title }}--}}
                            {{--</a>--}}
                        {{--</td>--}}

                        <td>
                            <strong>
                                {{ $item->user_name }} :
                            </strong>
                            <br />
                            {!! \Windwalker\String\Utf8String::substr(e($item->content), 0, 150) !!}...
                        </td>

                        <td>
                            @if ($item->reply)
                                <strong>
                                    {{ $item->replyer_name }} :
                                </strong>
                                <br />
                                {!! \Windwalker\String\Utf8String::substr(e($item->reply), 0, 150) !!}...
                            @endif
                        </td>

                        {{-- ORDERING --}}
                        <td>
                            {!! $grid->orderButton() !!}
                        </td>

                        {{-- CREATED --}}
                        <td>
                            {{ Windwalker\Core\DateTime\DateTime::toLocalTime($item->created) }}
                        </td>

                        {{-- LANGUAGE --}}
                        {{--<td>--}}
                            {{--{{ $item->language }}--}}
                        {{--</td>--}}

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
                        {!! $pagination->render($package->getName() . '@@comments', array('type' => $type), 'windwalker.pagination.phoenix') !!}
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>

        <div class="hidden-inputs">
            {{-- METHOD --}}
            <input type="hidden" name="_method" value="PUT" />

            {{-- TOKEN --}}
            {!! \Windwalker\Core\Security\CsrfProtection::input() !!}
        </div>

        @include('batch')
    </form>
</div>
@stop
