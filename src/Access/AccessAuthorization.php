<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Access;

use Windwalker\Authorization\Authorization;
use Windwalker\Authorization\AuthorizationInterface;
use Windwalker\Authorization\PolicyInterface;
use Windwalker\Authorization\PolicyProviderInterface;

use function Windwalker\unwrap_enum;

/**
 * The AccessAuthorization class.
 */
class AccessAuthorization implements AuthorizationInterface
{
    public function __construct(protected Authorization $authorization, protected AccessService $accessService)
    {
    }

    public function authorize(string|\UnitEnum $policy, mixed $user, ...$args): bool
    {
        if ($this->hasPolicy($policy)) {
            return $this->authorization->getPolicy($policy)?->authorize($user, ...$args) ?? false;
        }

        return $this->accessService->check($policy, $user, ...$args);
    }

    public function addPolicy(string|\UnitEnum $name, callable|PolicyInterface $handler): static
    {
        $this->authorization->addPolicy($name, $handler);

        return $this;
    }

    public function hasPolicy(string|\UnitEnum $name): bool
    {
        return $this->authorization->hasPolicy($name);
    }

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
