<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

use Lyrasoft\Luna\User\UserEntityInterface;

/**
 * Interface UserHandlerInterface
 */
interface UserHandlerInterface
{
    /**
     * load
     *
     * @param  array  $conditions
     *
     * @return  UserEntityInterface|null
     */
    public function load(mixed $conditions = null): ?UserEntityInterface;

    /**
     * login
     *
     * @param  mixed  $user
     * @param  array  $options
     *
     * @return  bool
     */
    public function login(mixed $user, array $options = []): bool;

    /**
     * logout
     *
     * @param  mixed  $user
     *
     * @return bool
     */
    public function logout(mixed $user = null): bool;

    /**
     * getUserEntityClass
     *
     * @return  string
     */
    public function getUserEntityClass(): string;

    /**
     * createUserEntity
     *
     * @param  array  $data  *
     *
     * @return  object
     */
    public function createUserEntity(array $data = []): object;
}
