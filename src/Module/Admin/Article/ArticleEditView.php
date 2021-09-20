<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Article;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Module\Admin\Article\Form\EditForm;
use Lyrasoft\Luna\Repository\ArticleRepository;
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
 * The ContentEditView class.
 */
#[ViewModel(
    layout: 'article-edit',
    js: 'article-edit.js'
)]
class ArticleEditView implements ViewModelInterface
{
    use TranslatorTrait;

    public function __construct(
        protected ORM $orm,
        protected FormFactory $formFactory,
        protected Navigator $nav,
        #[Autowire] protected ArticleRepository $repository
    ) {
    }

    /**
     * Prepare
     *
     * @param  AppContext  $app
     * @param  View        $view
     *
     * @return  mixed
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $type = $app->input('type');
        $id = $app->input('id');

        /** @var Article $item */
        $item = $this->repository->getItem(compact('id'));

        if ($type && $item->getType() !== $type) {
            return $this->nav->self()->var('type', $item->getType());
        }

        $form = $this->formFactory
            ->create(EditForm::class, type: $type ?? 'article')
            ->setNamespace('item')
            ->fill(
                $this->repository->getState()->getAndForget('edit.data')
                    ?: $this->orm->extractEntity($item)
            );

        // Browser Title
        $view->setTitle($this->trans('luna.article.edit.title'));

        return compact('form', 'id', 'item');
    }
}
