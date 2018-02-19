{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app      \Windwalker\Web\Application                 Global Application
 * @var  $package  \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var  $view     \Windwalker\Data\Data                       Some information of this view.
 * @var  $uri      \Windwalker\Uri\UriData               Uri information, example: $uri->path
 * @var  $datetime \DateTime                                   PHP DateTime object of current time.
 * @var  $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var  $router   \Windwalker\Core\Router\PackageRouter       Router object.
 *
 * View variables
 * --------------------------------------------------------------
 * @var  $module   \Lyrasoft\Luna\Module\ModuleType
 */
?>

<div id="module-create-modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">
                    @translate('phoenix.toolbar.new')
                </h4>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tbody>
                    @foreach ($modules as $module)
                        <tr>
                            <td width="5%" style="text-align: center; vertical-align: middle;">
                                <span class="{{ $module->icon }}" style="font-size: 2em"></span>
                            </td>
                            <td>
                                <a class="lead"
                                   href="{{ $router->route('module', array('new' => true, 'type' => $module->type)) }}">
                                    {{ $module->name }}
                                </a>
                                <div class="hasTooltip" title="{{ $module->class }}">
                                    {{ $module->description }}
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
