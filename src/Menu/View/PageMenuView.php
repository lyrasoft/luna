<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Admin\DataMapper\PageMapper;
use Lyrasoft\Luna\Admin\Field\Page\PageModalField;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Windwalker\Core\Repository\Exception\ValidateFailException;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Form\Form;

/**
 * The PageMenuView class.
 *
 * @since  1.7
 */
class PageMenuView extends AbstractMenuView
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
        return 'page';
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
        $this->add('id', PageModalField::class)
            ->label(__('luna.menu.field.page'));

        $this->text('path')
            ->label(__('luna.menu.field.path'));
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

        if ($variables['id']) {
            $variables['path'] = PageMapper::findOne($variables['id'])->alias;
        }

        if (!$variables['path'] && !$variables['id']) {
            throw new ValidateFailException(__('luna.menu.message.page.id.and.path.require'));
        }
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
        return $router->to('page')->var('path', $variables['path']);
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
        return $this->menuHelper->is('page', ['path' => $variables['path']]);
    }
}
