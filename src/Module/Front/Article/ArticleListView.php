<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Article;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Module\Front\Category\CategoryViewTrait;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Unicorn\Selector\ListSelector;
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
    use CategoryViewTrait;

    /**
     * Constructor.
     */
    public function __construct(
        #[Autowire]
        protected ArticleRepository $repository,
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
        $path = $app->input('path');
        $category = null;

        if ($path) {
            $category = $this->getCategoryOrFail(['type' => 'article', 'path' => $path]);

            if (!$category->getState()->isPublished()) {
                throw new RouteNotFoundException();
            }
        }

        $limit = 10;
        $page = $app->input('page');

        $items = $this->repository->getAvailableListSelector()
            ->addFilter('article.type', 'article')
            ->addFilter('article.state', 1)
            ->addFilter('category.state', 1)
            ->tapIf(
                $category !== null,
                function (ListSelector $selector) use ($category) {
                    $selector->where('category.lft', '>=', $category->getLft())
                        ->where('category.rgt', '<=', $category->getRgt());
                }
            )
            ->ordering('article.created', 'DESC')
            ->page($page)
            ->limit($limit);

        $pagination = $items->getPagination();

        $items = $items->getIterator(Article::class);

        return compact('items', 'pagination');
    }
}
