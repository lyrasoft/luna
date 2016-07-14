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
<div id="phoenix-admin" class="languages-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->route('languages') }}" method="POST" enctype="multipart/form-data">

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
                    <th width="1%">
                        {!! $grid->checkboxesToggle(array('duration' => 150)) !!}
                    </th>

                    {{-- STATE --}}
                    <th style="min-width: 90px;" width="7%">
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.state', 'language.state') !!}
                    </th>

                    {{-- FLAG --}}
                    <th width="1%">
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.image', 'language.image') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.title', 'language.title') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.titlenative', 'language.title_native') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.ordering', 'language.ordering') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    {{-- CODE --}}
                    <th class="5%">
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.code', 'language.code') !!}
                    </th>

                    {{-- URL --}}
                    <th class="5%">
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.alias', 'language.alias') !!}
                    </th>

                    {{-- DELETE --}}
                    <th class="3%">
                        @translate('phoenix.toolbar.delete')
                    </th>

                    {{-- ID --}}
                    <th class="5%">
                        {!! $grid->sortTitle($luna->langPrefix . 'language.field.id', 'language.id') !!}
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
                                <span class="{{ \Lyrasoft\Luna\Language\Locale::getFlagIconClass($item->image) }}"></span>
                            @endif
                        </td>

                        {{-- TITLE --}}
                        <td class="hasHighlight">
                            <a href="{{ $router->route('language', array('id' => $item->id)) }}">
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
