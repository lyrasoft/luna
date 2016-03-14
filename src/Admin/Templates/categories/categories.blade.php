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
 * @var $ordering      array
 */
?>

@extends($lunaExtends)

@section('toolbar')
    @include('toolbar')
@stop

@section('admin-body')
<div id="phoenix-admin" class="categories-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->html('categories') }}" method="POST" enctype="multipart/form-data">

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
                        {!! $grid->sortTitle($lunaPrefix . 'category.field.state', 'category.state') !!}
                    </th>

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'category.field.title', 'category.title') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($lunaPrefix . 'category.field.ordering', 'category.lft') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    @if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
                        {{-- AUTHOR --}}
                        <th>
                            {!! $grid->sortTitle($lunaPrefix . 'category.field.author', 'category.created_by') !!}
                        </th>
                    @endif

                    {{-- CREATED --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'category.field.created', 'category.created') !!}
                    </th>

                    @if (\Lyrasoft\Luna\Language\LanguageHelper::canSelectLanguage())
                        {{-- LANGUAGE --}}
                        <th>
                            {!! $grid->sortTitle($lunaPrefix . 'category.field.language', 'category.language') !!}
                        </th>
                    @endif

                    {{-- ID --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'category.field.id', 'category.id') !!}
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
                            <a href="{{ $router->html('category', array('id' => $item->id)) }}">
                                {{ $item->title }}
                            </a>
                        </td>

                        {{-- ORDERING --}}
                        <td class="text-center">
                            {!! $grid->orderButton() !!}
                        </td>

                        @if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
                            {{-- AUTHOR --}}
                            <td>
                                {{ $item->user_name }}
                            </td>
                        @endif

                        {{-- CREATED --}}
                        <td>
                            {{ Windwalker\Core\DateTime\DateTime::toLocalTime($item->created, 'Y-m-d') }}
                        </td>

                        @if (\Lyrasoft\Luna\Language\LanguageHelper::canSelectLanguage())
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
                        {!! $pagination->render($package->getName() . '@categories', 'windwalker.pagination.phoenix') !!}
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
