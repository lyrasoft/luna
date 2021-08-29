<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Application context.
 * @var $view      ViewModel       The view modal object.
 * @var $uri       SystemUri       System Uri information.
 * @var $chronos   ChronosService  The chronos datetime service.
 * @var $nav       Navigator       Navigator object to build route.
 * @var $asset     AssetService    The Asset manage service.
 * @var $lang      LangService     The language translation service.
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

<button type="button" class="btn btn-success btn-sm phoenix-btn-save"
    onclick="u.form('#admin-form').post();">
    <span class="fa fa-save"></span>
    @lang('phoenix.toolbar.save')
</button>

<button type="button" class="btn  btn-primary btn-sm phoenix-btn-save2close"
    onclick="u.form('#admin-form').post(null, {task: 'save2close'});">
    <span class="fa fa-check"></span>
    @lang('phoenix.toolbar.save2close')
</button>

<a role="button" class="btn btn-default btn-outline-secondary btn-sm"
    href="{{ $nav->to('categories', array('type' => $type)) }}">
    <span class="glyphicon glyphicon-remove fa fa-remove fa-times"></span>
    @lang('phoenix.toolbar.cancel')
</a>
