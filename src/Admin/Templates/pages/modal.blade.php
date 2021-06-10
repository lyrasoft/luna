{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package       \Windwalker\Legacy\Core\Package\AbstractPackage    Package object.
 * @var $view          \Lyrasoft\Luna\Admin\View\Pages\PagesHtmlView  View object.
 * @var $uri           \Windwalker\Legacy\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos       \Windwalker\Legacy\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper        \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Legacy\Core\Router\MainRouter          Route builder object.
 * @var $asset         \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Legacy\Core\Widget\Widget
 * @var $filterForm    \Windwalker\Legacy\Form\Form
 * @var $batchForm     \Windwalker\Legacy\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Legacy\Structure\Structure
 * @var $items         \Windwalker\Legacy\Data\DataSet|\Lyrasoft\Luna\Record\PageRecord[]
 * @var $item          \Lyrasoft\Luna\Record\PageRecord
 * @var $i             integer
 * @var $pagination    \Windwalker\Legacy\Core\Pagination\Pagination
 */
?>

@extends('_global.' . \Lyrasoft\Luna\Helper\LunaHelper::getAdminPackage(true) . '.pure')

@section('toolbar')
    @include('toolbar')
@stop

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('body')
    <div id="phoenix-admin" class="pages-container grid-container">
        <form name="admin-form" id="admin-form" action="{{ $uri['full'] }}" method="POST" enctype="multipart/form-data">

            {{-- FILTER BAR --}}
            <div class="filter-bar">
                {!! $filterBar->render(['form' => $form, 'show' => $showFilterBar]) !!}
            </div>

            {{-- RESPONSIVE TABLE DESC --}}
            <p class="visible-xs-block d-sm-block d-md-none">
                @lang('phoenix.grid.responsive.table.desc')
            </p>

            <div class="grid-table">
                <table class="table table-bordered table-responsive">
                    <thead>
                    <tr>
                        {{-- TITLE --}}
                        <th class="text-nowrap">
                            {!! $grid->sortTitle('luna.page.field.title', 'page.title') !!}
                        </th>

                        {{-- STATE --}}
                        <th width="5%" class="text-nowrap">
                            {!! $grid->sortTitle('luna.page.field.state', 'page.state') !!}
                        </th>

                        @if (\Lyrasoft\Luna\Language\Locale::isEnabled())
                            {{-- LANGUAGE --}}
                            <th width="7%" class="text-nowrap">
                                {!! $grid->sortTitle('luna.page.field.language', 'page.language') !!}
                            </th>
                        @endif

                        {{-- CREATED --}}
                        <th width="15%" class="text-nowrap">
                            {!! $grid->sortTitle('luna.page.field.created', 'page.created') !!}
                        </th>

                        {{-- ID --}}
                        <th width="5%" class="text-nowrap">
                            {!! $grid->sortTitle('luna.page.field.id', 'page.id') !!}
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
                                <a href="#"
                                    onclick="parent.{{ $function }}('{{ $selector }}', '{{ $item->id }}', '{{ $item->title }}');">
                                    <span class="fa fa-angle-right text-muted"></span> {{ $item->title }}
                                </a>
                            </td>

                            {{-- STATE --}}
                            <td class="text-center">
                                {!! $grid->published($item->state, ['only_icon' => true]) !!}
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

                            {{-- CREATED --}}
                            <td>
                                {{ \Windwalker\Legacy\Core\DateTime\Chronos::toLocalTime($item->created, 'Y-m-d') }}
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
                            {!! $pagination->render() !!}
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <div class="hidden-inputs">
                {{-- METHOD --}}
                <input type="hidden" name="_method" value="PUT" />

                {{-- TOKEN --}}
                @formToken
            </div>
        </form>
    </div>
@stop
