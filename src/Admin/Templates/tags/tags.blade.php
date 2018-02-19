{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Lyrasoft\Luna\LunaPackage                Package object.
 * @var $view          \Windwalker\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Core\Widget\Widget
 * @var $filterForm    \Windwalker\Form\Form
 * @var $form          \Windwalker\Form\Form
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
    <div id="phoenix-admin" class="tags-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $router->route('tags') }}" method="POST"
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
                            {!! $grid->sortTitle($luna->langPrefix . 'tag.field.state', 'tag.state') !!}
                        </th>

                        {{-- TITLE --}}
                        <th class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'tag.field.title', 'tag.title') !!}
                        </th>

                        @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                            {{-- AUTHOR --}}
                            <th width="20%" class="text-nowrap">
                                {!! $grid->sortTitle($luna->langPrefix . 'tag.field.author', 'tag.created_by') !!}
                            </th>
                        @endif

                        {{-- CREATED --}}
                        <th width="10%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'tag.field.created', 'tag.created') !!}
                        </th>

                        {{-- LANGUAGE --}}
                        {{--<th>--}}
                        {{--{!! $grid->sortTitle($luna->langPrefix . 'tag.field.language', 'tag.language') !!}--}}
                        {{--</th>--}}

                        {{-- DELETE --}}
                        <th width="1%" class="text-nowrap">
                            @translate('phoenix.toolbar.delete')
                        </th>

                        {{-- ID --}}
                        <th width="1%" class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'tag.field.id', 'tag.id') !!}
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
                            <td class="state-col">
                            <span class="btn-group">
                                {!! $grid->published($item->state) !!}
                                <button type="button" class="btn btn-default btn-light btn-sm hasTooltip"
                                        onclick="Phoenix.Grid.copyRow({{ $i }});"
                                        title="@translate('phoenix.toolbar.duplicate')">
                                    <span class="glyphicon glyphicon-duplicate fa fa-copy"></span>
                                </button>
                            </span>
                            </td>

                            {{-- TITLE --}}
                            <td class="hasHighlight">
                                <a href="{{ $router->route('tag', array('id' => $item->id)) }}">
                                    {{ $item->title }}
                                </a>

                                <small class="text-muted">
                                    ( {{ $item->alias }} )
                                </small>

                            </td>

                            @if (\Lyrasoft\Warder\Helper\WarderHelper::tableExists('users'))
                                {{-- AUTHOR --}}
                                <td>
                                    {{ $item->user_name }}
                                </td>
                            @endif

                            {{-- CREATED --}}
                            <td class="text-nowrap">
                                {{ Windwalker\Core\DateTime\Chronos::toLocalTime($item->created, 'Y-m-d') }}
                            </td>

                            {{-- LANGUAGE --}}
                            {{--<td>--}}
                            {{--{{ $item->language }}--}}
                            {{--</td>--}}

                            {{-- DELETE --}}
                            <td class="text-center">
                                <button type="button" class="btn btn-default btn-outline-secondary btn-sm hasTooltip"
                                        onclick="Phoenix.Grid.deleteRow({{ $i }});"
                                        title="@translate('phoenix.toolbar.delete')">
                                    <span class="fa fa-fw fa-trash"></span>
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
                <input type="hidden" name="_method" value="PUT"/>

                {{-- TOKEN --}}
                @formToken()
            </div>

            @include('batch')
        </form>
    </div>
@stop
