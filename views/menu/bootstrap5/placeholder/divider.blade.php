<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var  $app       AppContext      Application context.
 * @var  $vm        MenuListView The view model object.
 * @var  $uri       SystemUri       System Uri information.
 * @var  $chronos   ChronosService  The chronos datetime service.
 * @var  $nav       Navigator       Navigator object to build route.
 * @var  $asset     AssetService    The Asset manage service.
 * @var  $lang      LangService     The language translation service.
 */

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuNode;
use Lyrasoft\Luna\Menu\SelfRenderMenuInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;
use Windwalker\DOM\DOMElement;

/**
 * @var $item         MenuNode
 * @var $viewInstance AbstractMenuView|SelfRenderMenuInterface
 */

$attrs = $item->getHTMLAttributes();
$attrs['class'] ??= '';
$attrs['class'] .= ' dropdown-divider';
$attrs['data-level'] = $item->getDepth();
?>
<div {!! DOMElement::buildAttributes($attrs) !!}></div>
