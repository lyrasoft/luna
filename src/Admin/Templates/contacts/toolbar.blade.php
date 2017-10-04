{{-- Part of Luna project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Luna\LunaPackage                 Package object.
 * @var $view     \Luna\View\Contacts\ContactsHtmlView  View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 */
?>

<a role="button" class="btn btn-primary btn-sm phoenix-btn-new" href="{{ $router->route('contact', array('new' => true)) }}">
    <span class="glyphicon glyphicon-plus fa fa-plus"></span>
    @translate('phoenix.toolbar.new')
</a>

@foreach([0, 1, 2, -1] as $k)
<button type="button" class="btn btn-{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateColor($k) }} btn-sm" href="javascript:void(0);" onclick="Phoenix.Grid.hasChecked();Phoenix.Grid.batch('{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateSymbol($k) }}');">
    <span class="{{ \Lyrasoft\Luna\Contact\ContactHelper::getStateIcon($k) }}"></span>
    {{ \Lyrasoft\Luna\Contact\ContactHelper::translateState($k) }}
</button>
@endforeach

{{-- TODO: Add assignee --}}
{{--<button type="button" class="btn btn-default btn-outline-secondary btn-sm phoenix-btn-batch" data-toggle="modal" data-target="#batch-modal" onclick="Phoenix.Grid.hasChecked(null, event);">--}}
    {{--<span class="glyphicon glyphicon-modal-window fa fa-sliders"></span>--}}
    {{--@translate('phoenix.toolbar.batch')--}}
{{--</button>--}}

<button type="button" class="btn btn-default btn-outline-danger btn-sm phoenix-btn-delete" onclick="Phoenix.Grid.hasChecked().deleteList();">
    <span class="glyphicon glyphicon-trash fa fa-trash"></span>
    @translate('phoenix.toolbar.delete')
</button>
