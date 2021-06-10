<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Controller\Menu;

use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Lyrasoft\Luna\Menu\MenuNode;
use Lyrasoft\Luna\Menu\MenuService;
use Windwalker\Legacy\Core\Controller\AbstractController;
use Windwalker\Legacy\DI\Annotation\Inject;
use Windwalker\Legacy\Http\Exception\HttpRequestException;
use Windwalker\Legacy\Router\Exception\RouteNotFoundException;

/**
 * The MenuRedirectController class.
 *
 * @since  1.7.6
 */
class MenuRedirectController extends AbstractController
{
    /**
     * Property menuService.
     *
     * @Inject()
     *
     * @var MenuService
     */
    protected $menuService;

    /**
     * The main execution process.
     *
     * @return  mixed
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     */
    protected function doExecute()
    {
        $id = $this->input->get('id');

        if (!$id) {
            throw new HttpRequestException('No Menu ID');
        }

        /** @var MenuRecord $menu */
        $menu = MenuMapper::findOne($id);

        if ($menu->isNull()) {
            throw new RouteNotFoundException('Menu not found');
        }

        $viewInstance = $this->menuService->getViewInstance($menu->view);

        if (!$viewInstance) {
            throw new \DomainException(sprintf('Menu view: %s not found', $menu->view));
        }

        $route = $viewInstance->route($this->router, (array) $menu->variables, (array) $menu->params);

        $this->redirect($route, 303, true);

        return true;
    }
}
