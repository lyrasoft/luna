<?php

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
