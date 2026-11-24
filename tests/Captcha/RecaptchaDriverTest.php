<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\RecaptchaDriver;
use Lyrasoft\Luna\Script\LunaScript;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReCaptcha\ReCaptcha;
use ReCaptcha\Response;
use ReflectionProperty;

#[AllowMockObjectsWithoutExpectations]
class RecaptchaDriverTest extends TestCase
{
    private LunaScript $lunaScript;

    protected function setUp(): void
    {
        $this->lunaScript = $this->createMock(LunaScript::class);
        $_POST = [];
    }

    protected function tearDown(): void
    {
        $_POST = [];
    }

    private function createDriver(string $type = 'checkbox'): RecaptchaDriver
    {
        return new RecaptchaDriver($this->lunaScript, 'site-key', 'secret-key', $type);
    }

    private function injectRecaptcha(RecaptchaDriver $driver, ReCaptcha $recaptcha): void
    {
        $property = new ReflectionProperty(RecaptchaDriver::class, 'recaptcha');
        $property->setValue($driver, $recaptcha);
    }

    #[Test]
    public function inputRendersCheckboxWidget(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver()->input([], ['js_verify' => false]);

        self::assertStringContainsString('class="g-recaptcha"', $html);
        self::assertStringContainsString('data-sitekey="site-key"', $html);
        self::assertStringContainsString('uni-captcha-recaptcha="checkbox"', $html);
        self::assertStringNotContainsString('data-size', $html);
        self::assertStringNotContainsString('data-callback', $html);
    }

    #[Test]
    public function inputInvisibleAddsSizeAndCallback(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver('invisible')->input([], ['js_verify' => false]);

        self::assertStringContainsString('data-size="invisible"', $html);
        self::assertStringContainsString('data-callback="recaptchaCallback_', $html);
        self::assertStringContainsString('uni-captcha-recaptcha="invisible"', $html);
    }

    #[Test]
    public function inputWithoutJsVerifyOmitsFlag(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver()->input();

        self::assertStringNotContainsString('data-js-verify', $html);
    }

    #[Test]
    public function inputJsVerifyAddsCallbackAndFlag(): void
    {
        $this->lunaScript->expects(self::once())->method('captcha');

        $html = $this->createDriver()->input([], ['js_verify' => true]);

        self::assertStringContainsString('data-callback="recaptchaCallback_', $html);
        self::assertStringContainsString('data-js-verify="1"', $html);
    }

    #[Test]
    public function verifyReturnsTrueWhenRecaptchaSucceeds(): void
    {
        $_POST['g-recaptcha-response'] = 'code-123';

        $recaptcha = $this->createMock(ReCaptcha::class);
        $recaptcha->expects(self::once())
            ->method('verify')
            ->with('code-123', '1.2.3.4')
            ->willReturn(new Response(true));

        $driver = $this->createDriver();
        $this->injectRecaptcha($driver, $recaptcha);

        self::assertTrue($driver->verify(null, ['server' => ['REMOTE_ADDR' => '1.2.3.4']]));
    }

    #[Test]
    public function verifyReturnsFalseWhenRecaptchaFails(): void
    {
        $recaptcha = $this->createMock(ReCaptcha::class);
        $recaptcha->expects(self::once())
            ->method('verify')
            ->with('', null)
            ->willReturn(new Response(false, ['invalid-input-response']));

        $driver = $this->createDriver();
        $this->injectRecaptcha($driver, $recaptcha);

        self::assertFalse($driver->verify(null, ['server' => []]));
    }

    #[Test]
    public function getRecaptchaInstanceCreatesOnceAndReuses(): void
    {
        $driver = $this->createDriver();

        $first = $driver->getRecaptchaInstance();
        $second = $driver->getRecaptchaInstance();

        self::assertInstanceOf(ReCaptcha::class, $first);
        self::assertSame($first, $second);
    }
}
