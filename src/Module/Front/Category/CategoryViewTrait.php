<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Front\Category;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\DI\Attributes\Inject;

/**
 * Trait CategoryViewTrait
 */
trait CategoryViewTrait
{
    #[Inject]
    protected CategoryRepository $categoryRepository;

    public function getCategory(mixed $conditions): ?Category
    {
        /** @var Category $category */
        if (!$conditions) {
            $conditions['parent_id'] = 0;
        }

        return $this->categoryRepository->getItem($conditions);
    }

    public function getCategoryOrFail(mixed $conditions): Category
    {
        $category = $this->getCategory($conditions);

        if (!$category) {
            throw new RouteNotFoundException('Category not found.');
        }

        return $category;
    }
}
