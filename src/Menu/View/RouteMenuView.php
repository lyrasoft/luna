<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Psr\Http\Message\UriInterface;
use Unicorn\Field\RepeatableField;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\Router;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\Form;

/**
 * The RouteMenuView class.
 */
class RouteMenuView extends AbstractMenuView
{
    use TranslatorTrait;

    public function __construct(protected Router $router)
    {
    }

    /**
     * @inheritDoc
     */
    public static function getName(): string
    {
        return 'route';
    }

    /**
     * @inheritDoc
     */
    protected function defineVariablesForm(Form $form): void
    {
        /** @var Form $form */
        $form->add('route', TextField::class)
            ->label($this->trans('luna.menu.route.route.name'))
            ->register(
                function (TextField $field) {
                    $routes = $this->router->getRoutes();

                    foreach ($routes as $route) {
                        $field->option($route->getName(), $route->getName(), [], $route->getExtraValue('namespace'));
                    }
                }
            );

        $form->add('variables', RepeatableField::class)
            ->label($this->trans('luna.menu.route.variables'))
            ->sortable(true)
            ->singleArray(true)
            ->configureForm(
                function (Form $form) {
                    $form->add('key', TextField::class)
                        ->label('Key')
                        ->set('subfield_width', '30%');

                    $form->add('value', TextField::class)
                        ->label('Value');
                }
            );
    }

    /**
     * @inheritDoc
     */
    protected function defineParamsForm(Form $form): void
    {
    }

    /**
     * @inheritDoc
     */
    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        return $nav->to(
            $variables['route'],
            $variables['variables'] ?? []
        );
    }

    /**
     * @inheritDoc
     */
    public function isActive(array $variables, array $params): bool
    {
        return $this->menuHelper->is($variables['route'], $variables['variables'] ?? []);
    }
}
