<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Captcha\CaptchaDriverInterface;
use Lyrasoft\Luna\Field\CaptchaField;
use Lyrasoft\Luna\Tests\TestApp;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\DI\Container;
use Windwalker\DOM\HTMLElement;
use Windwalker\Form\ValidateResult;

use function Windwalker\DOM\h;

/**
 * Covers the logic of CaptchaField: option merging for the captcha driver, image route
 * resolution, driver lookup by profile, and captcha verification during validate().
 *
 * The driver is replaced by a PHPUnit double injected into the field's protected `driver`
 * property, so no real captcha service is reached.
 */
class CaptchaFieldTest extends TestCase
{
    private Container $container;

    #[Before]
    protected function prepareContainer(): void
    {
        $this->container = TestApp::$instance->getContainer()->createChild();
    }

    private function createField(CaptchaDriverInterface $driver): CaptchaField
    {
        $field = $this->container->newInstance(CaptchaField::class);

        $property = new ReflectionProperty(CaptchaField::class, 'driver');
        $property->setValue($field, $driver);

        return $field;
    }

    private function input(): HTMLElement
    {
        return h('input', ['name' => 'captcha']);
    }

    #[Test]
    public function buildFieldElementClearsValueAndMergesDriverOptions(): void
    {
        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->once())
            ->method('input')
            ->with(
                ['name' => 'captcha', 'class' => 'form-control', 'value' => ''],
                [
                    'theme' => 'dark',
                    'size' => 'large',
                    'extra' => 1,
                    'js_verify' => false,
                    'route' => '',
                    'profile' => 'cloudflare',
                ],
            )
            ->willReturn('<captcha-html>');

        $field = $this->createField($driver);
        $field->captchaOptions(['theme' => 'dark', 'size' => 'small'])
            ->profile('cloudflare');

        $input = h('input', ['name' => 'captcha', 'class' => 'form-control', 'value' => 'old-token']);

        // Render-time options override captchaOptions, but the field profile always wins.
        $html = $field->buildFieldElement($input, ['size' => 'large', 'extra' => 1, 'profile' => 'other']);

        self::assertSame('<captcha-html>', $html);
    }

    #[Test]
    public function jsVerifyIsPassedToDriverAsBoolean(): void
    {
        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->once())
            ->method('input')
            ->with(
                $this->anything(),
                $this->callback(fn(array $options) => $options['js_verify'] === true),
            )
            ->willReturn('');

        $field = $this->createField($driver);
        $field->jsVerify(1);

        $field->buildFieldElement($this->input());
    }

    #[Test]
    public function imageRouteCallableReceivesFieldAndOptionsAndResultIsStringified(): void
    {
        $receivedField = null;
        $receivedOptions = null;

        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->once())
            ->method('input')
            ->with(
                $this->anything(),
                $this->callback(fn(array $options) => $options['route'] === '/captcha/7'),
            )
            ->willReturn('');

        $field = $this->createField($driver);
        $field->captchaOptions(['id' => 7])
            ->imageRoute(function (CaptchaField $f, array $options) use (&$receivedField, &$receivedOptions) {
                $receivedField = $f;
                $receivedOptions = $options;

                return '/captcha/' . $options['id'];
            });

        $field->buildFieldElement($this->input());

        self::assertSame($field, $receivedField);
        self::assertSame(['id' => 7, 'js_verify' => false], $receivedOptions);
    }

    #[Test]
    public function imageRouteFallsBackToEmptyStringWhenNotSet(): void
    {
        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->once())
            ->method('input')
            ->with(
                $this->anything(),
                $this->callback(fn(array $options) => $options['route'] === ''),
            )
            ->willReturn('');

        $this->createField($driver)->buildFieldElement($this->input());
    }

    #[Test]
    public function validateSkipsDriverWhenAutoValidateIsDisabled(): void
    {
        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->never())->method('verify');

        $result = $this->createField($driver)->validate('whatever');

        self::assertInstanceOf(ValidateResult::class, $result);
        self::assertTrue($result->isSuccess());
    }

    #[Test]
    public function validatePassesValueAndOptionsToDriverWhenAutoValidateEnabled(): void
    {
        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->once())
            ->method('verify')
            ->with(
                'token-123',
                ['theme' => 'dark', 'js_verify' => true, 'route' => '/c'],
            )
            ->willReturn(true);

        $field = $this->createField($driver);
        $field->autoValidate(true)
            ->jsVerify(true)
            ->captchaOptions(['theme' => 'dark'])
            ->imageRoute('/c');

        $result = $field->validate('token-123');

        self::assertTrue($result->isSuccess());
    }

    #[Test]
    public function validateVerifiesEmptyValueInsteadOfShortCircuiting(): void
    {
        $driver = $this->createMock(CaptchaDriverInterface::class);
        $driver->expects($this->once())
            ->method('verify')
            ->with('', $this->anything())
            ->willReturn(false);

        $field = $this->createField($driver);
        $field->autoValidate(true)->required(true);

        $this->expectException(ValidateFailException::class);
        $this->expectExceptionMessageIsOrContains('luna.field.captcha.message.verify.fail');

        $field->validate('');
    }

    #[Test]
    public function validateThrowsTranslatedFailureWhenDriverRejectsToken(): void
    {
        $driver = $this->createStub(CaptchaDriverInterface::class);
        $driver->method('verify')->willReturn(false);

        $field = $this->createField($driver);
        $field->autoValidate(true);

        $this->expectException(ValidateFailException::class);
        $this->expectExceptionMessageIsOrContains('luna.field.captcha.message.verify.fail');

        $field->validate('wrong-token');
    }

    #[Test]
    public function validateDropsRequiredRuleSoVerifiedCaptchaWithEmptyValuePasses(): void
    {
        $driver = $this->createStub(CaptchaDriverInterface::class);
        $driver->method('verify')->willReturn(true);

        $field = $this->createField($driver);
        $field->autoValidate(true)->required(true);

        $result = $field->validate('');

        self::assertTrue($result->isSuccess());
        self::assertFalse($field->isRequired());
    }

    #[Test]
    public function validateDropsRequiredRuleWhenAutoValidateIsDisabled(): void
    {
        $field = $this->createField($this->createStub(CaptchaDriverInterface::class));
        $field->required(true);

        $result = $field->validate('');

        self::assertTrue($result->isSuccess());
        self::assertFalse($field->isRequired());
    }

    #[Test]
    public function getDriverResolvesProfileDriverFromContainerAndCachesIt(): void
    {
        $stub = $this->createStub(CaptchaDriverInterface::class);
        $this->container->set(CaptchaDriverInterface::class, $stub, tag: 'cloudflare');

        $field = $this->container->newInstance(CaptchaField::class);
        $field->profile('cloudflare');

        $first = $field->getDriver();

        self::assertSame($stub, $first);
        self::assertSame($first, $field->getDriver());
    }
}
