<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\ManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Windwalker\DI\Attributes\Inject;
use Windwalker\DI\Container;
use Windwalker\Query\Query;

/**
 * The ArticleRepository class.
 */
#[Repository(entityClass: Article::class)]
class ArticleRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use LocaleAwareTrait;
    use ManageRepositoryTrait;
    use ListRepositoryTrait;

    #[Inject]
    protected Container $container;

    protected ?string $type = null;

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Article::class)
            ->leftJoin(Category::class);

        if ($this->localeService->isEnabled()) {
            $selector->leftJoin(Language::class, 'lang', 'lang.code', 'article.language');
        }

        return $selector;
    }

    public function getAvailableListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Article::class)
            ->leftJoin(Category::class);

        if ($this->localeService->isEnabled()) {
            $selector->where('article.language', 'in', ['*', $this->getLocale()]);
        }

        return $selector;
    }

    /**
     * @return string|null
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param  string|null  $type
     *
     * @return  static  Return self to support chaining.
     */
    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    #[ConfigureAction(SaveAction::class)]
    protected function configureSaveAction(SaveAction $action): void
    {
        $this->newOrderLast($action);
    }

    #[ConfigureAction(ReorderAction::class)]
    protected function configureReorderAction(ReorderAction $action): void
    {
        $action->setReorderGroupHandler(
            function (Query $query, Article $article) {
                $query->where('category_id', $article->categoryId);
                $query->where('type', $article->type);
            }
        );
    }
}
