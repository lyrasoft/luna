<?php

declare(strict_types=1);

namespace App\View;

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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$widgetService = $app->service(\Lyrasoft\Luna\Widget\WidgetService::class);

$types = $widgetService->getWidgetTypes();

/**
 * @var \Lyrasoft\Luna\Widget\AbstractWidget $typeClass
 */
?>

<div class="modal fade" id="create-modal" tabindex="-1" role="dialog" aria-labelledby="create-modal-label"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="create-modal-label">
                    @lang('luna.widget.create.modal.title')
                </h4>
                <button type="button" class="close btn-close" data-bs-dismiss="modal" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true" class="visually-hidden">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0">
                <div class="list-group">
                    @foreach ($types as $type => $typeClass)
                        <a class="list-group-item list-group-item-action d-flex"
                            href="{{ $nav->to('widget_edit')->var('new', 1)->var('type', $type) }}">
                            <div class="p-2 me-2">
                                <i class="{{ $typeClass::getTypeIcon() }} fa-2x"></i>
                            </div>
                            <div>
                                <h4>
                                    {{ $typeClass::getTypeTitle($lang) }}
                                </h4>
                                <div class="small text-muted">
                                    {!! $typeClass::getTypeDescription($lang) !!}
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
