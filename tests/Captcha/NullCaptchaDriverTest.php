<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\NullCaptchaDriver;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class NullCaptchaDriverTest extends TestCase
{
    #[Test]
    public function inputReturnsEmptyString(): void
    {
        $driver = new NullCaptchaDriver();

        self::assertSame('', $driver->input(['class' => 'foo'], ['js_verify' => true]));
    }

    #[Test]
    public function verifyAlwaysPasses(): void
    {
        $driver = new NullCaptchaDriver();

        self::assertTrue($driver->verify(null));
        self::assertTrue($driver->verify('wrong-value', ['server' => []]));
    }
}
