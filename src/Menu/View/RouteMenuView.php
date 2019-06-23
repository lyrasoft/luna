<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Phoenix\Field\RepeatableField;
use Windwalker\Core\Router\CoreRouter;
use Windwalker\Core\Router\MainRouter;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;
use Windwalker\Ioc;

/**
 * The RouteMenuView class.
 *
 * @since  1.7
 */
class RouteMenuView extends AbstractMenuView
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
        return 'route';
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
        $routeField = $this->text('route')
            ->label(__('luna.menu.route.route.name'))
            ->required(true);

        $routes = Ioc::service(MainRouter::class)->getRoutes();

        foreach ($routes as $route) {
            $routeField->option($route->getName());
        }

        $this->add('variables', RepeatableField::class)
            ->label(__('luna.menu.route.variables'))
            ->sortable(true)
            ->ensureFirstRow(true)
            ->configure(function (Form $form) {
                $form->add('key', TextField::class)
                    ->label('Key');

                $form->add('value', TextField::class)
                    ->label('Value');
            });
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
        return $router->to(
            $variables['route'],
            $this->getQuery($variables['variables'])
        )->__toString();
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
        return $this->menuHelper->is($variables['route'], $this->getQuery($variables['variables']));
    }

    /**
     * getQuery
     *
     * @param array $variables
     *
     * @return  array
     *
     * @since  1.7
     */
    protected function getQuery(array $variables): array
    {
        $query = [];

        foreach ($variables as $variable) {
            if (trim($variable['key']) !== '') {
                $query[$variable['key']] = $variable['value'];
            }
        }

        return $query;
    }
}
