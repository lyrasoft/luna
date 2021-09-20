<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

/**
 * The NullUserHandler class.
 */
class NullUserHandler implements UserHandlerInterface
{
    public function load(mixed $conditions = null): ?UserEntityInterface
    {
        return null;
    }

    public function login(mixed $user, array $options = []): bool
    {
        return true;
    }

    public function logout(mixed $user = null): bool
    {
        return true;
    }
}
