<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use Lyrasoft\Luna\Attributes\LangAssoc;
use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Module\Admin\Category\Form\EditForm;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Controller\NestedSetController;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Unicorn\Upload\FileUploadManager;
use Unicorn\Upload\FileUploadService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Core\Attributes\JsonApi;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\DI\Attributes\Service;
use Windwalker\ORM\Event\AfterSaveEvent;
use Windwalker\ORM\ORM;
use Windwalker\Query\Query;

/**
 * The CategoryController class.
 */
#[Controller()]
class CategoryController
{
    #[LangAssoc]
    public function save(
        AppContext $app,
        #[Autowire] CategoryRepository $repository,
        CrudController $controller,
        Navigator $nav,
        #[Service(FileUploadManager::class, 'image')]
        FileUploadService $fileUploadService
    ): mixed {
        $form = $app->make(
            EditForm::class,
            [
                'type' => $app->input('type'),
                'id' => $app->input('id'),
            ],
        );

        $controller->prepareSave(
            function (PrepareSaveEvent $event) use ($app) {
                $data = &$event->getData();

                $data['type'] = $app->input('type');
            }
        );

        $controller->afterSave(
            function (AfterSaveEvent $event) use ($repository, $fileUploadService, $app) {
                $data = $event->getData();

                $data['image'] = $fileUploadService->handleFileIfUploaded(
                    $app->file('item')['image'] ?? null,
                    'images/category/cover-' . md5((string) $data['id']) . '.jpg'
                )?->getUri(true) ?? $data['image'];

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

    #[JsonApi]
    public function ajaxList(AppContext $app, ORM $orm): array
    {
        $type = $app->input('type');
        $self = $app->input('self');
        $value = $app->input('value') ?? 1;

        if ($value <= 0) {
            $value = 1;
        }

        $query = $orm->from(Category::class)
            ->where('type', $type)
            ->where('parent_id', (int) $value)
            ->tapIf(
                (bool) $self,
                fn(Query $query) => $query->where('id', '!=', $self)
            )
            ->order('lft', 'ASC')
            ->groupByJoins();

        $items = [];

        /** @var Category $item */
        foreach ($query->getIterator(Category::class) as $item) {
            $items[] = [
                'title' => $item->getTitle(),
                'id' => $item->getId(),
            ];
        }

        return $items;
    }

    #[JsonApi]
    public function tree(string $type, ORM $orm): array
    {
        return TreeBuilder::create(
            $orm->from(Category::class)
                ->where('type', $type)
                ->order('lft', 'ASC')
                ->all()
        )
            ->getChildren();
    }
}
