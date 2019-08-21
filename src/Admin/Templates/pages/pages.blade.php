{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view          \Lyrasoft\Luna\Admin\View\Pages\PagesHtmlView  View object.
 * @var $uri           \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos       \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper        \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset         \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Core\Widget\Widget
 * @var $filterForm    \Windwalker\Form\Form
 * @var $batchForm     \Windwalker\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Structure\Structure
 * @var $items         \Windwalker\Data\DataSet
 * @var $item          \Lyrasoft\Luna\Record\PageRecord
 * @var $i             integer
 * @var $pagination    \Windwalker\Core\Pagination\Pagination
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('admin-body')
    <div id="phoenix-admin" class="pages-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $router->route('pages') }}" method="POST"
            enctype="multipart/form-data">

            {{-- FILTER BAR --}}
            <div class="filter-bar">
                {!! $filterBar->render(['form' => $form, 'show' => $showFilterBar]) !!}
            </div>

            @if (count($items))
                {{-- RESPONSIVE TABLE DESC --}}
                <p class="visible-xs-block d-sm-block d-md-none">
                    @lang('phoenix.grid.responsive.table.desc')
                </p>

                <div class="grid-table">
                    <table class="table table-striped table-bordered table-responsive">
                        <thead>
                        <tr>
                            {{-- CHECKBOX --}}
                            <th width="1%" class="text-nowrap">
                                {!! $grid->checkboxesToggle(['duration' => 150]) !!}
                            </th>

                            {{-- STATE --}}
                            <th style="min-width: 70px;" width="8%" class="text-nowrap">
                                {!! $grid->sortTitle('luna.page.field.state', 'page.state') !!}
                            </th>

                            {{-- TITLE --}}
                            <th class="text-nowrap" style="min-width: 300px;">
                                {!! $grid->sortTitle('luna.page.field.title', 'page.title') !!}
                            </th>

                            {{-- ORDERING --}}
                            <th width="5%" class="text-nowrap">
                                {!! $grid->sortTitle('luna.page.field.ordering', 'page.ordering') !!}
                                {!! $grid->saveOrderButton() !!}
                            </th>

                            {{-- AUTHOR --}}
                            <th width="10%" class="text-nowrap">
                                {!! $grid->sortTitle('luna.page.field.author', 'page.created_by') !!}
                            </th>

                            {{-- CREATED --}}
                            <th width="10%" class="text-nowrap">
                                {!! $grid->sortTitle('luna.page.field.created', 'page.created') !!}
                            </th>

                            @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                                {{-- LANGUAGE --}}
                                <th width="7%" class="text-nowrap">
                                    {!! $grid->sortTitle('luna.page.field.language', 'page.language') !!}
                                </th>
                            @endif

                            {{-- DELETE --}}
                            <th width="1%" class="text-nowrap">
                                @lang('luna.page.field.delete')
                            </th>

                            {{-- ID --}}
                            <th width="3%" class="text-nowrap text-right">
                                {!! $grid->sortTitle('luna.page.field.id', 'page.id') !!}
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        @foreach ($items as $i => $item)
                            <?php
                            $grid->setItem($item, $i);
                            ?>
                            <tr data-order-group="">
                                {{-- CHECKBOX --}}
                                <td>
                                    {!! $grid->checkbox() !!}
                                </td>

                                {{-- STATE --}}
                                <td class="text-nowrap">
                            <span class="btn-group">
                                {!! $grid->published($item->state) !!}
                                <button type="button"
                                    class="btn btn-default btn-light btn-sm has-tooltip disable-on-submit"
                                    onclick="Phoenix.Grid.copyRow({{ $i }});"
                                    title="@lang('phoenix.toolbar.duplicate')">
                                    <span class="fa fa-fw fa-copy text-info"></span>
                                </button>
                            </span>
                                </td>

                                {{-- TITLE --}}
                                <td>
                                    <a href="{{ $router->route('page', ['id' => $item->id]) }}">
                                        {{ $item->title }}
                                    </a>
                                </td>

                                {{-- ORDERING --}}
                                <td class="text-right">
                                    {!! $grid->orderButton() !!}
                                </td>

                                {{-- AUTHOR --}}
                                <td class="text-nowrap">
                                    {{ property_exists($item, 'user_name') ? $item->user_name : $item->created_by }}
                                </td>

                                {{-- CREATED --}}
                                <td class="text-nowrap">
                                    <span class="has-tooltip"
                                        title="{{ $datetime::toLocalTime($item->created, 'Y-m-d H:i:s') }}">
                                        {{ $datetime::toLocalTime($item->created, 'Y-m-d') }}
                                    </span>
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
                                    <button type="button" class="btn btn-default btn-outline-secondary btn-sm has-tooltip"
                                        onclick="Phoenix.Grid.deleteRow({{ $i }});"
                                        title="@lang('phoenix.toolbar.delete')">
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
                                {!! $pagination->route('pages', [])->render() !!}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            @else
                <div class="grid-no-items card bg-light" style="padding: 125px 0;">
                    <div class="card-body text-center">
                        <h3 class="text-secondary">@lang('phoenix.grid.no.items')</h3>
                    </div>
                </div>
            @endif

            <div class="hidden-inputs">
                {{-- METHOD --}}
                <input type="hidden" name="_method" value="PUT" />

                {{-- TOKEN --}}
                @formToken
            </div>

            @include('batch')
        </form>
    </div>
@stop
