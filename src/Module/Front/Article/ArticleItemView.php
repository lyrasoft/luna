<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Article;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;

/**
 * The ArticleItemView class.
 */
#[ViewModel(
    layout: 'article-item',
    js: 'article-item.js'
)]
class ArticleItemView implements ViewModelInterface
{
    /**
     * Constructor.
     */
    public function __construct(
        #[Autowire]
        protected ArticleRepository $repository,
        #[Autowire]
        protected CategoryRepository $categoryRepository,
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
        $item = $this->repository->getItem($id);

        if (!$item) {
            throw new RouteNotFoundException('Article not found.');
        }

        $category = $this->categoryRepository->getItem($item->getCategoryId());

        if (!$category) {
            throw new RouteNotFoundException('Category not published.');
        }

        // Keep URL unique
        if ($item->getAlias() !== $alias) {
            return $this->nav->self()->alias($item->getAlias());
        }

        return compact(
            'item',
            'category'
        );
    }
}
