<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use Brick\Math\Exception\NumberFormatException;
use Lyrasoft\Luna\Entity\User;
use ReflectionException;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\Method\MethodInterface;
use Windwalker\Core\Runtime\Config;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\Data\Collection;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;
use Windwalker\Query\Query;
use Windwalker\Utilities\Arr;
use Windwalker\Utilities\Options\OptionsResolverTrait;

/**
 * The LunaAuthMethod class.
 */
class LunaAuthMethod implements MethodInterface
{
    use OptionsResolverTrait;

    /**
     * DatabaseMethod constructor.
     *
     * @param  ORM                      $orm
     * @param  Config                   $config
     * @param  PasswordHasherInterface  $password
     * @param  array                    $options
     */
    public function __construct(
        protected ORM $orm,
        protected Config $config,
        protected PasswordHasherInterface $password,
        array $options = []
    ) {
        $this->resolveOptions(
            $options,
            [$this, 'configureOptions']
        );
    }

    protected function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults(
            [
                'extra_login_names' => [
                    'email',
                ],
            ]
        );
    }

    /**
     * authenticate
     *
     * @param  array  $credential
     *
     * @return AuthResult
     * @throws ReflectionException
     * @throws NumberFormatException
     */
    public function authenticate(array $credential): AuthResult
    {
        $password = $credential['password'] ?? '';

        if ((string) $password === '') {
            return new AuthResult(AuthResult::EMPTY_CREDENTIAL, $credential);
        }

        $usernames = $this->getUsernames($credential);

        if ($usernames === []) {
            return new AuthResult(AuthResult::EMPTY_CREDENTIAL, $credential);
        }

        $user = $this->getUser($usernames);

        if (!$user) {
            return new AuthResult(AuthResult::USER_NOT_FOUND, $credential);
        }

        if (!$this->password->verify($password, $user->password ?? '')) {
            return new AuthResult(AuthResult::INVALID_PASSWORD, $credential);
        }

        $this->rehash($user, $credential);

        $credential = array_merge($credential, $user->dump());

        return new AuthResult(AuthResult::SUCCESS, $credential);
    }

    protected function getUser(array $usernames): Collection|null
    {
        $mapper = $this->getMapper();

        return $mapper->select()
            ->orWhere(
                function (Query $query) use ($usernames) {
                    foreach ($usernames as $field => $username) {
                        $query->where($field, $username);
                    }
                }
            )
            ->get(Collection::class);
    }

    /**
     * rehash
     *
     * @param  Collection  $user
     * @param  array       $credential
     *
     * @return  void
     * @throws ReflectionException
     * @since  1.4.6
     */
    protected function rehash(Collection $user, array $credential): void
    {
        if ($this->password->needsRehash($user->password)) {
            $user->password = $this->password->hash($credential['password'] ?? '');

            $this->getMapper()->updateOne($user);
        }
    }

    /**
     * getMapper
     *
     * @return  EntityMapper<User>
     *
     * @throws ReflectionException
     */
    public function getMapper(): EntityMapper
    {
        $userEntityClass = $this->config->getDeep('user.entity');

        return $this->orm->mapper($userEntityClass);
    }

    /**
     * @param  array  $credential
     *
     * @return  array|object
     */
    protected function getUsernames(array $credential): array|object
    {
        $loginName = $this->getLoginName();

        $extraNames = $this->options['extra_login_names'] ?? [];

        $loginNames = array_unique(
            [
                $loginName,
                ...$extraNames,
            ]
        );

        return Arr::only($credential, $loginNames);
    }

    /**
     * @return  string
     */
    protected function getLoginName(): string
    {
        return $this->config->getDeep('user.login_name')
            ?: throw new \RuntimeException('User login name not set in config.');
    }
}
