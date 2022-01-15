<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $view      ViewModel       The view modal object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

declare(strict_types=1);

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;

?>

<div class="row l-config-core">
    <div class="col-lg-7">
        <x-fieldset :form="$form" name="basic" title="Basic" is="card">

        </x-fieldset>
    </div>

    <div class="col-lg-5">
        @if (count(iterator_to_array($form->getFields('advanced'))))
            <x-fieldset :form="$form" name="advanced" title="Advanced" is="card">

            </x-fieldset>
        @endif
    </div>
</div>
