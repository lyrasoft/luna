<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $view      PageEditView  The view modal object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Lyrasoft\Luna\Module\Admin\Page\PageEditView;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

$pageService = $app->service(\Lyrasoft\Luna\PageBuilder\PageService::class);

?>

<div x-id="toolbar" x-data="{ form: $store.form }">
    <button type="button" class="btn btn-success btn-sm"
        data-task="save"
        style="width: 150px"
    >
        <span data-spinner class="fa fa-save"></span>
        @lang('unicorn.toolbar.save')
    </button>

    <button type="button" class="btn btn-info btn-sm luna-button-options"
        data-bs-toggle="modal"
        data-bs-target="#options-modal"
    >
        <span class="fa fa-cog"></span>
        @lang('luna.page.button.options')
    </button>

    @if ($item ?? null)
        <a href="{{ $nav->to('front::page', ['path' => $item->getAlias(), 'preview' => $pageService->genPreviewSecret($item->getId())]) }}"
            target="_blank"
            class="btn btn-sm btn-outline-primary">
            <span class="fa fa-eye"></span>
            @lang('luna.page.button.preview')
        </a>
    @endif

    <a class="btn btn-default btn-outline-secondary btn-sm"
        href="{{ $nav->to('page_list') }}">
        <span class="glyphicon glyphicon-remove fa fa-remove fa-times"></span>
        @lang('unicorn.toolbar.cancel')
    </a>
</div>
