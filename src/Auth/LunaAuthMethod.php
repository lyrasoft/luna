<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use JsonException;
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
     * @throws JsonException
     * @throws ReflectionException
     */
    public function authenticate(array $credential): AuthResult
    {
        $loginName = $this->config->getDeep('user.login_name');

        $extraNames = $this->options['extra_login_names'] ?? [];

        $loginNames = array_unique(
            [
                $loginName,
                ...$extraNames,
            ]
        );

        $mapper = $this->getMapper();
        $usernames = Arr::only($credential, $loginNames);

        $password = $credential['password'] ?? '';

        if ($usernames === [] || (string) $password === '') {
            return new AuthResult(AuthResult::EMPTY_CREDENTIAL, $credential);
        }

        $user = $mapper->select()
            ->orWhere(
                function (Query $query) use ($usernames) {
                    foreach ($usernames as $field => $username) {
                        $query->where($field, $username);
                    }
                }
            )
            ->get(Collection::class);

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

    /**
     * rehash
     *
     * @param  Collection  $user
     * @param  array       $credential
     *
     * @return  void
     *
     * @throws JsonException
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
}
