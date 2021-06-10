{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Page\PageHtmlView    View object.
 * @var $uri      \Windwalker\Legacy\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Legacy\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Legacy\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 */
?>

<button type="button" class="btn btn-success btn-sm btn-wide phoenix-btn-save">
    <span data-spinner class="fa fa-save"></span>
    @lang('phoenix.toolbar.save')
</button>

<button type="button" class="btn btn-info btn-sm ml-auto luna-button-options"
    data-toggle="modal" data-target="#options-modal">
    <span class="fa fa-cog"></span>
    @lang('luna.page.button.options')
</button>

@if ($item->id)
    <a href="{{ $router->route('front@page', ['path' => $item->alias, 'preview' => $item->preview_secret]) }}"
        target="_blank"
        class="btn btn-sm btn-outline-primary">
        <span class="fa fa-eye"></span>
        @lang('luna.page.button.preview')
    </a>
@endif

<a role="button" class="btn btn-default btn-outline-secondary btn-sm phoenix-btn-cancel"
    href="{{ $router->route('pages') }}">
    <span class="fa fa-remove fa-times"></span>
    @lang('phoenix.toolbar.cancel')
</a>
