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

use Lyrasoft\Luna\User\UserEntityInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Core\Security\CsrfService;

/**
 * @var UserEntityInterface $user
 * @var bool                $keepaccess
 */

$csrf = $app->service(CsrfService::class);

if ($nav->has('user_switch_recover')) {
    $link = $nav->to('user_switch_recover');
} else {
    $link = $nav->to('user_list')->task('recover');
}

?>

<div class="alert alert-warning alert-dismissible fade show">

    <div class="d-flex align-items-center justify-content-between">
        <div>
            @if ($keepaccess)
                @lang('luna.user.message.switched.keepaccess.desc', $user->name)
            @else
                @lang('luna.user.message.switched.desc', $user->name)
            @endif
        </div>
        <div>
            <button type="button" class="btn btn-warning btn-sm"
                onclick="u.form().patch('{{ $link }}', { anticsrf: '{{ $csrf->getToken() }}' })"
            >
                @lang('luna.user.switch.recover.button')
            </button>
        </div>
    </div>

    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
