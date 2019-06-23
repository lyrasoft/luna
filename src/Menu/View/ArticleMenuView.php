<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Admin\DataMapper\ArticleMapper;
use Lyrasoft\Luna\Admin\Field\Article\ArticleModalField;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Core\Router\RouteString;
use Windwalker\Form\Form;

/**
 * The ArticleMenuView class.
 *
 * @since  __DEPLOY_VERSION__
 */
class ArticleMenuView extends AbstractMenuView
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
        return 'article';
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
        $this->add('id', ArticleModalField::class)
            ->label(__('luna.article.title'))
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
        //
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
        return $router->to('article', $variables);
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
            $variables['alias'] = (string) ArticleMapper::findOne($variables['id'])->alias;
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
        return $this->menuHelper->is('article', ['id' => $variables['id']]);
    }
}
