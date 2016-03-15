{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
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
<div id="phoenix-admin" class="articles-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->html('articles') }}" method="POST" enctype="multipart/form-data">

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
                        {!! $grid->sortTitle($lunaPrefix . 'article.field.state', 'article.state') !!}
                    </th>

                    {{-- CATEGORY --}}
                    {{--<th>--}}
                        {{--{!! $grid->sortTitle('luna.category.title', 'category.id') !!}--}}
                    {{--</th>--}}

                    {{-- TITLE --}}
                    <th>
                        {!! $grid->sortTitle($lunaPrefix . 'article.field.title', 'article.title') !!}
                    </th>

                    {{-- ORDERING --}}
                    <th width="5%" class="nowrap">
                        {!! $grid->sortTitle($lunaPrefix . 'article.field.ordering', 'category.id, article.ordering') !!} {!! $grid->saveorderButton() !!}
                    </th>

                    @if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
                        {{-- AUTHOR --}}
                        <th>
                            {!! $grid->sortTitle($lunaPrefix . 'article.field.author', 'article.created_by') !!}
                        </th>
                    @endif

                    {{-- CREATED --}}
                    <th width="8%">
                        {!! $grid->sortTitle($lunaPrefix . 'article.field.created', 'article.created') !!}
                    </th>

                    @if (\Lyrasoft\Luna\Language\LanguageHelper::isEnabled())
                        {{-- LANGUAGE --}}
                        <th width="15%">
                            {!! $grid->sortTitle($lunaPrefix . 'article.field.language', 'article.language') !!}
                        </th>
                    @endif

                    {{-- ID --}}
                    <th width="5%">
                        {!! $grid->sortTitle($lunaPrefix . 'article.field.id', 'article.id') !!}
                    </th>
                </tr>
                </thead>

                <tbody>
                @foreach ($items as $i => $item)
                    <?php
                    $grid->setItem($item, $i);
                    ?>
                    <tr data-order-group="{{ $item->category_id }}">
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

                        {{-- CATEGORY --}}
                        {{--<td>--}}
                            {{--{{ $item->category_title }}--}}
                        {{--</td>--}}

                        {{-- TITLE --}}
                        <td class="hasHighlight">
                            <a class="lead" href="{{ $router->html('article', array('id' => $item->id)) }}">
                                {{ $item->title }}
                            </a>
                            <div class="article-alias-field" style="padding-left: 10px">
                                <small class="text-muted">
                                    <span class="glyphicon glyphicon-globe"></span>
                                    {{ $item->alias }}
                                </small>
                            </div>
                            <div class="article-category-field" style="padding-left: 10px">
                                <small class="text-muted">
                                    <span class="glyphicon glyphicon-folder-close"></span>
                                    <a class="text-muted" href="{{ $router->html('articles', array('filter' => array('article.category_id' => $item->category_id))) }}">
                                        {{ $item->category_title }}
                                    </a>
                                </small>
                            </div>
                        </td>

                        {{-- ORDERING --}}
                        <td class="text-center">
                            {!! $grid->orderButton() !!}
                        </td>

                        @if (\Windwalker\Warder\Helper\WarderHelper::tableExists('users'))
                            {{-- AUTHOR --}}
                            <td>
                                {!! $grid->foreignLink($item->user_name, $router->html('user', array('id' => $item->user_id))) !!}
                            </td>
                        @endif

                        {{-- CREATED --}}
                        <td>
                            {{ Windwalker\Core\DateTime\DateTime::toLocalTime($item->created, 'Y-m-d') }}
                        </td>

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
                        {!! $pagination->render($package->getName() . '@articles', 'windwalker.pagination.phoenix') !!}
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
