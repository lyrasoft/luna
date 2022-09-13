<?php

declare(strict_types=1);

/**
 * @var $app     AppContext
 * @var $attrs   array
 * @var $options array
 */

use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Core\Application\AppContext;

$app->service(LunaScript::class)->captcha();

$route = $options['route'] ?? null;

$inputClass = 'c-gregwar-captcha__input';
$attrs['class'] = isset($attrs['class']) ? $attrs['class'] .= ' ' . $inputClass : $inputClass;
$attrs['data-captcha-input'] = true;
?>
<div id="{{ $attrs['id'] }}-wrapper"
    class="c-gregwar-captcha d-flex justify-content-center flex-wrap flex-md-nowrap"
    uni-captcha-gregwar
>
    <div class="mt-3 mt-md-0 flex-grow-1 me-2">
        <input {!! \Windwalker\DOM\DOMElement::buildAttributes($attrs) !!} />
    </div>
    <img class="c-gregwar-captcha__image"
        src="{{ $route ?: $nav->to('_captcha_image', ['t' => time(), 'profile' => $options['profile']]) }}"
        alt="Captcha"
        data-captcha-image data-image="{{ $route ?: $nav->to('_captcha_image', ['profile' => $options['profile']]) }}">
    <button type="button" class="btn btn-link c-gregwar-captcha__button text-nowrap" data-captcha-refresh>
        <span class="fa fa-sync c-gregwar-captcha__refresh-icon" data-refresh-icon></span>
        @lang('luna.captcha.gregwar.button.refresh')
    </button>
</div>
