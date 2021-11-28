<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Article;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Module\Front\Category\CategoryViewTrait;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;

use function Windwalker\str;

/**
 * The ArticleItemView class.
 */
#[ViewModel(
    layout: 'article-item',
    js: 'article-item.js'
)]
class ArticleItemView implements ViewModelInterface
{
    use CategoryViewTrait;

    /**
     * Constructor.
     */
    public function __construct(
        #[Autowire]
        protected ArticleRepository $repository,
        #[Autowire]
        protected Navigator $nav
    ) {
        //
    }

    /**
     * Prepare View.
     *
     * @param  AppContext  $app   The web app context.
     * @param  View        $view  The view object.
     *
     * @return  mixed
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $id = $app->input('id');
        $alias = $app->input('alias');

        /** @var Article $item */
        $item = $this->repository->mustGetItem($id);

        if (!$item->getState()->isPublished()) {
            throw new RouteNotFoundException('Article not found.');
        }

        /** @var Category $category */
        $category = $this->getCategoryOrFail($item->getCategoryId());

        if (!$category->getState()->isPublished()) {
            throw new RouteNotFoundException('Category not published.');
        }

        // Keep URL unique
        if ($item->getAlias() !== $alias) {
            return $this->nav->self()->alias($item->getAlias());
        }

        $this->prepareMetadata($view->getHtmlFrame(), $item);

        return compact(
            'item',
            'category'
        );
    }

    protected function prepareMetadata(HtmlFrame $htmlFrame, Article $item): void
    {
        $htmlFrame->setTitle($item->getTitle());
        $htmlFrame->setCoverImagesIfNotEmpty($item->getImage());
        $htmlFrame->setDescriptionIfNotEmpty(
            (string) str($item->getIntrotext())->stripHtmlTags()->truncate(150, '...')
        );
    }
}
