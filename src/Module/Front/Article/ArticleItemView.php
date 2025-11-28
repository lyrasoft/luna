<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Article;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\Module\Front\Category\CategoryViewTrait;
use Lyrasoft\Luna\Module\Front\Page\PageView;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Lyrasoft\Luna\Services\AssociationService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Http\BrowserNext;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\View\View;
use Windwalker\Core\View\ViewModelInterface;
use Windwalker\DI\Attributes\Autowire;
use Windwalker\DI\Exception\DefinitionException;

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
    use LocaleAwareTrait;

    /**
     * Constructor.
     */
    public function __construct(
        #[Autowire]
        protected ArticleRepository $repository,
        #[Autowire]
        protected Navigator $nav,
        protected AssociationService $associationService
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
     * @throws \ReflectionException
     * @throws DefinitionException
     */
    public function prepare(AppContext $app, View $view): mixed
    {
        $id = $app->input('id');
        $alias = $app->input('alias');

        /** @var Article $item */
        $item = $this->repository->mustGetItem($id);

        $locale = $this->getLocale();

        if ($this->isLocaleEnabled() && $item->language !== $locale) {
            $assoc = $this->associationService->getRelativeItemByIdAndKey(
                'article',
                $item->id,
                $locale
            );

            if (!$assoc) {
                throw new RouteNotFoundException('Assoc not found');
            }

            $item = $this->repository->mustGetItem($assoc->targetId);

            return $this->nav->self()->id($item->getId())->alias($item->getAlias());
        }

        if (!$item->state->isPublished()) {
            throw new RouteNotFoundException('Article not found.');
        }

        if ($item->pageId) {
            /** @var View $pageView */
            $pageView = $app->make(PageView::class);
            return $pageView->render(['id' => $item->pageId]);
        }

        /** @var Category $category */
        $category = $this->getCategoryOrFail($item->categoryId);

        if (!$category->state->isPublished()) {
            throw new RouteNotFoundException('Category not published.');
        }

        // Keep URL unique
        if (($item->alias !== $alias) && !$app->service(BrowserNext::class)->isRobot()) {
            return $this->nav->self()->alias($item->alias);
        }

        $this->prepareMetadata($view->getHtmlFrame(), $item);

        return compact(
            'item',
            'category'
        );
    }

    protected function prepareMetadata(HtmlFrame $htmlFrame, Article $item): void
    {
        $htmlFrame->setTitle($item->title);
        $htmlFrame->setCoverImagesIfNotEmpty($item->image);
        $htmlFrame->setDescriptionIfNotEmpty(
            (string) str($item->introtext)->stripHtmlTags()->truncate(150, '...')
        );
    }
}
