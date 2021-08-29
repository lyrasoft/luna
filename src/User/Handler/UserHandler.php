<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\UserEntityInterface;
use Windwalker\Core\Attributes\Ref;
use Windwalker\Data\Collection;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;
use Windwalker\Session\Handler\DatabaseHandler;
use Windwalker\Session\Session;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

/**
 * The UserHandler class.
 */
class UserHandler implements UserHandlerInterface
{
    use InstanceCacheTrait;

    /**
     * UserService constructor.
     */
    public function __construct(
        protected Session $session,
        protected ORM $orm,
        #[Ref('user')]
        protected array $config
    ) {
    }

    public function load(mixed $conditions = null): ?UserEntityInterface
    {
        if (is_object($conditions)) {
            $conditions = get_object_vars($conditions);
        }

        $mapper = $this->getMapper();

        if (!$conditions) {
            $user = $this->once(
                'current.user',
                function () use ($mapper) {
                    $sessUserId = (array) $this->session->get('login_user_id');
                    $pk         = $mapper->getMainKey();
                    $loginUser  = [];

                    // If user is logged-in, get user data from DB to refresh info.
                    if ($sessUserId ?? null) {
                        $user = $mapper->findOne([$pk => $sessUserId], Collection::class);

                        if ($user) {
                            unset($user->password);
                            $loginUser = $user->dump();

                            // For user switch
                            // $group = $this->session->get('keepgroup');
                            //
                            // if ($group) {
                            //     $userSess['group'] = $group;
                            // }
                        }
                    }

                    return $loginUser;
                }
            );
        } else {
            if (isset($conditions['email'])) {
                $conditions['email'] = idn_to_ascii($conditions['email']);
            }

            $user = $mapper->findOne($conditions, Collection::class);

            $user = $user?->dump(true) ?? [];
        }

        if ($user['email'] ?? null) {
            $user['email'] = idn_to_utf8($user['email']);
        }

        /** @var User $user */
        return $mapper->toEntity($user);
    }

    public function login(mixed $user): bool
    {
        $mapper = $this->getMapper();
        $user = $mapper->toCollection($user);
        $pk = $mapper->getMainKey();

        $this->session->set('login_user_id', $user->$pk);

        $this->cacheReset();

        $sessHandler = $this->session->getBridge()->getHandler();

        if ($sessHandler instanceof DatabaseHandler) {
            $table = $sessHandler->getOption('table');

            if ($this->orm->getDb()->getTable($table)->hasColumn('user_id')) {
                $this->orm->getDb()->update($table)
                    ->set('user_id', $user->id)
                    ->where('id', $this->session->getId())
                    ->execute();
            }
        }

        return true;
    }

    public function logout(mixed $user = null): bool
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
        return $this->orm->mapper($this->getUserEntityClass());
    }

    /**
     * getUserEntityClass
     *
     * @return  string|T
     */
    public function getUserEntityClass(): string
    {
        return $this->config['entity'] ?? User::class;
    }

    /**
     * createUserEntity
     *
     * @param  array  $data  *
     * @return  object|T
     *
     * @throws \ReflectionException
     */
    public function createUserEntity(array $data = []): object
    {
        return $this->orm->createEntity($this->getUserEntityClass(), $data);
    }
}
