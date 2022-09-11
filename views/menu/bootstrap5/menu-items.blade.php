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

use Lyrasoft\Luna\Menu\LayoutRenderedMenuInterface;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use Lyrasoft\Luna\Menu\Tree\MenuNode;
use Lyrasoft\Luna\Menu\Tree\MenuNodeInterface;
use Unicorn\Script\BootstrapScript;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\SystemUri;
use Lyrasoft\Luna\Module\Admin\Menu\MenuListView;

$click = $click ?? false;
$dropdown = $dropdown ?? false;
$level = (int) ($level ?? 1);

if ($dropdown) {
    $app->service(BootstrapScript::class)->multiLevelMenu();
}

/**
 * @var MenuNodeInterface          $parent
 * @var MenuNodeInterface|MenuNode $item
 */
?>

@foreach ($parent->getChildren() as $item)
    @if ($item->isHidden())
        @continue
    @endif

    @if ($item instanceof DbMenuNode && $item->getViewInstance() instanceof LayoutRenderedMenuInterface)
        @include($item->getViewInstance()->getLayout())
    @else
        @include('@menu::link.link')
    @endif
@endforeach
