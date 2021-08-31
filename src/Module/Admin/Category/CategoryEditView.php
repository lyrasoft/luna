<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use Lyrasoft\Luna\Module\Admin\Category\Form\EditForm;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Language\TranslatorTrait;
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
    use TranslatorTrait;

    /**
     * CategoryEditView constructor.
     *
     * @param  ORM                 $orm
     * @param  FormFactory         $formFactory
     * @param  Navigator           $nav
     * @param  CategoryRepository  $repository
     */
    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        #[Autowire] protected CategoryRepository $repository,
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
    public function prepare(AppContext $app, View $view): array
    {
        $type = $app->input('type');
        $id = $app->input('id');

        $item = $this->repository->getItem($id);

        $form = $this->formFactory
            ->create(EditForm::class, type: $type, id: $id)
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->repository->getORM()->extractEntity($item)
            );

        $view->setTitle(
            $this->trans(
                'luna.category.edit.title',
                $this->trans("luna.$type.title")
            )
        );

        return compact('form', 'id', 'item', 'type');
    }
}
