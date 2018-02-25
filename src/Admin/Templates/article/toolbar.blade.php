{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application            Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage            Package object.
 * @var $view     \Windwalker\Data\Data                  Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData          Uri information, example: $uri->path
 * @var $datetime \DateTime                              PHP DateTime object of current time.
 * @var $helper   \Lyrasoft\Luna\Admin\Helper\MenuHelper        The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 */
?>

<div class="btn-group">
    <button type="button" class="btn btn-success btn-sm phoenix-btn-save"
            onclick="Phoenix.post();">
        <span class="fa fa-save"></span>
        @translate('phoenix.toolbar.save')
    </button>
    <button type="button" class="btn btn-success btn-sm dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
    </button>

    <ul class="dropdown-menu dropdown-menu-right">
        <li>
            <a class="dropdown-item phoenix-btn-save2copy"
               href="javascript://"
               onclick="Phoenix.post(null, {task: 'save2copy'});">
                <span class="fa fa-copy text-info"></span>
                @translate('phoenix.toolbar.save2copy')
            </a>
        </li>

        <li>
            <a class="dropdown-item phoenix-btn-save2new"
               href="javascript://"
               onclick="Phoenix.post(null, {task: 'save2new'});">
                <span class="fa fa-plus text-primary"></span>
                @translate('phoenix.toolbar.save2new')
            </a>
        </li>
    </ul>
</div>

<button type="button" class="btn btn-primary btn-outline-primary btn-sm phoenix-btn-save2close"
        onclick="Phoenix.post(null, {task: 'save2close'});">
    <span class="fa fa-check"></span>
    @translate('phoenix.toolbar.save2close')
</button>

<a role="button" class="btn btn-default btn-outline-secondary btn-sm" href="{{ $router->route('articles') }}">
    <span class="glyphicon glyphicon-remove fa fa-remove"></span>
    @translate('phoenix.toolbar.cancel')
</a>
