<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use DomainException;
use Hybridauth\Adapter\AdapterInterface;
use Hybridauth\Exception\InvalidArgumentException;
use Hybridauth\Exception\UnexpectedValueException;
use Hybridauth\Hybridauth;
use Lyrasoft\Luna\Auth\Profile\DefaultProfileHandler;
use Lyrasoft\Luna\Auth\Profile\ProfileHandlerInterface;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserSocial;
use Lyrasoft\Luna\Module\Front\Registration\RegistrationRepository;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Security\CsrfService;
use Windwalker\DI\Exception\DefinitionException;
use Windwalker\ORM\EntityMapper;
use Windwalker\ORM\ORM;

/**
 * The SocialLoginMethod class.
 */
class SocialAuthService
{
    public string $userEntity = User::class;

    public string $userSocialEntity = UserSocial::class;

    public function __construct(
        protected AppContext $app,
        protected Navigator $nav,
        protected ORM $orm,
        protected CsrfService $csrfService
    ) {
    }

    public function auth(string $provider): ?array
    {
        if (!$provider) {
            return null;
        }

        $providers = $this->app->config('social_login.social_providers');
        $providerConfig = $providers[$provider];

        $adapter = $this->getAdapter($provider, $providers);

        $handler = $this->createProfileHandler($providerConfig['profile_handler'] ?? null);
        $data = $handler->handle($adapter);

        $userProfile = $adapter->getUserProfile();

        $data['avatar'] = $userProfile->photoURL;

        $map['identifier'] = $userProfile->identifier;
        $map['provider'] = $provider;

        /** @var EntityMapper<User> $userMapper */
        /** @var EntityMapper<UserSocial> $mapMapper */
        $userMapper = $this->orm->mapper($this->userEntity);
        $mapMapper = $this->orm->mapper($this->userSocialEntity);

        if ($socialMap = $mapMapper->findOne($map)) {
            $user = $userMapper->findOne($socialMap->getUserId());

            if (!$user) {
                $data = $this->prepareUserData($adapter, $data);
                $user = $this->createUser($data);
            }
        } else {
            $loginName = $handler->getLoginName();
            $user = $userMapper->findOne([$loginName => $data[$loginName] ?? null]);

            if (!$user) {
                /** @var User $user */
                $user = $this->createUser($data);
            }

            $map['user_id'] = $user->getId();
            $map['params'] = json_encode($userProfile);

            $socialMap = $mapMapper->createOne($map);
        }

        return [$user, $socialMap];
    }

    protected function createUser(array $data): object
    {
        $repo = $this->app->service(RegistrationRepository::class);

        $data['enabled'] = 1;
        $data['verified'] = 1;

        return $repo->save($data);
    }

    protected function prepareUserData(AdapterInterface $adapter, array $user): array
    {
        return $user;
    }

    protected function createProfileHandler(?string $handlerClass): ProfileHandlerInterface
    {
        if (!$handlerClass) {
            return $this->app->service(DefaultProfileHandler::class);
        }

        return $this->app->service($handlerClass);
    }

    /**
     * getAdapter
     *
     * @param  string  $provider
     * @param  mixed   $providers
     *
     * @return  AdapterInterface
     *
     * @throws InvalidArgumentException
     * @throws UnexpectedValueException
     * @throws DefinitionException
     */
    protected function getAdapter(string $provider, mixed $providers): AdapterInterface
    {
        if (!class_exists(Hybridauth::class)) {
            throw new DomainException('Please install hybridauth/hybridauth ^3.0 first.');
        }

        $config = [
            'callback' => (string) $this->nav->to('social_auth', [], Navigator::IGNORE_EVENTS)
                ->var('provider', $provider)
                ->full(),
            'providers' => $providers,
        ];

        $ha = new Hybridauth($config, null, $this->app->service(HASessionStorage::class));

        return $ha->authenticate($provider);
    }
}
