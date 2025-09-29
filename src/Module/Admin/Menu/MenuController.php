<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Menu;

use Lyrasoft\Luna\Module\Admin\Menu\Form\EditForm;
use Lyrasoft\Luna\Repository\MenuRepository;
use Lyrasoft\Luna\Services\MenuService;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Controller\NestedSetController;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;

/**
 * The MenuController class.
 */
#[Controller()]
class MenuController
{
    public function save(
        AppContext $app,
        CrudController $controller,
        Navigator $nav,
        MenuService $menuService,
        #[Autowire] MenuRepository $repository,
    ): mixed {
        // Switch type/view
        switch ($app->input('task')) {
            case 'switch_type':
                $repository->getState()->remember('edit.data', $app->input('item'));

                return $nav->back()->var('type', $app->input('type'));

            case 'switch_view':
                $repository->getState()->remember('edit.data', $app->input('item'));

                return $nav->back();
        }

        // Form
        [$id, $type] = $app->input('id', 'type')->values()->dump();

        $form = $app->make(EditForm::class, compact('id', 'type'));

        // Prepare
        $controller->prepareSave(
            function (PrepareSaveEvent $event) use ($app, $menuService) {
                $data = &$event->data;
                $data['variables'] = $app->input('item')['variables'] ?? [];

                $view = $data['view'] ?? null;

                if ($view) {
                    $viewInstance = $menuService->getViewInstance($view);

                    $viewInstance?->prepareVariablesStore($data['variables']);
                }
            }
        );

        // Save
        $uri = $app->call([$controller, 'save'], compact('repository', 'form'));

        switch ($app->input('task')) {
            case 'save2close':
                return $nav->to('menu_list');

            case 'save2new':
                return $nav->to('menu_edit')->var('new', 1);

            case 'save2copy':
                $controller->rememberForClone($app, $repository);

                return $nav->self($nav::WITHOUT_VARS)->var('new', 1);

            default:
                return $uri;
        }
    }

    public function delete(
        AppContext $app,
        #[Autowire] MenuRepository $repository,
        CrudController $controller
    ): mixed {
        return $app->call([$controller, 'delete'], compact('repository'));
    }

    public function filter(
        AppContext $app,
        #[Autowire] MenuRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'filter'], compact('repository'));
    }

    public function batch(
        AppContext $app,
        #[Autowire] MenuRepository $repository,
        GridController $controller
    ): mixed {
        $task = $app->input('task');

        if ($task === 'rebuild') {
            return $app->call(
                [$app->make(NestedSetController::class), 'rebuild'],
                compact('repository')
            );
        }

        $data = match ($task) {
            'publish' => ['state' => 1],
            'unpublish' => ['state' => 0],
            default => null
        };

        return $app->call([$controller, 'batch'], compact('repository', 'data'));
    }

    public function copy(
        AppContext $app,
        #[Autowire] MenuRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'copy'], compact('repository'));
    }
}
