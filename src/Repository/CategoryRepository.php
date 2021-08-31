<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Entity\User;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\Nested\NestedManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Unicorn\Upload\FileUploadManager;
use Windwalker\Core\Http\AppRequest;

/**
 * The Category class.
 */
#[Repository(entityClass: Category::class)]
class CategoryRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
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

        return $selector;
    }
}
