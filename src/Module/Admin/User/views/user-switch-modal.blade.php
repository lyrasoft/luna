<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $vm        object          The view model object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

<div class="modal fade" id="user-switch-modal" tabindex="-1" role="dialog" aria-labelledby="user-switch-modal-label"
    aria-hidden="true"
    uni-user-switch-modal
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="user-switch-modal-label">
                    @lang('luna.user.switch.modal.title'): <span class="font-weight-bold fw-bold" data-role="user_name"></span>
                </h5>
                <button type="button" class="btn-close close" data-dismiss="modal" aria-label="Close">
{{--                    <span aria-hidden="true">&times;</span>--}}
                </button>
            </div>
            <div class="modal-body">
                <div>
                    <p>
                        @lang('luna.user.switch.modal.desc')
                    </p>

                    <div class="row">
                        {{-- Front User --}}
                        <div class="col-md-6 mb-3">
                            <button class="card btn btn-outline-dark w-100 h-100" type="button"
                                data-role="switch_button"
                                data-stage="front"
                                data-options='{}'
                            >
                                <div class="card-body text-center w-100">
                                    <div>
                                        <i class="fa fa-user-lock fa-3x"></i>
                                    </div>
                                    <div class="mt-3">
                                        @lang('luna.user.switch.button.switch.front')
                                    </div>
                                </div>
                            </button>
                        </div>

                        {{-- Front User Keep Access --}}
                        <div class="col-md-6 mb-3">
                            <button class="card btn btn-outline-dark w-100 h-100" type="button"
                                data-role="switch_button"
                                data-stage="front"
                                data-options='{"keepaccess": 1}'
                            >
                                <div class="card-body text-center w-100">
                                    <div>
                                        <i class="fa fa-user-tie fa-3x"></i>
                                    </div>
                                    <div class="mt-3">
                                        @lang('luna.user.switch.button.switch.front.keepaccess')
                                    </div>
                                </div>
                            </button>
                        </div>

                        {{-- Admin User --}}
                        <div class="col-md-6 mb-3">
                            <button class="card btn btn-outline-dark w-100 h-100" type="button"
                                data-role="switch_button"
                                data-stage="admin"
                                data-options='{}'
                            >
                                <div class="card-body text-center w-100">
                                    <div>
                                        <i class="fa fa-user-gear fa-3x"></i>
                                    </div>
                                    <div class="mt-3">
                                        @lang('luna.user.switch.button.switch.admin')
                                    </div>
                                </div>
                            </button>
                        </div>

                        {{-- Admin User Keep Access --}}
                        <div class="col-md-6 mb-3">
                            <button class="card btn btn-outline-dark w-100 h-100" type="button"
                                data-role="switch_button"
                                data-stage="admin"
                                data-options='{"keepaccess": 1}'
                            >
                                <div class="card-body text-center w-100">
                                    <div>
                                        <i class="fa fa-user-tie fa-3x"></i>
                                    </div>
                                    <div class="mt-3">
                                        @lang('luna.user.switch.button.switch.admin.keepaccess')
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <input data-role="user_id" type="hidden" value="" />
                </div>
            </div>
        </div>
    </div>
</div>
