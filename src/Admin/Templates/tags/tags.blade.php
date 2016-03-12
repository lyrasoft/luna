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
<div id="phoenix-admin" class="tags-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->html('tags') }}" method="POST" enctype="multipart/form-data">

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
                    <th width="1%">
                        {!! $grid->checkboxesToggle(array('duration' => 150)) !!}
                    </th>

                    {{-- STATE --}}
                    <th style="min-width: 90px;" width="10%">
                        {!! $grid->sortTitle($lunaPrefix . 'tag.field.state', 'tag.state') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'tag.field.title', 'tag.title') !!}
                    </th>

                    {{-- AUTHOR --}}
                    <th width="20%">
                        {!! $grid->sortTitle($lunaPrefix . 'tag.field.author', 'tag.created_by') !!}
                    </th>

                    {{-- CREATED --}}
                    <th width="10%">
                        {!! $grid->sortTitle($lunaPrefix . 'tag.field.created', 'tag.created') !!}
                    </th>

                    {{-- LANGUAGE --}}
                    {{--<th>--}}
                        {{--{!! $grid->sortTitle($lunaPrefix . 'tag.field.language', 'tag.language') !!}--}}
                    {{--</th>--}}

                    {{-- ID --}}
                    <th width="1%">
                        {!! $grid->sortTitle($lunaPrefix . 'tag.field.id', 'tag.id') !!}
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach ($items as $i => $item)
                    <?php
                    $grid->setItem($item, $i);
                    ?>
                    <tr>
                        {{-- CHECKBOX --}}
                        <td>
                            {!! $grid->checkbox() !!}
                        </td>

                        {{-- STATE --}}
                        <td>
                            <span class="btn-group">
                                {!! $grid->published($item->state) !!}
                                <button type="button" class="btn btn-default btn-xs hasTooltip" onclick="Phoenix.Grid.copyRow({{ $i }});"
                                    title="@translate('phoenix.toolbar.duplicate')">
                                    <span class="glyphicon glyphicon-duplicate fa fa-copy text-info"></span>
                                </button>
                                <button type="button" class="btn btn-default btn-xs hasTooltip" onclick="Phoenix.Grid.deleteRow({{ $i }});"
                                    title="@translate('phoenix.toolbar.delete')">
                                    <span class="glyphicon glyphicon-trash fa fa-trash"></span>
                                </button>
                            </span>
                        </td>

                        {{-- TITLE --}}
                        <td>
                            <a href="{{ $router->html('tag', array('id' => $item->id)) }}">
                                {{ $item->title }}
                            </a>

                            <small class="text-muted">
                                ( {{ $item->alias }} )
                            </small>

                        </td>

                        {{-- AUTHOR --}}
                        <td>
                            {{ $item->user_name }}
                        </td>

                        {{-- CREATED --}}
                        <td>
                            {{ Windwalker\Core\DateTime\DateTime::toLocalTime($item->created, 'Y-m-d') }}
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
                        {!! $pagination->render($package->getName() . '@tags', 'windwalker.pagination.phoenix') !!}
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
