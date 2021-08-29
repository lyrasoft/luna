<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use App\Attributes\SaveCloseTo;
use App\DataMapper\CategoryProductMapper;
use App\Datavideo\Language\LanguageService;
use Lyrasoft\Luna\Module\Admin\Category\Form\EditForm;
use App\Services\CategoryService;
use App\Services\MVCService;
use App\Traits\AliasHandleTrait;
use Unicorn\Controller\CrudController;
use Unicorn\Controller\GridController;
use Unicorn\Controller\NestedSetController;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Unicorn\Upload\FileUploadManager;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\Legacy\Data\Data;
use Windwalker\ORM\Event\AfterSaveEvent;
use Windwalker\ORM\Event\BeforeSaveEvent;

use function Windwalker\collect;

/**
 * The CategoryController class.
 */
#[Controller()]
class CategoryController
{
    #[SaveCloseTo(CategoryListView::class)]
    public function save(
        AppContext $app,
        #[Autowire] CategoryRepository $repository,
        #[Autowire] EditForm $form,
        CrudController $controller,
        FileUploadManager $fileUploadManager
    ): mixed {
        $controller->beforeSave(
            function (BeforeSaveEvent $event) use ($app) {
                $data = collect($app->input('item'));

                if ($data->type === CategoryService::TYPE_PRODUCT && $data->related_products) {
                    //save related products
                    CategoryProductMapper::delete(['category_id' => $data->id]);

                    foreach ($data->related_products as $product) {
                        $related = new Data();

                        $related->category_id = $data->id;
                        $related->product_id  = $product;

                        CategoryProductMapper::createOne($related);
                    }
                }
            }
        );

        $controller->afterSave(
            function (AfterSaveEvent $event) use ($repository, $fileUploadManager, $app) {
                $data = collect($app->input('item'));
                $data['id'] = $event->getData()['id'];

                // Dividers
                if ($app->input('code') !== 'global') {
                    $data['dividers'] = collect(json_decode($data['dividers'], true))
                        ->map(fn ($d) => $d['content'] ?? [])
                        ->collapse(true)
                        ->dump();
                }

                //save language
                LanguageService::saveLang($data, MVCService::getShortName($this));

                $r = $fileUploadManager->get()
                    ->handleFileIfUploaded(
                        $app->file('item')['image'] ?? null,
                        'images/category/image-' . md5((string) $data['id']) . '.jpg'
                    );

                if ($r) {
                    $data['image'] = (string) $r->getUri();
                }

                $r = $fileUploadManager->get()
                    ->handleFileIfUploaded(
                        $app->file('item')['background'] ?? null,
                        'images/category/background-' . md5((string) $data['id']) . '.jpg'
                    );

                if ($r) {
                    $data['background'] = (string) $r->getUri();
                }

                $repository->save($data);
            }
        );

        return $app->call([$controller, 'save'], compact('repository', 'form'));
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
