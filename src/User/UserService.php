<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\User;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\Event\BeforeLoginEvent;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Event\LoginFailEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use Lyrasoft\Luna\User\Handler\UserHandlerInterface;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Auth\AuthService;
use Windwalker\Event\EventAwareInterface;
use Windwalker\Event\EventAwareTrait;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

/**
 * The UserService class.
 *
 * @template T
 *
 * @since    __DEPLOY_VERSION__
 */
class UserService implements UserHandlerInterface, EventAwareInterface
{
    use EventAwareTrait;
    use InstanceCacheTrait;

    protected string $userEntity = User::class;

    /**
     * UserService constructor.
     */
    public function __construct(
        protected ApplicationInterface $app,
        protected AuthService $authService,
        protected ORM $orm
    ) {
        //
    }

    /**
     * getCurrentUser
     *
     * @return  UserEntityInterface|T
     *
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function getCurrentUser(): UserEntityInterface
    {
        return $this->load();
    }

    /**
     * getUser
     *
     * @param  mixed|null  $conditions
     *
     * @return  UserEntityInterface|T
     *
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function getUser(mixed $conditions = null): UserEntityInterface
    {
        return $this->load($conditions) ?? $this->createUserEntity();
    }

    /**
     * load
     *
     * @param  array|object  $conditions
     *
     * @return  UserEntityInterface|T|null
     * @throws \Exception
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function load(mixed $conditions = null): ?UserEntityInterface
    {
        return $this->getUserHandler()->load($conditions);
    }

    public function attemptToLogin(
        array $credential,
        array $options = [],
        ResultSet &$resultSet = null
    ): false|AuthResult {
        $event = $this->emit(
            BeforeLoginEvent::class,
            compact('credential', 'options')
        );

        $result = $this->authenticate($event->getCredential(), $resultSet);

        if ($result) {
            $credential = $result->getCredential();

            $user = $this->createUserEntity($credential);

            $event = $this->emit(
                LoginAuthEvent::class,
                compact('credential', 'options', 'result', 'user', 'resultSet')
            );

            $result = $event->getResult();

            if ($result) {
                $user = $this->createUserEntity($event->getCredential());
                $this->login($user);
            }
        }

        if (!$result) {
            $this->emit(
                LoginFailEvent::class,
                compact(
                    'credential',
                    'options',
                    'result',
                    'resultSet',
                )
            );

            return false;
        }

        return $result;
    }

    public function authenticate(array $credential, ResultSet &$resultSet = null): false|AuthResult
    {
        return $this->authService->authenticate($credential, $resultSet);
    }

    /**
     * login
     *
     * @param  mixed  $user
     *
     * @return  boolean
     * @throws \RuntimeException
     */
    public function login(mixed $user): bool
    {
        if (is_scalar($user)) {
            $user = $this->getUser($user);
        }

        if (!$user->isLogin()) {
            return false;
        }

        return $this->getUserHandler()->login($user);
    }

    /**
     * logout
     *
     * @param  mixed  $user
     *
     * @return bool
     */
    public function logout(mixed $user = null): bool
    {
        return $this->getUserHandler()->logout($user);
    }

    /**
     * getUserEntityClass
     *
     * @return  string|T
     *
     * @throws \Windwalker\DI\Exception\DefinitionException
     */
    public function getUserEntityClass(): string
    {
        return $this->getUserHandler()->getUserEntityClass();
    }

    /**
     * @return UserHandlerInterface
     * @throws \Windwalker\DI\Exception\DefinitionException
     */
    public function getUserHandler(): UserHandlerInterface
    {
        return $this->app->service(UserHandlerInterface::class);
    }

    /**
     * createUserEntity
     *
     * @param  array  $data  *
     * @return  object|T
     * @throws \Windwalker\DI\Exception\DefinitionException
     */
    public function createUserEntity(array $data = []): object
    {
        return $this->getUserHandler()->createUserEntity($data);
    }
}
