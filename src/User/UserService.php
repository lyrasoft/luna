<?php

namespace Lyrasoft\Luna\User;

use Exception;
use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\Entity\UserRoleMap;
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
use Windwalker\Core\Event\CoreEventAwareTrait;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Security\Exception\UnauthorizedException;
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
    use CoreEventAwareTrait;
    use InstanceCacheTrait;

    protected string $userEntity = User::class;

    protected ?User $currentUser = null;

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
        return $this->currentUser ?? $this->load($conditions) ?? $this->createUserEntity();
    }

    /**
     * @param  mixed|null  $conditions
     *
     * @return  UserEntityInterface|T
     *
     * @throws InvalidArgumentException
     */
    public function getLoggedInUser(mixed $conditions = null): UserEntityInterface
    {
        $user = $this->getUser($conditions);

        if (!$user->isLogin()) {
            throw new UnauthorizedException('User not logged-in.', 401);
        }

        return $user;
    }

    public function isLogin(): bool
    {
        return $this->getUser()->isLogin();
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

    /**
     * @param  mixed|null  $conditions
     *
     * @return  UserEntityInterface|T
     *
     * @throws InvalidArgumentException
     */
    public function mustLoad(mixed $conditions = null): UserEntityInterface
    {
        return $this->load($conditions)
            ?? throw new RouteNotFoundException('User not found.', 404);
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

    public function isRole(UserRole|string $role, mixed $user = null): bool
    {
        $user = $this->getUser($user);

        return $this->getAccessService()->userIsRole($user, $role);
    }

    public function isSuperUser(mixed $user = null): bool
    {
        return $this->getAccessService()->isSuperUser($user);
    }

    /**
     * @param  mixed  $user
     *
     * @return  array<UserRole>
     * @throws InvalidArgumentException
     */
    public function getUserRoles(mixed $user): array
    {
        $user = $this->getUser($user);

        return $this->getAccessService()->getUserRoles($user);
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

    /**
     * Generate a random password.
     *
     * This is a fork of Joomla JUserHelper::genRandomPassword()
     *
     * @param  integer  $length  Length of the password to generate
     *
     * @return  string  Random Password
     *
     * @throws Exception
     * @since   2.0.9
     * @see     https://github.com/joomla/joomla-cms/blob/staging/libraries/joomla/user/helper.php#L642
     */
    public static function genRandomPassword(int $length = 15): string
    {
        $salt = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $base = strlen($salt);
        $password = '';

        /*
         * Start with a cryptographic strength random string, then convert it to
         * a string with the numeric base of the salt.
         * Shift the base conversion on each character so the character
         * distribution is even, and randomize the start shift so it's not
         * predictable.
         */
        $random = random_bytes($length + 1);
        $shift = ord($random[0]);

        for ($i = 1; $i <= $length; ++$i) {
            $password .= $salt[($shift + ord($random[$i])) % $base];

            $shift += ord($random[$i]);
        }

        return $password;
    }

    /**
     * @param  User|null  $currentUser
     *
     * @return  static  Return self to support chaining.
     */
    public function setCurrentUser(?User $currentUser): static
    {
        $this->currentUser = $currentUser;

        return $this;
    }
}
