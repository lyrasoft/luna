<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\CaptchaFactory;
use Lyrasoft\Luna\Captcha\CloudflareDriver;
use Lyrasoft\Luna\Script\LunaScript;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\DI\Container;

#[AllowMockObjectsWithoutExpectations]
class CaptchaFactoryTest extends TestCase
{
    #[Test]
    public function cloudflareFactoryCreatesDriver(): void
    {
        $container = new Container();
        $container->set(LunaScript::class, $this->createStub(LunaScript::class));

        $factory = CaptchaFactory::cloudflare('site-key', 'secret-key', ['theme' => 'dark']);

        self::assertInstanceOf(CloudflareDriver::class, $factory($container));
    }
}
