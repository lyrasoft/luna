<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\LayoutRenderedMenuInterface;
use Lyrasoft\Luna\Menu\SelfRenderMenuInterface;
use Lyrasoft\Luna\Menu\SelfRenderMenuTrait;
use Windwalker\Legacy\Core\Router\RouteBuilderInterface;
use Windwalker\Legacy\Form\Form;

/**
 * The PlaceholderMenuView class.
 *
 * @since  1.7
 */
class PlaceholderMenuView extends AbstractMenuView implements LayoutRenderedMenuInterface
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
        return 'placeholder';
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
        $this->list('type')
            ->label(__('luna.menu.placeholder.type'))
            ->class('has-select2')
            ->option(__('luna.menu.placeholder.type.link'), 'link')
            ->option(__('luna.menu.placeholder.type.divider'), 'divider')
            ->option(__('luna.menu.placeholder.type.header'), 'header')
            ->option(__('luna.menu.placeholder.type.text'), 'text');

        $this->list('url')
            ->label(__('luna.menu.field.placeholder'))
            ->option('#', '#')
            ->option('javascript://', 'javascript://')
            ->option(__('luna.menu.field.url.no.link'), static::NO_LINK)
            ->class('has-select2')
            ->set('showon', ['variables.type' => 'link'])
            ->defaultValue(static::NO_LINK);

        $this->text('header')
            ->label(__('luna.menu.placeholder.text'))
            ->set('showon', ['variables.type' => 'header']);

        $this->textarea('text')
            ->label(__('luna.menu.placeholder.text'))
            ->rows(5)
            ->set('showon', ['variables.type' => 'text']);
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
        //
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
     * @since  1.7
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
     * @since  1.7
     */
    public function isActive(array $variables, array $params): bool
    {
        return false;
    }

    /**
     * getLayout
     *
     * @param array $variables
     * @param array $params
     *
     * @return  string
     *
     * @since  1.7
     */
    public function getLayout(): string
    {
        return 'luna.menu.placeholder.placeholder';
    }
}
