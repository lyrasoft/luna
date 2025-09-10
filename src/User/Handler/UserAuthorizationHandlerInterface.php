<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

interface UserAuthorizationHandlerInterface
{
    public function authorize(string|\UnitEnum $action, mixed $user = null, ...$args): bool;
}
