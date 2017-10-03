{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Contacts\ContactsHtmlView  View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $filterBar     \Windwalker\Core\Widget\Widget
 * @var $filterForm    \Windwalker\Form\Form
 * @var $batchForm     \Windwalker\Form\Form
 * @var $showFilterBar boolean
 * @var $grid          \Phoenix\View\Helper\GridHelper
 * @var $state         \Windwalker\Structure\Structure
 * @var $items         \Windwalker\Data\DataSet|\Lyrasoft\Luna\Admin\Record\ContactRecord[]
 * @var $item          \Lyrasoft\Luna\Admin\Record\ContactRecord
 * @var $i             integer
 * @var $pagination    \Windwalker\Core\Pagination\Pagination
 */
?>

@extends($luna->extends)

@section('toolbar-buttons')
    @include('toolbar')
@stop

@section('admin-body')
<div id="phoenix-admin" class="contacts-container grid-container">
    <form name="admin-form" id="admin-form" action="{{ $router->route('contacts') }}" method="POST" enctype="multipart/form-data">

        {{-- FILTER BAR --}}
        <div class="filter-bar">
            {!! $filterBar->render(['form' => $form, 'show' => $showFilterBar]) !!}
        </div>

        {{-- RESPONSIVE TABLE DESC --}}
        <p class="visible-xs-block">
            @translate('phoenix.grid.responsive.table.desc')
        </p>

        <div class="grid-table table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    {{-- CHECKBOX --}}
                    <th width="1%" class="text-nowrap">
                        {!! $grid->checkboxesToggle(['duration' => 150]) !!}
                    </th>

                    {{-- STATE --}}
                    <th style="min-width: 90px;"  width="10%" class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'contact.field.state', 'contact.state') !!}
                    </th>

                    <th width="5%" class="text-nowrap">
                        @translate($luna->langPrefix . 'contact.button.edit')
                    </th>

                    @if ($entity->hasField('subject'))
                        {{-- SUBJECT --}}
                        <th class="text-nowrap">
                            {!! $grid->sortTitle($luna->langPrefix . 'contact.field.subject', 'contact.subject') !!}
                        </th>
                    @else
                        <th class="text-nowrap">
                            @translate($luna->langPrefix . 'contact.preview')
                        </th>
                    @endif

                    {{-- CONTENT --}}
                    <th class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'contact.field.content', 'contact.content') !!}
                    </th>

                    {{-- AUTHOR --}}
                    <th width="12%" class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'contact.field.author', 'contact.created_by') !!}
                    </th>

                    {{-- CREATED --}}
                    <th width="10%" class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'contact.field.created', 'contact.created') !!}
                    </th>

                    {{-- ID --}}
                    <th width="3%" class="text-nowrap">
                        {!! $grid->sortTitle($luna->langPrefix . 'contact.field.id', 'contact.id') !!}
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
                        <td>
                            <span class="btn-group">
                                @include('dropdown', ['item' => $item, 'i' => $i])
                            </span>
                        </td>

                        <td>
                            <a class="btn btn-default btn-sm" href="{{ $router->route('contact', ['id' => $item->id]) }}">
                                <span class="glyphicon glyphicon-edit fa fa-pencil"></span>
                            </a>
                        </td>

                        @if ($entity->hasField('subject'))
                            {{-- SUBJECT --}}
                            <td>
                                <a href="{{ $router->route('contact', ['id' => $item->id]) }}" data-preview-id="{{ $item->id }}"
                                    data-preview-button>
                                    <span class="glyphicon glyphicon-eye-open fa fa-eye"></span>
                                    {{ $item->subject }}
                                </a>
                            </td>
                        @else
                            <td>
                                <button class="btn btn-info btn-sm" type="button" data-preview-id="{{ $item->id }}"
                                    data-preview-button>
                                    <span class="glyphicon glyphicon-eye-open fa fa-eye"></span>
                                </button>
                            </td>
                        @endif

                        {{-- CONTENT --}}
                        <td>
                            {{ str(strip_tags($item->content))->truncate(50, '...') }}
                        </td>

                        {{-- AUTHOR --}}
                        <td>
                            @if ($item->user_name)
                                <a class="text-muted" href="{{ $router->to('user', ['id' => $item->user_id]) }}" target="_blank">
                                    {{ $item->user_name }}
                                    <span class="glyphicon glyphicon-share-alt"></span>
                                </a>
                            @elseif ($item->name)
                                {{ $item->name }}
                            @else
                                @translate($luna->langPrefix . 'contact.author.anonymous')
                            @endif
                        </td>

                        {{-- CREATED --}}
                        <td>
                            <span class="hasTooltip" title="{{ $datetime::toLocalTime($item->created, 'Y-m-d H:i:s') }}">
                                {{ $datetime::toLocalTime($item->created, 'Y-m-d H:i:s') }}
                            </span>
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
                        {!! $pagination->route('contacts', [])->render() !!}
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
        @include('preview')
    </form>
</div>
@stop
