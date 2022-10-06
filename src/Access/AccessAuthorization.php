<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Access;

use Windwalker\Authorization\Authorization;
use Windwalker\Authorization\AuthorizationInterface;
use Windwalker\Authorization\PolicyProviderInterface;

/**
 * The AccessAuthorization class.
 */
class AccessAuthorization implements AuthorizationInterface
{
    public function __construct(protected Authorization $authorization, protected AccessService $accessService)
    {
    }

    /**
     * @inheritDoc
     */
    public function authorize(string $policy, mixed $user, ...$args): bool
    {
        if ($this->hasPolicy($policy)) {
            return $this->authorization->getPolicy($policy)?->authorize($user, ...$args);
        }

        return $this->accessService->check($policy, $user, ...$args);
    }

    /**
     * @inheritDoc
     */
    public function addPolicy(string $name, callable $handler): static
    {
        $this->authorization->addPolicy($name, $handler);

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function hasPolicy(string $name): bool
    {
        return $this->authorization->hasPolicy($name);
    }

    /**
     * @inheritDoc
     */
    public function registerPolicyProvider(PolicyProviderInterface $policy): static
    {
        $this->authorization->registerPolicyProvider($policy);

        return $this;
    }

    /**
     * @return Authorization
     */
    public function getAuthorization(): Authorization
    {
        return $this->authorization;
    }

    /**
     * @param  Authorization  $authorization
     *
     * @return  static  Return self to support chaining.
     */
    public function setAuthorization(Authorization $authorization): static
    {
        $this->authorization = $authorization;

        return $this;
    }
}
