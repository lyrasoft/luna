<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\CaptchaFactory;
use Lyrasoft\Luna\Captcha\CloudflareDriver;
use Lyrasoft\Luna\Captcha\GregwarDriver;
use Lyrasoft\Luna\Captcha\RecaptchaDriver;
use Lyrasoft\Luna\Script\LunaScript;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\State\AppState;
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

    #[Test]
    public function recaptchaFactoryCreatesDriver(): void
    {
        $container = new Container();
        $container->set(LunaScript::class, $this->createStub(LunaScript::class));

        $factory = CaptchaFactory::recaptcha('site-key', 'secret-key', 'invisible');

        self::assertInstanceOf(RecaptchaDriver::class, $factory($container));
    }

    #[Test]
    public function gregwarFactoryCreatesDriver(): void
    {
        $container = new Container();
        $container->set(AppState::class, $this->createStub(AppState::class));
        $container->set(RendererService::class, $this->createStub(RendererService::class));

        $factory = CaptchaFactory::gregwar(['quality' => 60]);

        self::assertInstanceOf(GregwarDriver::class, $factory($container));
    }
}
