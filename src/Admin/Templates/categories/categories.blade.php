{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package       \Windwalker\Legacy\Core\Package\AbstractPackage    Package object.
 * @var $view          \Windwalker\Legacy\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Legacy\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Legacy\Core\Widget\Widget
 * @var $filterForm    \Windwalker\Legacy\Form\Form
 * @var $form          \Windwalker\Legacy\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Legacy\Structure\Structure
 * @var $items         \Windwalker\Legacy\Data\DataSet
 * @var $item          \Windwalker\Legacy\Data\Data
 * @var $i             integer
 * @var $pagination    \Windwalker\Legacy\Core\Pagination\Pagination
 * @var $ordering      array
 */

$originOrdering = [];
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
    <div id="phoenix-admin" class="categories-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $router->route('categories', ['type' => $type]) }}"
              method="POST" enctype="multipart/form-data">

            {{-- FILTER BAR --}}
            <div class="filter-bar">
                {!! $filterBar->render(['form' => $form, 'show' => $showFilterBar]) !!}
            </div>

            {{-- RESPONSIVE TABLE DESC --}}
            <p class="visible-xs-block d-sm-block d-md-none">
                @translate('phoenix.grid.responsive.table.desc')
            </p>

            <div class="grid-table table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        {{-- CHECKBOX --}}
                        <th width="1%">
                            {!! $grid->checkboxesToggle(['duration' => 150]) !!}
                        </th>

                        {{-- STATE --}}
                        <th style="min-width: 90px;" width="7%">
                            {!! $grid->sortTitle($luna->langPrefix . 'category.field.state', 'category.state') !!}
                        </th>

                        {{-- TITLE --}}
                        <th style="min-width: 350px;">
                            {!! $grid->sortTitle($luna->langPrefix . 'category.field.title', 'category.title') !!}
                        </th>

                        {{-- ORDERING --}}
                        <th width="7%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'category.field.ordering', 'category.lft') !!} {!! $grid->saveorderButton() !!}
                        </th>

                        @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                            {{-- AUTHOR --}}
                            <th width="15%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'category.field.author', 'category.created_by') !!}
                            </th>
                        @endif

                        @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                            {{-- LANGUAGE --}}
                            <th width="15%">
                                {!! $grid->sortTitle($luna->langPrefix . 'category.field.language', 'category.language') !!}
                            </th>
                        @endif

                        {{-- DELETE --}}
                        <th width="1%" class="text-nowrap">
                            @translate('phoenix.toolbar.delete')
                        </th>

                        {{-- ID --}}
                        <th class="text-right" width="3%">
                            {!! $grid->sortTitle($luna->langPrefix . 'category.field.id', 'category.id') !!}
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach ($items as $i => $item)
                        <?php
                        $originOrdering[] = $item->ordering = $ordering
                            ? array_search($item->id, $ordering[$item->parent_id]) + 1
                            : '-';

                        $grid->setItem($item, $i);
                        ?>
                        <tr data-order-group="{{ $item->parent_id }}">
                            {{-- CHECKBOX --}}
                            <td>
                                {!! $grid->checkbox() !!}
                            </td>

                            {{-- STATE --}}
                            <td class="state-col">
                            <span class="btn-group">
                                {!! $grid->published($item->state) !!}
                                <button type="button"
                                    class="btn btn-default btn-light btn-sm hasTooltip disable-on-submit"
                                    onclick="Phoenix.Grid.copyRow({{ $i }});"
                                    title="@translate('phoenix.toolbar.duplicate')">
                                    <span class="glyphicon glyphicon-duplicate fa fa-copy"></span>
                                </button>
                            </span>
                            </td>

                            {{-- TITLE --}}
                            <td class="hasHighlight">
                                {{ str_repeat('—', $item->level - 1) }}
                                <a href="{{ $router->route('category', array('id' => $item->id, 'type' => $type)) }}">
                                    {{ $item->title }}
                                </a>

                                <small>({{ $item->alias }})</small>
                            </td>

                            {{-- ORDERING --}}
                            <td class="text-right">
                                {!! $grid->orderButton() !!}
                            </td>

                            @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                                {{-- AUTHOR --}}
                                <td>
                                    {{ $item->user_name }}
                                </td>
                            @endif

                            @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                                {{-- LANGUAGE --}}
                                <td class="text-nowrap">
                                    @if ($item->language === '*')
                                        <span class="glyphicon glyphicon-globe fa fa-globe"></span>
                                        @translate($luna->langPrefix . 'language.field.all')
                                    @else
                                        <span class="hasTooltip" title="{{ $item->lang_code }}">
                                        <span
                                            class="{{ \Lyrasoft\Luna\Language\Locale::getFlagIconClass($item->lang_image) }}"></span>
                                            {{ $item->lang_title }}
                                    </span>
                                    @endif
                                </td>
                            @endif

                            {{-- DELETE --}}
                            <td class="text-center">
                                <button type="button" class="btn btn-default btn-outline-secondary btn-sm hasTooltip"
                                        onclick="Phoenix.Grid.deleteRow({{ $i }});"
                                        title="@translate('phoenix.toolbar.delete')">
                                    <span class="fa fa-fw fa-trash"></span>
                                </button>
                            </td>

                            {{-- ID --}}
                            <td class="text-right">
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
                <input type="hidden" name="_method" value="PUT"/>
                <input type="hidden" name="origin_ordering" value="{{ implode(',', $originOrdering) }}"/>

                {{-- TOKEN --}}
                @formToken
            </div>

            @include('batch')
        </form>
    </div>
@stop
