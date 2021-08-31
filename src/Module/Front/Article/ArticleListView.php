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
use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;

/**
 * The ArticleListView class.
 */
#[ViewModel(
    layout: 'article-list',
    js: 'article-list.js'
)]
class ArticleListView implements ViewModelInterface
{
    /**
     * Constructor.
     */
    public function __construct(
        #[Autowire]
        protected ArticleRepository $repository,
        #[Autowire]
        protected CategoryRepository $categoryRepository
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
    public function prepare(AppContext $app, View $view): array
    {
        $type = 'article';
        $path = $app->input('path');

        /** @var Category $category */
        if ($path) {
            $conditions['path'] = compact('type', 'path');
        } else {
            $conditions['parent_id'] = 0;
        }

        $category = $this->categoryRepository->getItem($conditions);

        if (!$category) {
            throw new RouteNotFoundException('Category not found.');
        }

        $limit = 10;
        $page = $app->input('page');

        $items = $this->repository->getListSelector()
            ->addFilter('article.state', 1)
            ->addFilter('category.state', 1)
            ->where('category.lft', '>=', $category->getLft())
            ->where('category.rgt', '<=', $category->getRgt())
            ->ordering('article.created', 'DESC')
            ->page($page)
            ->limit($limit);

        $pagination = $items->getPagination();

        $items = $items->getIterator(Article::class);

        return compact('items', 'pagination');
    }
}
