<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\NestedReorderAction;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\Nested\NestedManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Unicorn\Upload\FileUploadManager;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Query\Query;

/**
 * The Category class.
 */
#[Repository(entityClass: Category::class)]
class CategoryRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use LocaleAwareTrait;
    use NestedManageRepositoryTrait;
    use ListRepositoryTrait;

    /**
     * CategoryRepository constructor.
     */
    public function __construct(protected AppRequest $request, protected FileUploadManager $fileUploadManager)
    {
    }

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Category::class)
            ->leftJoin(User::class, 'user', 'user.id', 'category.created_by');

        $selector->where('category.parent_id', '!=', 0)
            ->where('category.level', '>=', 1);

        if ($this->localeService->isEnabled()) {
            $selector->leftJoin(Language::class, 'lang', 'lang.code', 'category.language');
        }

        return $selector;
    }

    public function getAvailableListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Category::class)
            ->leftJoin(User::class, 'user', 'user.id', 'category.created_by');

        $selector->where('category.parent_id', '!=', 0)
            ->where('category.level', '>=', 1);

        if ($this->localeService->isEnabled()) {
            $selector->where('category.language', 'in', ['*', $this->getLocale()]);
        }

        return $selector;
    }

    #[ConfigureAction(ReorderAction::class, ConfigureAction::IS_INSTANCE_OF)]
    protected function configureReorderAction(NestedReorderAction $action): void
    {
        $action->setReorderGroupHandler(
            function (Query $query, Category $category) {
                $query->where('type', $category->getType());
            }
        );
    }
}
