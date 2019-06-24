{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view          \Lyrasoft\Luna\Admin\View\Menus\MenusHtmlView  View object.
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
 * @var $item          \Lyrasoft\Luna\Admin\Record\MenuRecord
 * @var $i             integer
 * @var $pagination    \Windwalker\Core\Pagination\Pagination
 */

$url = new \Windwalker\Uri\Uri($uri->full);
$url->delVar('page');
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@push('script')
    <script>
        $(function () {
            var route = '{!! $router->to('menus', $url->getQuery(true))->var('type', '@{{type}}') !!}';

            var typeField = $('#input-type');

            typeField.on('change', function () {
                var type = typeField.val();

                if (type) {
                    location.href = route.replace(/\{\{type\}\}/, type);
                }
            });
        });
    </script>
@endpush

@section('admin-body')
    <div id="phoenix-admin" class="menus-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $router->route('menus') }}" method="POST"
            enctype="multipart/form-data">

            {{-- FILTER BAR --}}
            <div class="filter-bar">
                @component('phoenix.grid.filterbar', ['form' => $form, 'show' => $showFilterBar])
                    @slot('bar')
                        <div class="ml-2" style="min-width: 325px">
                            {!! $typeField->renderInput() !!}
                        </div>
                    @endslot
                @endcomponent
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
                                {!! $grid->sortTitle($luna->langPrefix . 'menu.field.state', 'menu.state') !!}
                            </th>

                            {{-- TITLE --}}
                            <th class="text-nowrap" style="min-width: 300px;">
                                {!! $grid->sortTitle($luna->langPrefix . 'menu.field.title', 'menu.title') !!}
                            </th>

                            {{-- VIEW --}}
                            <th class="text-nowrap" width="5%">
                                {!! $grid->sortTitle($luna->langPrefix . 'menu.field.view', 'menu.view') !!}
                            </th>

                            {{-- ORDERING --}}
                            <th width="5%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'menu.field.ordering', 'menu.lft') !!}
                                {!! $grid->saveOrderButton() !!}
                            </th>

                            {{-- CREATED --}}
                            <th width="10%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'menu.field.created', 'menu.created') !!}
                            </th>

                            @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                                {{-- LANGUAGE --}}
                                <th width="7%" class="text-nowrap">
                                    {!! $grid->sortTitle($luna->langPrefix . 'menu.field.language', 'menu.language') !!}
                                </th>
                            @endif

                            {{-- DELETE --}}
                            <th width="1%" class="text-nowrap">
                                @lang($luna->langPrefix . 'menu.field.delete')
                            </th>

                            {{-- ID --}}
                            <th width="3%" class="text-nowrap text-right">
                                {!! $grid->sortTitle($luna->langPrefix . 'menu.field.id', 'menu.id') !!}
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
                            <tr data-order-group="">
                                {{-- CHECKBOX --}}
                                <td>
                                    {!! $grid->checkbox() !!}
                                </td>

                                {{-- STATE --}}
                                <td class="text-nowrap">
                                    <span class="btn-group">
                                        {!! $grid->published($item->state) !!}
                                        <button type="button" class="btn btn-default btn-light btn-sm has-tooltip"
                                            onclick="Phoenix.Grid.copyRow({{ $i }});"
                                            title="@lang('phoenix.toolbar.duplicate')">
                                            <span class="fa fa-fw fa-copy text-info"></span>
                                        </button>
                                    </span>
                                </td>

                                {{-- TITLE --}}
                                <td class="searchable">
                                    {{ str_repeat('—', $item->level - 1) }}
                                    <a href="{{ $router->route('menu', ['id' => $item->id]) }}">
                                        {{ $item->title }}
                                    </a>
                                    @if ($item->hidden)
                                        <span class="fas fa-eye-slash has-tooltip"
                                        title="@lang($luna->langPrefix . 'menu.field.hidden')"></span>
                                    @endif
                                </td>

                                {{-- VIEW --}}
                                <td class="text-nowrap">
                                    <div class="small text-muted">
                                        @lang($luna->langPrefix . 'menu.group.' . $item->viewInstance::getGroup())
                                    </div>
                                    <div class="has-tooltip" title="{{ $item->view }}">
                                        {{ $item->viewInstance::getTitle() }}
                                    </div>
                                </td>

                                {{-- ORDERING --}}
                                <td class="text-right">
                                    {!! $grid->orderButton() !!}
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
                                {!! $pagination->route('menus', [])->render() !!}
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

            @include('_global.admin.widget.batch')
        </form>
    </div>
@stop
