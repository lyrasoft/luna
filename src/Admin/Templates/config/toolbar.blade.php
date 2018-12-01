{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Config\ConfigHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 */
?>

<button type="button" class="btn btn-success btn-sm btn-wide phoenix-btn-save"
    onclick="Phoenix.post();">
    <span class="fa fa-save"></span>
    @lang('phoenix.toolbar.save')
</button>

<a role="button" class="btn btn-default btn-outline-secondary btn-sm phoenix-btn-cancel"
    href="{{ $router->route('home') }}">
    <span class="fa fa-remove fa-times"></span>
    @lang('phoenix.toolbar.cancel')
</a>
