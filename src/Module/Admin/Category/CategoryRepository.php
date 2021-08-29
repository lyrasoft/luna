<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Admin\Category;

use App\Entity\Category;
use App\Entity\User;
use App\Region\RegionListTrait;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\Nested\NestedManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Unicorn\Upload\FileUploadManager;
use Windwalker\Core\Http\AppRequest;
use Windwalker\ORM\SelectorQuery;

/**
 * The Category class.
 */
#[Repository(entityClass: Category::class)]
class CategoryRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use RegionListTrait;
    use NestedManageRepositoryTrait;
    use ListRepositoryTrait;

    /**
     * CategoryRepository constructor.
     */
    public function __construct(protected AppRequest $request, protected FileUploadManager $fileUploadManager)
    {
    }

    /**
     * Configure List Selector.
     *
     * @param  SelectorQuery  $query
     * @param  ListSelector   $selector
     *
     * @return    void
     */
    protected function configureSelector(SelectorQuery $query, ListSelector $selector): void
    {
        $query->from(Category::class)
            ->leftJoin(User::class);

        $this->joinRegion($query, $this->getShortName(), true);
        $this->useRegionFilter($selector);

        $query->where('category.parent_id', '!=', 0)
            ->where('category.level', '>=', 1);
    }

    public function getListSelector(): ListSelector
    {
        return $this->createSelector();
    }
}
