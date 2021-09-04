<?php

/**
 * Part of ankecare project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

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
    
    public function getCategory(string $type, ?string $path): ?Category
    {
        /** @var Category $category */
        if ($path) {
            $conditions['path'] = compact('type', 'path');
        } else {
            $conditions['parent_id'] = 0;
        }

        return $this->categoryRepository->getItem($conditions);
    }
    
    public function getCategoryOrFail(string $type, ?string $path): Category
    {
        $category = $this->getCategory($type, $path);

        if (!$category) {
            throw new RouteNotFoundException('Category not found.');
        }
        
        return $category;
    }
}
