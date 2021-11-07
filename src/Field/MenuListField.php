<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Field;

use App\Entity\Menu;
use Unicorn\Field\SqlListField;
use Windwalker\Query\Query;

/**
 * The MenuListField class.
 */
class MenuListField extends SqlListField
{
    protected ?string $table = Menu::class;

    protected string $menuType = '';

    protected ?int $maxLevel = null;

    protected bool $showRoot = false;

    protected function prepareQuery(Query $query): void
    {
        parent::prepareQuery($query);

        $query->select('menu.id', 'menu.title');
        $query->where('menu.type', $this->getMenuType());
        $query->order('menu.lft', 'ASC');

        if ($this->maxLevel) {
            $query->where('menu.level', '<=', (int) $this->maxLevel);
        }

        if (!$this->showRoot) {
            $query->where('menu.parent_id', '!=', 0);
        }
    }

    /**
     * @return string
     */
    public function getMenuType(): string
    {
        return $this->menuType;
    }

    /**
     * @param  string  $type
     *
     * @return  static  Return self to support chaining.
     */
    public function menuType(string $type): static
    {
        $this->menuType = $type;

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
