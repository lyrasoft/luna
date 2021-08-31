<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use Lyrasoft\Luna\Module\Admin\Category\Form\EditForm;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Controller\NestedSetController;
use Unicorn\Upload\FileUploadManager;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\Event\AfterSaveEvent;

use function Windwalker\collect;

/**
 * The CategoryController class.
 */
#[Controller()]
class CategoryController
{
    public function save(
        AppContext $app,
        #[Autowire] CategoryRepository $repository,
        CrudController $controller,
        Navigator $nav,
        FileUploadManager $fileUploadManager
    ): mixed {
        $form = $app->make(
            EditForm::class,
            [
                'type' => $app->input('type'),
                'id' => $app->input('id'),
            ],
        );

        $controller->afterSave(
            function (AfterSaveEvent $event) use ($repository, $fileUploadManager, $app) {
                $data = collect($app->input('item'));
                $data['id'] = $event->getData()['id'];

                $r = $fileUploadManager->get()
                    ->handleFileIfUploaded(
                        $app->file('item')['image'] ?? null,
                        'images/category/image-' . md5((string) $data['id']) . '.jpg'
                    );

                if ($r) {
                    $data['image'] = (string) $r->getUri(true);
                }

                $repository->save($data);
            }
        );

        $uri = $app->call([$controller, 'save'], compact('repository', 'form'));

        switch ($app->input('task')) {
            case 'save2close':
                return $nav->to('category_list');

            case 'save2new':
                return $nav->to('category_edit')->var('new', 1);

            case 'save2copy':
                $controller->rememberForClone($app, $repository);

                return $nav->self($nav::WITHOUT_VARS)->var('new', 1);

            default:
                return $uri;
        }
    }

    public function delete(
        AppContext $app,
        #[Autowire] CategoryRepository $repository,
        CrudController $controller
    ): mixed {
        return $app->call([$controller, 'delete'], compact('repository'));
    }

    public function filter(
        AppContext $app,
        #[Autowire] CategoryRepository $repository,
        GridController $controller
    ): mixed {
        return $app->call([$controller, 'filter'], compact('repository'));
    }

    public function batch(
        AppContext $app,
        #[Autowire] CategoryRepository $repository,
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

    public function copy(AppContext $app, #[Autowire] CategoryRepository $repository, GridController $controller): mixed
    {
        return $app->call([$controller, 'copy'], compact('repository'));
    }
}
