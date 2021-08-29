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

$asset->css('@vue2-animate');
$uniScript = $app->service(\Unicorn\Script\UnicornScript::class);
$vueScript = $app->service(\Unicorn\Script\VueScript::class);

$vueScript->vue(2);
$asset->js('@sortablejs');
$asset->js('@vuedraggable');

$isGlobal = $currentRegion->region_code === 'global';

$currentDividers = json_decode((string) $item->dividers, true) ?: [];
$currentDividers = \Windwalker\Utilities\Arr::collapse($currentDividers, true);

$dividers = $globalDividers;

foreach ($dividers as $k => $divider) {
    foreach ($divider['content'] ?? [] as $key => $title) {
        $divider['content'][$key] = [
            'title' => $currentDividers[$key] ?? $title,
            'origin' => $title
        ];
    }

    $dividers[$k] = $divider;
}

$uniScript->data('dividers', $dividers);
$uniScript->data('is.global', $isGlobal);
?>

<div id="dividers-app">
    <table class="table table-striped">
        <thead>
        <tr>
            <th v-if="isGlobal" style="width: 1%">#</th>
            <th>
                Title
            </th>
            <th class="text-right">
                <button type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="addItem(0)"
                    :disabled="!isGlobal"
                >
                    <i class="fa fa-plus"></i>
                </button>
            </th>
        </tr>
        </thead>
        <tbody v-model="items" group="title" handle=".c-handle"
            is="draggable"
            element="tbody"
            draggable=".drag-item">
            <transition-group name="fade">
                <tr
                    v-for="(item, i) in items" style="animation-duration: .3s"
                    :key="item.uid"
                    class="drag-item"
                >
                    <td v-if="isGlobal">
                        <i class="c-handle fa-solid fa-fw fa-ellipsis-vertical"
                            style="cursor: move"
                        ></i>
                    </td>
                    <td colspan="2">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1 mr-3">
                                <input type="text"
                                    class="form-control"
                                    placeholder="Title"
                                    v-model="item.title"
                                    :disabled="!isGlobal"
                                />
                            </div>
                            <div>
                                <button type="button" class="btn btn-sm btn-outline-secondary"
                                    :disabled="!isGlobal"
                                    @click="addItem(i + 1)">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-secondary"
                                    :disabled="!isGlobal"
                                    @click="items.splice(i, 1)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="pl-4 w-75">
                            <draggable v-model="item.content" group="sub" handle=".c-sub-handle">
                                <transition-group name="fade">
                                    <div v-for="(cnt, k) of item.content" :key="cnt.uid" class="my-2 d-flex"
                                        style="animation-duration: .3s"
                                    >
                                        <div v-if="isGlobal">
                                            <i class="c-sub-handle fa-solid fa-fw fa-ellipsis-vertical"
                                                style="cursor: move"
                                            ></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <input
                                                class="form-control form-control-sm"
                                                v-model="cnt.content"
                                                :placeholder="cnt.origin"
                                            />
                                        </div>
                                        <div>
                                            <button type="button" class="btn btn-sm btn-link"
                                                :disabled="!isGlobal"
                                                @click="addSubItem(item.content, k + 1)">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                            <button type="button" class="btn btn-sm btn-link"
                                                :disabled="!isGlobal"
                                                @click="deleteSubItem(item.content, k)">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                    </td>
                </tr>
            </transition-group>
        </tbody>
    </table>

    <textarea class="d-none" name="item[dividers]">@{{ value }}</textarea>
</div>
