<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth;

use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\Method\MethodInterface;

class SRPAuthMethod implements MethodInterface
{
    /**
     * @inheritDoc
     */
    public function authenticate(array $credential): AuthResult
    {

    }
}
