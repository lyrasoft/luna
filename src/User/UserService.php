<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\User;

use App\Entity\User;
use App\Entity\UserRoleMap;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Auth\AuthService;
use Windwalker\Data\Collection;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;
use Windwalker\Session\Handler\DatabaseHandler;
use Windwalker\Session\Handler\HandlerInterface;
use Windwalker\Session\Session;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

/**
 * The UserService class.
 *
 * @since  __DEPLOY_VERSION__
 */
class UserService
{
    use InstanceCacheTrait;

    protected string $userEntity = User::class;

    /**
     * UserService constructor.
     */
    public function __construct(protected AuthService $authService, protected Session $session, protected ORM $orm)
    {
    }

    public function getCurrentUser(): UserEntityInterface
    {
        return $this->load();
    }

    public function getUser(mixed $conditions = null): UserEntityInterface
    {
        return $this->load($conditions);
    }

    /**
     * load
     *
     * @param  array|object  $conditions
     *
     * @return  UserEntityInterface
     * @throws \Exception
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function load(mixed $conditions = null): UserEntityInterface
    {
        if (is_object($conditions)) {
            $conditions = get_object_vars($conditions);
        }

        if (!$conditions) {
            $user = $this->once(
                'current.user',
                function () {
                    $userSess = (array) $this->session->get('user');
                    $pk = $this->orm->getEntityMetadata($this->userEntity)->getMainKey();

                    // If user is logged-in, get user data from DB to refresh info.
                    if ($userSess[$pk] ?? null) {
                        $user = $this->orm->mapper($this->userEntity)
                            ->findOne([$pk => $userSess[$pk]], Collection::class);

                        if ($user) {
                            unset($user->password);
                            $userSess = $user->dump();

                            $group = $this->session->get('keepgroup');

                            if ($group) {
                                $userSess['group'] = $group;
                            }
                        }
                    }

                    return $userSess;
                }
            );
        } else {
            if (isset($conditions['email'])) {
                $conditions['email'] = idn_to_ascii($conditions['email']);
            }

            $user = $this->getMapper()->findOne($conditions, Collection::class);

            $user = $user?->dump(true) ?? [];
        }

        if ($user['email'] ?? null) {
            $user['email'] = idn_to_utf8($user['email']);
        }

        /** @var User $user */
        return $this->getMapper()->toEntity($user);
    }

    public function attemptToLogin(array $credential, ResultSet &$resultSet = null): false|AuthResult
    {
        $result = $this->authenticate($credential, $resultSet);

        if (!$result) {
            return $result;
        }

        $user = $result->getCredential();

        $this->login($user);

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
    public function login(mixed $user)
    {
        $user = $this->getMapper()->toCollection($user);

        unset($user->password);

        $this->session->set('user', $user->dump(true));

        $this->cacheReset();

        $handler = $this->session->getBridge()->getHandler();

        if ($handler instanceof DatabaseHandler) {
            $table = $handler->getOption('table');

            if ($this->orm->getDb()->getTable($table)->hasColumn('user_id')) {
                $this->orm->getDb()->update($table)
                    ->set('user_id', $user->id)
                    ->where('id', $this->session->getId())
                    ->execute();
            }
        }

        return true;
    }

    /**
     * logout
     *
     * @param  mixed  $user
     *
     * @return bool
     */
    public function logout(mixed $user = null)
    {
        $session = $this->session;

        $session->start();

        // $session->destroy();
        $session->restart();

        $this->cacheReset();

        return true;
    }

    /**
     * getMapper
     *
     * @return  EntityMapper
     *
     * @throws \ReflectionException
     *
     * @since  __DEPLOY_VERSION__
     */
    protected function getMapper(): EntityMapper
    {
        return $this->orm->mapper($this->userEntity);
    }
}
