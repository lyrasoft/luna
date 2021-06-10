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
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
    <style>
        .tooltip-inner {
            max-width: 600px;
        }

        .module-position-badge {
            font-size: 14px;
        }
    </style>
    <div id="phoenix-admin" class="modules-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $router->route('modules') }}" method="POST"
              enctype="multipart/form-data">

            {{-- FILTER BAR --}}
            <div class="filter-bar">
                {!! $filterBar->render(array('form' => $form, 'show' => $showFilterBar)) !!}
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
                            {!! $grid->checkboxesToggle(array('duration' => 150)) !!}
                        </th>

                        {{-- STATE --}}
                        <th style="min-width: 90px;" width="7%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'module.field.state', 'module.state') !!}
                        </th>

                        {{-- TITLE --}}
                        <th class="text-nowrap" style="min-width: 300px;">
                            {!! $grid->sortTitle($luna->langPrefix . 'module.field.title', 'module.title') !!}
                        </th>

                        {{-- MODULE --}}
                        <th width="15%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'module.field.module', 'module.class') !!}
                        </th>

                        {{-- POSITION --}}
                        <th width="10%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'module.field.position', 'module.position') !!}
                        </th>

                        {{-- ORDERING --}}
                        <th width="5%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'module.field.ordering', 'module.position, module.ordering') !!} {!! $grid->saveorderButton() !!}
                        </th>

                        @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                            {{-- LANGUAGE --}}
                            <th width="15%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'module.field.language', 'module.language') !!}
                            </th>
                        @endif

                        {{-- DELETE --}}
                        <th width="1%" class="text-nowrap">
                            @translate('phoenix.toolbar.delete')
                        </th>

                        {{-- ID --}}
                        <th width="5%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'module.field.id', 'module.id') !!}
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
                                <a href="{{ $router->route('module', array('id' => $item->id)) }}">
                                    {{ $item->title }}
                                </a>
                            </td>

                            {{-- MODULE --}}
                            <td class="text-nowrap">
                            <span class="hasTooltip" title="{{ $item->class }}">
                                {{ $item->name }}
                            </span>
                            </td>

                            {{-- POSITION --}}
                            <td class="text-nowrap">
                            <span
                                class="{{ \Phoenix\Script\BootstrapScript::$currentVersion === 4 ? 'badge' : 'label' }} module-position-badge"
                                style="background-color: {{ $item->labelColor }}; color: {{ $item->textColor }};">
                                {{ $item->positionName }}
                            </span>
                            </td>

                            {{-- ORDERING --}}
                            <td class="text-center">
                                {!! $grid->orderButton() !!}
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

            @include('create_modal')
        </form>
    </div>
@stop
