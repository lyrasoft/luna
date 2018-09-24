{{-- Part of earth project. --}}
<?php
/**
 * @var $form Windwalker\Form\Form
 */
$form->setAttributes('labelWidth', 'col-12', 'basic');
$form->setAttributes('fieldWidth', 'col-12', 'basic');
?>

<div class="modal fade" id="options-modal" role="dialog" aria-labelledby="options-modal-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="options-modal-label">
                    @lang('luna.page.modal.basic.title')
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {!! $form->renderFields('basic') !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">
                    <span class="fa fa-check"></span>
                    @lang('luna.page.modal.basic.button.ok')
                </button>
            </div>
        </div>
    </div>
</div>

@push('script')
<script>
    $('#options-modal').on('hide.bs.modal', function (e) {
        var v = $('#admin-form').validation();

        var result = v.validateAll();

        if (!result) {
            e.stopPropagation();
            e.preventDefault();
        }
    });
</script>
@endpush
