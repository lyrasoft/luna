<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\Field\Article\ArticleModalField;
use Lyrasoft\Luna\Admin\Field\Category\CategoryModalField;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Form\Form;

/**
 * The ArticleCategoryMenuView class.
 *
 * @since  __DEPLOY_VERSION__
 */
class ArticleCategoryMenuView extends AbstractMenuView
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
        return 'article_category';
    }

    /**
     * getGroup
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    protected function defineView(Form $form): void
    {
        $this->add('id', CategoryModalField::class)
            ->label('Category')
            ->required(true);
    }

    /**
     * defineParams
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
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function route(RouteBuilderInterface $router, array $variables): string
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
     * @since  __DEPLOY_VERSION__
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
     * @return  bool
     *
     * @since  __DEPLOY_VERSION__
     */
    public function isActive(array $variables): bool
    {
        return $this->menuHelper->is('article_category', ['path' => $variables['path']]);
    }
}
