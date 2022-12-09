<?php

declare(strict_types=1);

namespace App\View;

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

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\DOM\DOMElement;

?>
<div id="{{ $options['html_id'] }}" class="c-addon c-addon--{{ $content['type'] }} {{ implode(' ', $classes) }}"
    uni-page-edit="addon"
    data-path="{{ $path }}"
    data-addon-type="{{ $content['type'] }}"
    {!! DOMElement::buildAttributes($attrs) !!}>
    @if ($options->getDeep('background.type') === 'image' && $options->getDeep('background.overlay'))
        <div class="l-bg-overlay"></div>
    @endif
    <div class="l-bg-content c-addon__body">
        @yield('body', 'Addon Body')
    </div>
</div>
