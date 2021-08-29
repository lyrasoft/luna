<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use App\DataMapper\CategoryProductMapper;
use App\Datavideo\Region\RegionService;
use App\Entity\Category;
use App\Entity\CategoryLang;
use Lyrasoft\Luna\Module\Admin\Category\Form\EditForm;
use App\Region\RegionEditTrait;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\ORM\ORM;

/**
 * The CategoryEditView class.
 */
#[ViewModel(
    layout: 'category-edit',
    js: 'category-edit.js'
)]
class CategoryEditView implements ViewModelInterface
{
    use \App\Region\RegionEditTrait;
    use RegionEditTrait;

    /**
     * CategoryEditView constructor.
     *
     * @param    ORM          $orm
     * @param    FormFactory  $formFactory
     * @param    Navigator    $nav
     */
    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        #[Autowire] protected CategoryRepository $repository,
        #[Autowire] protected RegionService $regionService
    ) {
    }

    /**
     * Prepare
     *
     * @param    AppContext  $app
     * @param    View        $view
     *
     * @return    mixed
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $type = $app->input('type');
        $id = $app->input('id');

        $item = $this->orm->findOne(Category::class, $id);

        /** @var Collection $item */
        ['item' => $item] = $regionData = $this->prepareRegionEdit($item);

        $item->related_products = CategoryProductMapper::find(['category_id' => $item->id])->product_id;
        
        $globalDividers = [];
        
        if ($item?->id) {
            $lang = $this->orm->findOne(
                CategoryLang::class,
                ['category_id' => $item->id, 'region_id' => 1]
            );
            
            $globalDividers = $lang->getDividers();
        }

        $form = $this->formFactory
            ->create(EditForm::class)
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->orm->extractEntity($item)
            );

        return array_merge(
            $regionData,
            compact('form', 'id', 'item', 'type', 'globalDividers')
        );
    }
}
