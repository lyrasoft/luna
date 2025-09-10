<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Handler;

use Windwalker\Authentication\ResultSet;

interface UserAuthenticationHandlerInterface
{
    public function authenticate(array $credential): ResultSet;
}
