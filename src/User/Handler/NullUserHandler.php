<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\UserEntityInterface;

/**
 * The NullUserHandler class.
 */
class NullUserHandler implements UserHandlerInterface
{
    /**
     * @codeCoverageIgnore  Returns a constant, no logic.
     */
    public function load(mixed $conditions = null): ?UserEntityInterface
    {
        return null;
    }

    /**
     * @codeCoverageIgnore  Returns a constant, no logic.
     */
    public function login(mixed $user, array $options = []): bool
    {
        return true;
    }

    /**
     * @codeCoverageIgnore  Returns a constant, no logic.
     */
    public function logout(mixed $user = null): bool
    {
        return true;
    }

    public function getUserEntityClass(): string
    {
        return User::class;
    }

    public function createUserEntity(array $data = []): object
    {
        return new \stdClass();
    }
}
