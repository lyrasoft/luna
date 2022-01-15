<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Entity\Category;
use Unicorn\Field\SqlListField;
use Windwalker\Query\Query;

/**
 * The CategoryListField class.
 */
class CategoryListField extends SqlListField
{
    protected ?string $table = Category::class;

    protected string $categoryType = '';

    protected ?int $maxLevel = null;

    protected bool $showRoot = false;

    protected function prepareQuery(Query $query): void
    {
        parent::prepareQuery($query);

        $query->select('category.id', 'category.title');
        $query->where('type', $this->getCategoryType());
        $query->order('category.lft', 'ASC');

        if ($this->maxLevel) {
            $query->where('category.level', '<=', (int) $this->maxLevel);
        }

        if (!$this->showRoot) {
            $query->where('category.parent_id', '!=', 0);
        }
    }

    /**
     * @return string
     */
    public function getCategoryType(): string
    {
        return $this->categoryType;
    }

    /**
     * @param  string  $categoryType
     *
     * @return  static  Return self to support chaining.
     */
    public function categoryType(string $categoryType): static
    {
        $this->categoryType = $categoryType;

        return $this;
    }

    /**
     * @return int|null
     */
    public function getMaxLevel(): ?int
    {
        return $this->maxLevel;
    }

    /**
     * @param  int|null  $maxLevel
     *
     * @return  static  Return self to support chaining.
     */
    public function maxLevel(?int $maxLevel): static
    {
        $this->maxLevel = $maxLevel;

        return $this;
    }

    /**
     * @return bool
     */
    public function isShowRoot(): bool
    {
        return $this->showRoot;
    }

    /**
     * @param  bool  $showRoot
     *
     * @return  static  Return self to support chaining.
     */
    public function showRoot(bool $showRoot): static
    {
        $this->showRoot = $showRoot;

        return $this;
    }

    /**
     * getAccessors
     *
     * @return    array
     */
    protected function getAccessors(): array
    {
        return array_merge(
            parent::getAccessors(),
            []
        );
    }
}
