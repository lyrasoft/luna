{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Windwalker\Core\Package\AbstractPackage    Package object.
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

@extends('_global.admin.admin')

@section('toolbar')
    @include('toolbar')
@stop

@section('admin-body')
    <style>
        .tooltip-inner {
            max-width: 600px;
        }
    </style>
<div id="phoenix-admin" class="modules-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->html('modules') }}" method="POST" enctype="multipart/form-data">

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
                    <th style="min-width: 90px;" width="7%">
                        {!! $grid->sortTitle($lunaPrefix . 'module.field.state', 'module.state') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'module.field.title', 'module.title') !!}
                    </th>

                    {{-- MODULE --}}
                    <th width="15%">
                        {!! $grid->sortTitle($lunaPrefix . 'module.field.module', 'module.class') !!}
                    </th>

                    {{-- POSITION --}}
                    <th width="10%">
                        {!! $grid->sortTitle($lunaPrefix . 'module.field.position', 'module.position') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($lunaPrefix . 'module.field.ordering', 'module.position, module.ordering') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    {{-- CREATED --}}
                    {{--<th>--}}
                        {{--{!! $grid->sortTitle($lunaPrefix . 'module.field.created', 'module.created') !!}--}}
                    {{--</th>--}}

                    @if (\Lyrasoft\Luna\Language\LanguageHelper::isEnabled())
                        {{-- LANGUAGE --}}
                        <th width="15%">
                            {!! $grid->sortTitle($lunaPrefix . 'module.field.language', 'module.language') !!}
                        </th>
                    @endif

                    {{-- ID --}}
                    <th width="5%">
                        {!! $grid->sortTitle($lunaPrefix . 'module.field.id', 'module.id') !!}
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach ($items as $i => $item)
                    <?php
                    $grid->setItem($item, $i);
                    ?>
                    <tr data-order-group="{{ $item->position }}">
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
                        <td class="hasHighlight">
                            <a href="{{ $router->html('module', array('id' => $item->id)) }}">
                                {{ $item->title }}
                            </a>
                        </td>

                        {{-- MODULE --}}
                        <td>
                            <span class="hasTooltip" title="{{ $item->class }}">
                                {{ $item->name }}
                            </span>
                        </td>

                        {{-- POSITION --}}
                        <td>
                            <span class="{{ $item->labelClass }}">
                                {{ $item->positionName }}
                            </span>
                        </td>

                        {{-- ORDERING --}}
                        <td class="text-center">
                            {!! $grid->orderButton() !!}
                        </td>

                        {{-- CREATED --}}
                        {{--<td>--}}
                            {{--{{ Windwalker\Core\DateTime\DateTime::toLocalTime($item->created) }}--}}
                        {{--</td>--}}

                        @if (\Lyrasoft\Luna\Language\LanguageHelper::isEnabled())
                            {{-- LANGUAGE --}}
                            <td>
                                @if ($item->language == '*')
                                    <span class="glyphicon glyphicon-globe fa fa-globe"></span>
                                    @translate($lunaPrefix . 'language.field.all')
                                @else
                                    <span class="hasTooltip" title="{{ $item->lang_code }}">
                                        <span class="{{ \Lyrasoft\Luna\Language\LanguageHelper::getFlagIconClass($item->lang_image) }}"></span>
                                        {{ $item->lang_title }}
                                    </span>
                                @endif
                            </td>
                        @endif

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
                        {!! $pagination->render($package->getName() . '@modules', 'windwalker.pagination.phoenix') !!}
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

        @include('create_modal')
    </form>
</div>
@stop
