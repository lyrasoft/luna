{{-- Part of earth project. --}}

<div id="module-create-modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">
                    @translate('phoenix.toolbar.create')
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
                                <a class="lead" href="{{ $router->html('module', array('new' => true, 'type' => $module->type)) }}">
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
