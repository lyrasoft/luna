<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use Brick\Math\BigInteger;
use Brick\Math\Exception\NumberFormatException;
use Lyrasoft\Luna\Auth\SRP\SRPService;
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
     * @param  SRPService               $srpService
     * @param  array                    $options
     */
    public function __construct(
        protected ORM $orm,
        protected Config $config,
        protected PasswordHasherInterface $password,
        protected SRPService $srpService,
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
        $isSRPEnabled = $this->isSRPEnabled($credential, $srp);

        if (!$isSRPEnabled) {
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
        } else {
            $usernames = $this->getUsernames($credential);

            if ($usernames === []) {
                return new AuthResult(AuthResult::EMPTY_CREDENTIAL, $credential);
            }

            $user = $this->getUser($usernames);

            $M2 = $srp['M2'] ?? '';

            if (!$M2) {
                return new AuthResult(AuthResult::INVALID_PASSWORD, $credential);
            }

            $M2 = BigInteger::fromBase($M2, 16);

            $proof = (string) $this->srpService->getUserState();

            $proof = BigInteger::fromBase($proof, 16);

            $this->srpService->clearUserState();

            if (!hash_equals((string) $proof, (string) $M2)) {
                return new AuthResult(AuthResult::INVALID_PASSWORD, $credential);
            }
        }

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
        if ($this->srpService->isEnabled()) {
            $this->rehashSRP($user, $credential);

            return;
        }

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

    protected function isSRPEnabled(array $credential, array &$srp = null): bool
    {
        if (!$this->srpService->isEnabled()) {
            return false;
        }

        $srp = $credential['srp'] ?? [];

        return !($srp['fallback'] ?? false);
    }

    /**
     * @return  string
     */
    protected function getLoginName(): string
    {
        return $this->config->getDeep('user.login_name')
            ?: throw new \RuntimeException('User login name not set in config.');
    }

    protected function rehashSRP(Collection $user, array $credential): void
    {
        $hash = $user->password;

        if ($this->srpService::isValidSRPHash($hash)) {
            return;
        }

        $loginName = $this->getLoginName();

        $identity = $user[$loginName];
        $password = $credential['password'];

        $pf = $this->srpService->getSRPClient()->register($identity, $password);

        $user['password'] = $this->srpService::encodePasswordVerifier($pf->salt, $pf->verifier);

        $this->getMapper()->updateOne($user);
    }
}
