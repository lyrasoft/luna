<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Lyrasoft\Luna\User\Exception\LoginFailException;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class LoginFailExceptionTest extends TestCase
{
    #[Test]
    public function mainMessageOverridesDefaultMessage(): void
    {
        $e = new LoginFailException('Invalid credentials', ['password' => 'wrong'], 401);

        self::assertSame('Invalid credentials', $e->getMessage());
        self::assertSame(401, $e->getCode());
    }
}
