<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Services\RememberMeService;
use Lyrasoft\Luna\User\UserEntityInterface;
use Ramsey\Uuid\UuidInterface;
use ReflectionException;
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
        protected RememberMeService $rememberMeService,
        protected Session $session,
        protected ORM $orm,
        #[Ref('user')]
        protected array $config
    ) {
    }

    public function load(mixed $conditions = null): ?UserEntityInterface
    {
        if ($conditions instanceof UuidInterface) {
            $conditions = $conditions->getBytes();
        }

        if (is_object($conditions)) {
            $conditions = get_object_vars($conditions);
        }

        $mapper = $this->getMapper();

        $sessUserId = $this->getLoginUserId();

        // If session user id same as conditions
        // Just get current user
        if (
            $conditions
            && $sessUserId
            && is_scalar($conditions)
            && (string) $conditions === (string) $sessUserId
        ) {
            $conditions = null;
        }

        $this->rememberMeService->clearExpired();

        if (!$conditions) {
            return $this->loadCurrentLoginUser($sessUserId);
        }

        if (isset($conditions['email'])) {
            $conditions['email'] = idn_to_ascii($conditions['email']);
        }

        $user = $mapper->findOne($conditions, Collection::class);

        if (!$user) {
            return null;
        }

        $user = $user?->dump(true) ?? [];

        return $this->handleFoundUser($user, $mapper);
    }

    private function handleFoundUser(array $user, EntityMapper $mapper)
    {
        if ($user['email'] ?? null) {
            $user['email'] = idn_to_utf8($user['email']);
        }

        /** @var User $user */
        return $mapper->toEntity($user);
    }

    public function login(mixed $user, array $options = []): bool
    {
        $mapper = $this->getMapper();

        if ($user instanceof UserEntityInterface) {
            $userId = $user->id;
        } else {
            $user = $mapper->toCollection($user);
            $pk = $mapper->getMainKey();
            $userId = $user->$pk;
        }

        $this->rememberLoginUserId($userId);

        $this->cacheReset();

        $sessHandler = $this->session->getBridge()->getHandler();

        if ($sessHandler instanceof DatabaseHandler) {
            $table = $sessHandler->getOption('table');

            if ($this->orm->getDb()->getTableManager($table)->hasColumn('user_id')) {
                $this->orm->getDb()->update($table)
                    ->set('user_id', $userId)
                    ->set('remember', (int) ($options['remember'] ?? 0))
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

        $session->destroy();
        $session->regenerate(false, false);

        $this->rememberMeService->forget();

        $this->cacheReset();

        return true;
    }

    public function getLoginUserId(): mixed
    {
        $userId = $this->session->get('login_user_id');

        if ($userId) {
            return $userId;
        }

        // If user id not exists, try to get user id from remember me token.
        $token = $this->rememberMeService->getRenewableTokenItem();

        if (!$token) {
            return null;
        }

        // Renew login session
        $this->session->set('login_user_id', $token->userId);

        $this->rememberMeService->renew($token);

        return $token->userId;
    }

    public function rememberLoginUserId(mixed $userId): void
    {
        $this->session->set('login_user_id', $userId);
    }

    public function loadCurrentLoginUser(mixed $id): mixed
    {
        $mapper = $this->getMapper();

        $user = $this->once(
            'current.user',
            function () use ($id, $mapper) {
                if (!$id) {
                    return false;
                }

                $pk = $mapper->getMainKey();

                // If user is logged-in, get user data from DB to refresh info.
                $user = $mapper->findOne([$pk => $id], Collection::class);

                if (!$user) {
                    return false;
                }

                unset($user->password);
                $loginUser = $user->dump();

                return $this->handleFoundUser($loginUser, $mapper);
            }
        );

        if (!$user) {
            return null;
        }

        return $user;
    }

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
     *
     * @return  object|T
     *
     * @throws ReflectionException
     */
    public function createUserEntity(array $data = []): object
    {
        return $this->orm->createEntity($this->getUserEntityClass(), $data);
    }

    /**
     * @return User|null
     */
    public function getCurrent(): ?User
    {
        return $this->cacheGet('current.user');
    }

    /**
     * @param  User|null  $current
     *
     * @return  static  Return self to support chaining.
     */
    public function setCurrent(?User $current): static
    {
        $this->cacheSet('current.user', $current);

        return $this;
    }
}
