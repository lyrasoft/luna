<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Widget;

use Lyrasoft\Luna\Entity\Widget;
use Lyrasoft\Luna\Module\Admin\Widget\Form\EditForm;
use Lyrasoft\Luna\Repository\WidgetRepository;
use Lyrasoft\Luna\Widget\WidgetService;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

/**
 * The WidgetController class.
 */
#[Controller()]
class WidgetController
{
    public function save(
        AppContext $app,
        CrudController $controller,
        Navigator $nav,
        #[Autowire] WidgetRepository $repository,
        WidgetService $widgetService,
        FormFactory $formFactory,
    ): mixed {
        $controller->prepareSave(
            function (PrepareSaveEvent $event) use ($widgetService, $app) {
                $data = &$event->getData();

                $data['params'] = $app->input('item')['params'] ?? [];
            }
        );

        $item = $app->input('item');
        $widgetInstance = $widgetService->createWidgetInstance(
            $item['type'],
            $app->service(ORM::class)->toEntity(Widget::class, $item)
        );

        $form = $formFactory->create(EditForm::class)
            ->defineFormFields($widgetInstance);

        $uri = $app->call([$controller, 'save'], compact('repository', 'form'));

        switch ($app->input('task')) {
            case 'save2close':
                return $nav->to('widget_list');

            case 'save2new':
                return $nav->to('widget_edit')->var('new', 1);

            case 'save2copy':
                $controller->rememberForClone($app, $repository);
                return $nav->self($nav::WITHOUT_VARS)->var('new', 1);

            default:
                return $uri;
        }
    }

    public function delete(
        AppContext $app,
        #[Autowire] WidgetRepository $repository,
        CrudController $controller
    ): mixed {
        return $app->call([$controller, 'delete'], compact('repository'));
    }

    public function filter(
        AppContext $app,
        #[Autowire] WidgetRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'filter'], compact('repository'));
    }

    public function batch(
        AppContext $app,
        #[Autowire] WidgetRepository $repository,
        GridController $controller
    ): mixed {
        $task = $app->input('task');
        $data = match ($task) {
            'publish' => ['state' => 1],
            'unpublish' => ['state' => 0],
            default => null
        };

        return $app->call([$controller, 'batch'], compact('repository', 'data'));
    }

    public function copy(
        AppContext $app,
        #[Autowire] WidgetRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'copy'], compact('repository'));
    }
}
