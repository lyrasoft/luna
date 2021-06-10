{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package       \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view          \Lyrasoft\Luna\Admin\View\Articles\ArticlesHtmlView  Some information of this view.
 * @var $uri           \Windwalker\Legacy\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Legacy\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Legacy\Core\Widget\Widget
 * @var $form          \Windwalker\Legacy\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Legacy\Structure\Structure
 * @var $items         \Windwalker\Legacy\Data\DataSet
 * @var $item          \Windwalker\Legacy\Data\Data
 * @var $i             integer
 * @var $pagination    \Windwalker\Legacy\Core\Pagination\Pagination
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
    <div id="phoenix-admin" class="articles-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $router->route('articles') }}" method="POST"
              enctype="multipart/form-data">

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
                        <th width="1%" class="text-nowrap">
                            {!! $grid->checkboxesToggle(['duration' => 150]) !!}
                        </th>

                        {{-- STATE --}}
                        <th style="min-width: 90px;" width="7%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'article.field.state', 'article.state') !!}
                        </th>

                        {{-- CATEGORY --}}
                        {{--<th>--}}
                        {{--{!! $grid->sortTitle('luna.category.title', 'category.id') !!}--}}
                        {{--</th>--}}

                        {{-- TITLE --}}
                        <th class="text-nowrap" style="min-width: 300px;">
                            {!! $grid->sortTitle($luna->langPrefix . 'article.field.title', 'article.title') !!}
                        </th>

                        {{-- ORDERING --}}
                        <th width="5%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'article.field.ordering', 'category.id, article.ordering') !!} {!! $grid->saveorderButton() !!}
                        </th>

                        @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                            {{-- AUTHOR --}}
                            <th width="15%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'article.field.author', 'article.created_by') !!}
                            </th>
                        @endif

                        {{-- CREATED --}}
                        <th width="8%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'article.field.created', 'article.created') !!}
                        </th>

                        @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                            {{-- LANGUAGE --}}
                            <th width="15%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'article.field.language', 'article.language') !!}
                            </th>
                        @endif

                        {{-- DELETE --}}
                        <th width="1%" class="text-nowrap">
                            @translate('phoenix.toolbar.delete')
                        </th>

                        {{-- ID --}}
                        <th width="5%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'article.field.id', 'article.id') !!}
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

                            {{-- CATEGORY --}}
                            {{--<td>--}}
                            {{--{{ $item->category_title }}--}}
                            {{--</td>--}}

                            {{-- TITLE --}}
                            <td class="hasHighlight">
                                <a class="lead" href="{{ $router->route('article', ['id' => $item->id]) }}">
                                    {{ $item->title }}
                                </a>

                                @if (property_exists($item, 'alias'))
                                    <div class="article-alias-field" style="padding-left: 10px">
                                        <small class="text-muted">
                                            <span class="glyphicon glyphicon-globe fa fa-globe"></span>
                                            {{ $item->alias }}
                                        </small>
                                    </div>
                                @endif

                                @if ($item->category_title)
                                    <div class="article-category-field" style="padding-left: 10px">
                                        <small class="text-muted">
                                            <span class="fa fa-folder"></span>
                                            @foreach ($view->getCategoryPath($item->category_id) as $i => $category)
                                                @if ($i !== 0)
                                                    /
                                                @endif

                                                <a class="text-muted"
                                                    href="{{ $router->route('articles', ['filter' => ['article.category_id' => $category->id]]) }}">
                                                    {{ $category->title }}
                                                </a>
                                            @endforeach
                                        </small>
                                    </div>
                                @endif
                            </td>

                            {{-- ORDERING --}}
                            <td class="text-right">
                                {!! $grid->orderButton() !!}
                            </td>

                            @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                                {{-- AUTHOR --}}
                                <td>
                                    {!! $grid->foreignLink($item->user_name, $router->route('user', ['id' => $item->user_id])) !!}
                                </td>
                            @endif

                            {{-- CREATED --}}
                            <td class="text-nowrap">
                                {{ Windwalker\Legacy\Core\DateTime\Chronos::toLocalTime($item->created, 'Y-m-d') }}
                            </td>

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
                            {!! $pagination->route($view->name, [])->render() !!}
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <div class="hidden-inputs">
                {{-- METHOD --}}
                <input type="hidden" name="_method" value="PUT"/>

                {{-- TOKEN --}}
                @formToken
            </div>

            @include('batch')
        </form>
    </div>
@stop
