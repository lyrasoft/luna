<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Admin\Field\Menu\MenuModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuNode;
use Lyrasoft\Luna\Menu\MenuService;
use Windwalker\Legacy\Core\Router\RouteBuilderInterface;
use Windwalker\Legacy\Form\Form;
use Windwalker\Legacy\Ioc;

/**
 * The AliasMenuView class.
 *
 * @since  1.7
 */
class AliasMenuView extends AbstractMenuView
{
    /**
     * getName
     *
     * @return  string
     *
     * @since  1.7
     */
    public static function getName(): string
    {
        return 'menu_alias';
    }

    /**
     * defineRoute
     *
     * @param Form $form
     *
     * @return  void
     *
     * @since  1.7
     */
    protected function defineVariables(Form $form): void
    {
        $this->add('target', MenuModalField::class)
            ->label(__('luna.menu.alias.target'));
    }

    /**
     * You must use tab('name', function () { ... }) to wrap your fields.
     *
     * @param Form $form
     *
     * @return  void
     *
     * @since  1.7
     */
    protected function defineParams(Form $form): void
    {
    }

    /**
     * prepareVariablesStore
     *
     * @param array $variables
     *
     * @return  void
     *
     * @since  1.7
     */
    public function prepareVariablesStore(array &$variables): void
    {
        parent::prepareVariablesStore($variables);

        $target = $variables['target'];
        $variables['type'] = MenuMapper::select('type')->findResult($target);
    }

    /**
     * route
     *
     * @param RouteBuilderInterface $router
     * @param array                 $variables
     * @param array                 $params
     *
     * @return  string
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     * @since  1.7
     */
    public function route(RouteBuilderInterface $router, array $variables, array $params): string
    {
        $menu = $this->findTarget($variables, $params);

        if (!$menu) {
            return '#';
        }

        return $menu->route($router);
    }

    /**
     * isActive
     *
     * @param array $variables
     * @param array $params
     *
     * @return  bool
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     * @since  1.7
     */
    public function isActive(array $variables, array $params): bool
    {
        $menu = $this->findTarget($variables, $params);

        if (!$menu) {
            return false;
        }

        return $menu->isActive(true);
    }

    /**
     * findTarget
     *
     * @param array $variables
     * @param array $params
     *
     * @return  MenuNode|null
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\Legacy\DI\Exception\DependencyResolutionException
     *
     * @since  1.7
     */
    protected function findTarget(array $variables, array $params): ?MenuNode
    {
        $menuId = $variables['target'] ?? 0;

        $menuService = Ioc::service(MenuService::class);

        $menus = $menuService->getMenusTree($variables['type'] ?? '');

        return $menus->getMenuById($menuId);
    }
}
