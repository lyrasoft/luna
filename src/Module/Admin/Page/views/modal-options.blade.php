<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        object          The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
?>

<div class="modal fade" id="options-modal" role="dialog" aria-labelledby="options-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="options-modal-label">
                    @lang('luna.page.modal.basic.title')
                </h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                        <x-fieldset :form="$form" name="basic"></x-fieldset>
                    </div>
                    <div class="col-lg-6">
                        <x-fieldset :form="$form" name="meta"></x-fieldset>
                    </div>
                </div>
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
    var validation;

    System.import('@main').then(function () {
        u.formValidation('#admin-form').then(function (v) {
            validation = v;
        });
    });

    $('#options-modal').on('hide.bs.modal', function (e) {
        var result = validation.validateAll();

        if (!result) {
            e.stopPropagation();
            e.preventDefault();
        }
    });
</script>
@endpush
