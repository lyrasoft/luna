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
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="user-switch-modal-label">
                    @lang('luna.user.switch.modal.title')
                </h4>
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
                        <div class="col-md-6">
                            <button class="card btn btn-outline-dark" type="button"
                                onclick="u.form().post('{{ $nav->to('user_switch')->var('stage', 'front') }}')">
                                <div class="card-body text-center">
                                    <div>
                                        <i class="fa-solid fa-user-tie fa-3x"></i>
                                    </div>
                                    <div class="mt-3">
                                        @lang('luna.user.switch.button.switch.front')
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="col-md-6">

                        </div>

                        <div class="col-md-6">

                        </div>

                        <div class="col-md-6">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
