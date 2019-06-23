<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Form\Form;

/**
 * The LinkMenuView class.
 *
 * @since  __DEPLOY_VERSION__
 */
class LinkMenuView extends AbstractMenuView
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
        return 'link';
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
        $this->url('url')
            ->label(__('luna.menu.field.url'))
            ->required(true);
    }

    /**
     * You must use tab('name', funcstion () { ... }) to wrap your fields.
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
     * route
     *
     * @param RouteBuilderInterface $router
     * @param array                 $variables
     * @param array                 $params
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function route(RouteBuilderInterface $router, array $variables, array $params): string
    {
        return $variables['url'];
    }

    /**
     * isActive
     *
     * @param array $variables
     * @param array $params
     *
     * @return  bool
     *
     * @since  __DEPLOY_VERSION__
     */
    public function isActive(array $variables, array $params): bool
    {
        return false;
    }
}
