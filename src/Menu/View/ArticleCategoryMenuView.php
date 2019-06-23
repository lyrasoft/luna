<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\Field\Category\CategoryModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Form\Form;

/**
 * The ArticleCategoryMenuView class.
 *
 * @since  1.7
 */
class ArticleCategoryMenuView extends AbstractMenuView
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
        return 'article_category';
    }

    /**
     * getGroup
     *
     * @return  string
     *
     * @since  1.7
     */
    public static function getGroup(): string
    {
        return 'article';
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
        $this->add('id', CategoryModalField::class)
            ->label(__('luna.category.title'))
            ->required(true);
    }

    /**
     * defineParams
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
     * route
     *
     * @param RouteBuilderInterface $router
     * @param array                 $variables
     *
     * @param array                 $params
     *
     * @return  string
     *
     * @since  1.7
     */
    public function route(RouteBuilderInterface $router, array $variables, array $params): string
    {
        return $router->to('article_category')
            ->var('path', $variables['path'])
            ->__toString();
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
        if ($variables['id']) {
            $variables['path'] = (string) CategoryMapper::findOne($variables['id'])->path;
        }
    }

    /**
     * isActive
     *
     * @param array $variables
     *
     * @param array $params
     *
     * @return  bool
     *
     * @since  1.7
     */
    public function isActive(array $variables, array $params): bool
    {
        return $this->menuHelper->is('article_category', ['path' => $variables['path']]);
    }
}
