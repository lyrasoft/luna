<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Entity\Page;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\BatchAction;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\ManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Windwalker\Query\Query;

/**
 * The PageRepository class.
 */
#[Repository(entityClass: Page::class)]
class PageRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use ManageRepositoryTrait;
    use ListRepositoryTrait;
    use LocaleAwareTrait;

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Page::class)
            ->leftJoin(
                Category::class,
                null,
                'category.id',
                'page.category_id'
            );

        if ($this->localeService->isEnabled()) {
            $selector->leftJoin(Language::class, 'lang', 'lang.code', 'page.language');
        }

        return $selector;
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
            function (Query $query, Page $page) {
                $query->where('category_id', $page->categoryId);
            }
        );
    }

    #[ConfigureAction(BatchAction::class)]
    protected function configureBatchAction(BatchAction $action): void
    {
        //
    }
}
