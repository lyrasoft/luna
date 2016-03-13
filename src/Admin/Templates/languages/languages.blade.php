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
<div id="phoenix-admin" class="languages-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->html('languages') }}" method="POST" enctype="multipart/form-data">

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
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.state', 'language.state') !!}
                    </th>

                    {{-- FLAG --}}
                    <th width="1%">
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.image', 'language.image') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.title', 'language.title') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.titlenative', 'language.title_native') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.ordering', 'language.ordering') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    {{-- CODE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.code', 'language.code') !!}
                    </th>

                    {{-- URL --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.alias', 'language.alias') !!}
                    </th>

                    {{-- DELETE --}}
                    <th>
                        @translate('phoenix.toolbar.delete')
                    </th>

                    {{-- ID --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'language.field.id', 'language.id') !!}
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
                        <td class="text-center">
                            <span class="btn-group">
                                {!! $grid->published($item->state) !!}
                            </span>
                        </td>

                        {{-- FLAG --}}
                        <td class="text-center">
                            @if ($item->image)
                                <span class="{{ \Lyrasoft\Luna\Language\LanguageHelper::getFlagIconClass($item->image) }}"></span>
                            @endif
                        </td>

                        {{-- TITLE --}}
                        <td class="hasHighlight">
                            <a href="{{ $router->html('language', array('id' => $item->id)) }}">
                                {{ $item->title }}
                            </a>
                        </td>

                        {{-- TITLE NATIVE --}}
                        <td class="hasHighlight">
                            {{ $item->title_native }}
                        </td>

                        {{-- ORDERING --}}
                        <td>
                            {!! $grid->orderButton() !!}
                        </td>

                        {{-- CODE --}}
                        <td class="hasHighlight">
                            {{ $item->code }}
                        </td>

                        {{-- URL --}}
                        <td class="hasHighlight">
                            {{ $item->alias }}
                        </td>

                        <td class="text-center">
                            <button type="button" class="btn btn-default btn-xs hasTooltip" onclick="Phoenix.Grid.deleteRow({{ $i }});"
                                title="@translate('phoenix.toolbar.delete')">
                                <span class="glyphicon glyphicon-trash fa fa-trash"></span>
                            </button>
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
                        {!! $pagination->render($package->getName() . '@languages', 'windwalker.pagination.phoenix') !!}
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
