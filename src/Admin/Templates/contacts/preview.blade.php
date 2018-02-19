{{-- Part of Admin project. --}}
<?php
/**
 * @var $form \Windwalker\Form\Form
 */
?>

<div class="modal fade" id="preview-modal" tabindex="-1" role="dialog" aria-labelledby="preview-modal-title">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="batch-modal-title">
                    <span class="glyphicon glyphicon-eye-open fa fa-eye"></span>
                    @translate($luna->langPrefix . 'contact.preview.modal.title')
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="preview-table" class="table table-striped" style="display: none">

                </table>
                <div id="preview-loading" style="text-align: center">
                    <img
                        src="{{ $asset->path(\Lyrasoft\Luna\Helper\LunaHelper::getPackage()->getName() . '/images/ring-loading.gif') }}"
                        alt="Loading" style="padding: 100px 0">
                </div>
            </div>
            <div class="modal-footer">
                <a href="#" id="preview-edit-button" class="btn btn-primary">
                    <span class="glyphicon glyphicon-edit fa fa-pencil"></span>
                    @translate($luna->langPrefix . 'contact.button.edit')
                </a>
                <button type="button" class="btn btn-default btn-outline-secondary" data-dismiss="modal">
                    <span class="glyphicon glyphicon-remove fa fa-remove"></span>
                    @translate('phoenix.core.close')
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
