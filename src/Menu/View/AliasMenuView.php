<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Admin\Field\Menu\MenuModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuNode;
use Lyrasoft\Luna\Menu\MenuService;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Form\Form;
use Windwalker\Ioc;

/**
 * The AliasMenuView class.
 *
 * @since  __DEPLOY_VERSION__
 */
class AliasMenuView extends AbstractMenuView
{
    /**
     * getName
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  __DEPLOY_VERSION__
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
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  __DEPLOY_VERSION__
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
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function findTarget(array $variables, array $params): ?MenuNode
    {
        $menuId = $variables['target'];

        $menuService = Ioc::service(MenuService::class);

        $menus = $menuService->getMenusTree($variables['type']);

        return $menus->getMenuById($menuId);
    }
}
