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
use Lyrasoft\Luna\Entity\TagMap;
use Lyrasoft\Luna\Field\ArticleModalField;
use Lyrasoft\Luna\Locale\LanguageAssocTrait;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
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
    use LanguageAssocTrait;
    use LocaleAwareTrait;
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

        if ($item) {
            if ($this->isLocaleEnabled()) {
                // Assoc
                $this->defineForm($item->getLanguage(), $form, ArticleModalField::class);
                $this->prepareAssocValues('article', $item->getId(), $form);
            }

            // Tags
            $tagIds = $this->orm->findColumn(
                TagMap::class,
                'tag_id',
                ['type' => 'article', 'target_id' => $item->id]
            )->dump();

            $form->fill(['tags' => $tagIds]);
        }

        $this->prepareMetadata($app, $view);

        return compact('form', 'id', 'item');
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
        $view->getHtmlFrame()
            ->setTitle(
                $this->trans('unicorn.title.edit', title: $this->trans('luna.article.title'))
            );
    }
}
