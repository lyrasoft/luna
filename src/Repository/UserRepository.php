<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\PasswordInterface;
use Unicorn\Attributes\ConfigureAction;
use Unicorn\Attributes\Repository;
use Unicorn\Repository\Actions\BatchAction;
use Unicorn\Repository\Actions\ReorderAction;
use Unicorn\Repository\Actions\SaveAction;
use Unicorn\Repository\Event\PrepareSaveEvent;
use Unicorn\Repository\ListRepositoryInterface;
use Unicorn\Repository\ListRepositoryTrait;
use Unicorn\Repository\ManageRepositoryInterface;
use Unicorn\Repository\ManageRepositoryTrait;
use Unicorn\Selector\ListSelector;
use Windwalker\Core\Form\Exception\ValidateFailException;

/**
 * The UserRepository class.
 */
#[Repository(entityClass: User::class)]
class UserRepository implements ManageRepositoryInterface, ListRepositoryInterface
{
    use ManageRepositoryTrait;
    use ListRepositoryTrait;

    public function __construct(protected PasswordInterface $password)
    {
    }

    public function getListSelector(): ListSelector
    {
        $selector = $this->createSelector();

        $selector->from(User::class);

        return $selector;
    }

    #[ConfigureAction(SaveAction::class)]
    protected function configureSaveAction(SaveAction $action): void
    {
        $action->prepareSave(
            function (PrepareSaveEvent $event) {
                $data = &$event->getData();

                if ($data['password'] ?? null) {
                    if ($data['password'] !== $data['password2']) {
                        throw new ValidateFailException('Password not match');
                    }

                    $data['password'] = $this->password->hash($data['password']);

                    unset($data['password2']);
                } else {
                    unset($data['password']);
                }
            }
        );
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
