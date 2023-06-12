<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 LYRASOFT.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\Module\Admin\Category\Form\EditForm;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Form\FormFactory;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
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
    use LocaleAwareTrait;

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
     * @param  AppContext  $app
     * @param  View        $view
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
            )
            ->fill(
                [
                    'params' => $item?->getParams(),
                ]
            );

        $this->prepareMetadata($app, $view);

        return compact('form', 'id', 'item', 'type');
    }

    /**
     * Prepare Metadata and HTML Frame.
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return  void
     */
    protected function prepareMetadata(AppContext $app, View $view): void
    {
        $type = $app->input('type');

        $langKey = "luna.$type.category.edit.title";
        $appLangKey = "app.$type.category.edit.title";

        if ($this->lang->has($langKey)) {
            $title = $this->trans($langKey);
        } elseif ($this->lang->has($appLangKey)) {
            $title = $this->trans($appLangKey);
        } else {
            $title = $this->trans(
                'luna.category.edit.title',
                title: $this->trans('luna.' . $type . '.title')
            );
        }

        $view->setTitle($title);
    }
}
