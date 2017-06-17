{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime \DateTime                                   PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
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
 * @var $ordering      array
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
<div id="phoenix-admin" class="categories-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->route('categories', array('type' => $type)) }}" method="POST" enctype="multipart/form-data">

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
                        {!! $grid->sortTitle($luna->langPrefix . 'category.field.state', 'category.state') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($luna->langPrefix . 'category.field.title', 'category.title') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'category.field.ordering', 'category.lft') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                        {{-- AUTHOR --}}
                        <th width="15%">
                            {!! $grid->sortTitle($luna->langPrefix . 'category.field.author', 'category.created_by') !!}
                        </th>
                    @endif

                    {{-- CREATED --}}
                    <th width="8%">
                        {!! $grid->sortTitle($luna->langPrefix . 'category.field.created', 'category.created') !!}
                    </th>

                    @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                        {{-- LANGUAGE --}}
                        <th width="15%">
                            {!! $grid->sortTitle($luna->langPrefix . 'category.field.language', 'category.language') !!}
                        </th>
                    @endif

                    {{-- ID --}}
                    <th width="3%">
                        {!! $grid->sortTitle($luna->langPrefix . 'category.field.id', 'category.id') !!}
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach ($items as $i => $item)
                    <?php
                    $item->ordering = $ordering ? array_search($item->id, $ordering[$item->parent_id]) + 1 : '-';

                    $grid->setItem($item, $i);
                    ?>
                    <tr data-order-group="{{ $item->parent_id }}">
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
                            {{ str_repeat('—', $item->level - 1) }}
                            <a href="{{ $router->route('category', array('id' => $item->id, 'type' => $type)) }}">
                                {{ $item->title }}
                            </a>
                        </td>

                        {{-- ORDERING --}}
                        <td class="text-center">
                            {!! $grid->orderButton() !!}
                        </td>

                        @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                            {{-- AUTHOR --}}
                            <td>
                                {{ $item->user_name }}
                            </td>
                        @endif

                        {{-- CREATED --}}
                        <td>
                            {{ Windwalker\Core\DateTime\Chronos::toLocalTime($item->created, 'Y-m-d') }}
                        </td>

                        @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                            {{-- LANGUAGE --}}
                            <td>
                                @if ($item->language === '*')
                                    <span class="glyphicon glyphicon-globe fa fa-globe"></span>
                                    @translate($luna->langPrefix . 'language.field.all')
                                @else
                                    <span class="hasTooltip" title="{{ $item->lang_code }}">
                                        <span class="{{ \Lyrasoft\Luna\Language\Locale::getFlagIconClass($item->lang_image) }}"></span>
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
                        {!! $pagination->route($view->name, ['type' => $type])->render() !!}
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
