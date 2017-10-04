{{-- Part of Admin project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application            Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage           Package object.
 * @var $view     \Windwalker\Data\Data                  Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData          Uri information, example: $uri->path
 * @var $datetime \DateTime                              PHP DateTime object of current time.
 * @var $helper   \Admin\Helper\MenuHelper        The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter  Router object.
 */
?>

{{--<a role="button" class="btn btn-success btn-sm" href="{{ $router->route('comment', array('new' => true)) }}">--}}
    {{--<span class="glyphicon glyphicon-plus fa fa-plus"></span>--}}
    {{--@translate('phoenix.toolbar.new')--}}
{{--</a>--}}

{{--<button type="button" class="btn btn-info btn-sm phoenix-btn-duplicate" onclick="Phoenix.Grid.hasChecked();Phoenix.post();">--}}
    {{--<span class="glyphicon glyphicon-duplicate fa fa-copy"></span>--}}
    {{--@translate('phoenix.toolbar.duplicate')--}}
{{--</button>--}}

<button type="button" class="btn btn-success btn-sm phoenix-btn-publish" onclick="Phoenix.Grid.hasChecked().batch('publish');">
    <span class="glyphicon glyphicon-ok fa fa-check"></span>
    @translate('phoenix.toolbar.publish')
</button>

<button type="button" class="btn btn-danger btn-sm phoenix-btn-unpublish" onclick="Phoenix.Grid.hasChecked().batch('unpublish');">
    <span class="glyphicon glyphicon-remove fa fa-remove"></span>
    @translate('phoenix.toolbar.unpublish')
</button>

{{--<button type="button" class="btn btn-default btn-outline-secondary btn-sm phoenix-btn-batch" data-toggle="modal" data-target="#batch-modal" onclick="Phoenix.Grid.hasChecked(null, event);">--}}
    {{--<span class="glyphicon glyphicon-modal-window fa fa-sliders"></span>--}}
    {{--@translate('phoenix.toolbar.batch')--}}
{{--</button>--}}

<button type="button" class="btn btn-default btn-outline-danger btn-sm phoenix-btn-delete" onclick="Phoenix.Grid.hasChecked().deleteList();">
    <span class="glyphicon glyphicon-trash fa fa-trash"></span>
    @translate('phoenix.toolbar.delete')
</button>
