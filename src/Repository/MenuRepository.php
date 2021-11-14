<?php

/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\Menu;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\BatchAction;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\Nested\NestedManageRepositoryTrait;
use Unicorn\Selector\ListSelector;

/**
 * The MenuRepository class.
 */
#[Repository(entityClass: Menu::class)]
class MenuRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use NestedManageRepositoryTrait;
    use ListRepositoryTrait;

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(Menu::class);

        $selector->where('menu.parent_id', '!=', 0)
            ->where('menu.level', '>=', 1);

        return $selector;
    }

    #[ConfigureAction(SaveAction::class)]
    protected function configureSaveAction(SaveAction $action): void
    {
        //
    }

    #[ConfigureAction(ReorderAction::class)]
    protected function configureReorderAction(ReorderAction $action): void
    {
        //
    }

    #[ConfigureAction(BatchAction::class)]
    protected function configureBatchAction(BatchAction $action): void
    {
        //
    }
}
