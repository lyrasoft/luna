<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    MIT
 */

namespace Lyrasoft\Luna\User;

use Exception;
use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\User\Event\AfterLoginEvent;
use Lyrasoft\Luna\User\Event\BeforeLoginEvent;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Event\LoginFailEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use Lyrasoft\Luna\User\Handler\UserHandlerInterface;
use Psr\Cache\InvalidArgumentException;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Auth\AuthService;
use Windwalker\DI\Exception\DefinitionException;
use Windwalker\Event\EventAwareInterface;
use Windwalker\Event\EventAwareTrait;
use Windwalker\ORM\ORM;
use Windwalker\Session\Session;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

/**
 * The UserService class.
 *
 * @template T
 *
 * @since    2.0.0
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
        protected ORM $orm,
        protected ?Session $session = null
    ) {
        //
    }

    /**
     * getCurrentUser
     *
     * @return  UserEntityInterface|T
     *
     * @throws InvalidArgumentException
     */
    public function getCurrentUser(): UserEntityInterface
    {
        return $this->getUser();
    }

    /**
     * getUser
     *
     * @param  mixed|null  $conditions
     *
     * @return  UserEntityInterface|T
     *
     * @throws InvalidArgumentException
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
     * @throws Exception
     * @throws InvalidArgumentException
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

        try {
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
                    $this->login($user, $options);
                }
            }
        } catch (AuthenticateFailException $e) {
            $result = false;
            $resultSet?->addResult('authorize', AuthResult::authorizeFail([], $e));
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

        $event = $this->emit(
            AfterLoginEvent::class,
            compact(
                'credential',
                'options',
                'user',
                'result',
                'resultSet',
            )
        );

        return $result;
    }

    public function can(string $action, mixed $user = null, ...$args): bool
    {
        if ($this->session && ($id = $this->session->get(UserSwitchService::USER_MASK_ID))) {
            $user = $this->getUser($id);
        }

        $user ??= $this->getUser($user);

        return $this->getAuthService()->authorize($action, $user, ...$args);
    }

    public function authenticate(array $credential, ResultSet &$resultSet = null): false|AuthResult
    {
        return $this->getAuthService()->authenticate($credential, $resultSet);
    }

    /**
     * login
     *
     * @param  mixed  $user
     * @param  array  $options
     *
     * @return  boolean
     * @throws InvalidArgumentException
     * @throws DefinitionException
     */
    public function login(mixed $user, array $options = []): bool
    {
        if (is_scalar($user) || is_array($user)) {
            $user = $this->load($user);
        }

        if (!$user) {
            return false;
        }

        return $this->getUserHandler()->login($user, $options);
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
     * @throws DefinitionException
     */
    public function getUserEntityClass(): string
    {
        return $this->getUserHandler()->getUserEntityClass();
    }

    /**
     * @return UserHandlerInterface
     * @throws DefinitionException
     */
    public function getUserHandler(): UserHandlerInterface
    {
        return $this->app->service(UserHandlerInterface::class);
    }

    /**
     * createUserEntity
     *
     * @param  array  $data  *
     *
     * @return  object|T
     * @throws DefinitionException
     */
    public function createUserEntity(array $data = []): object
    {
        return $this->getUserHandler()->createUserEntity($data);
    }

    public function getAuthService(): AuthService
    {
        return $this->cacheStorage['authService'] ??= $this->app->service(AuthService::class);
    }

    public function getAccessService(): AccessService
    {
        return $this->cacheStorage['accessService'] ??= $this->app->service(AccessService::class);
    }
}
