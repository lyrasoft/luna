<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Captcha;

use Lyrasoft\Luna\Captcha\GregwarDriver;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionClass;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\State\AppState;

use function Windwalker\chronos;

/**
 * The GregwarDriver requires gregwar/captcha in its constructor, so the driver is created
 * without the constructor and only the verification logic is exercised.
 */
#[AllowMockObjectsWithoutExpectations]
class GregwarDriverTest extends TestCase
{
    private array $session = [];

    private function createDriver(array $options = []): GregwarDriver
    {
        $state = $this->createStub(AppState::class);
        $state->method('get')->willReturnCallback(
            fn(string $key) => $this->session[$key] ?? null
        );

        $reflection = new ReflectionClass(GregwarDriver::class);
        $driver = $reflection->newInstanceWithoutConstructor();

        $this->setProperty($reflection, $driver, 'state', $state);
        $this->setProperty($reflection, $driver, 'rendererService', $this->createStub(RendererService::class));
        $this->setProperty($reflection, $driver, 'options', $options);

        return $driver;
    }

    private function setProperty(ReflectionClass $reflection, object $object, string $name, mixed $value): void
    {
        $property = $reflection->getProperty($name);
        $property->setValue($object, $value);
    }

    #[Test]
    public function verifyPassesWithMatchingPhraseIgnoringCase(): void
    {
        $this->session['captcha'] = ['phrase' => 'AbC12', 'time' => chronos()->toUnix()];

        self::assertTrue($this->createDriver()->verify('abc12'));
    }

    #[Test]
    public function verifyFailsWhenPhraseDoesNotMatch(): void
    {
        $this->session['captcha'] = ['phrase' => 'AbC12', 'time' => chronos()->toUnix()];

        self::assertFalse($this->createDriver()->verify('xyz99'));
    }

    #[Test]
    public function verifyFailsWhenSessionEmpty(): void
    {
        self::assertFalse($this->createDriver()->verify('anything'));
    }

    #[Test]
    public function verifyFailsWhenPhraseEmptyOrTimeMissing(): void
    {
        $this->session['captcha'] = ['phrase' => '', 'time' => chronos()->toUnix()];
        self::assertFalse($this->createDriver()->verify(''));

        $this->session['captcha'] = ['phrase' => 'abc', 'time' => 0];
        self::assertFalse($this->createDriver()->verify('abc'));
    }

    #[Test]
    public function verifyFailsWhenExpired(): void
    {
        $this->session['captcha'] = ['phrase' => 'abc', 'time' => chronos()->toUnix() - 400];

        self::assertFalse($this->createDriver(['lifetime' => 300])->verify('abc'));
    }

    #[Test]
    public function verifyUsesCustomSessionKey(): void
    {
        $this->session['my_captcha'] = ['phrase' => 'abc', 'time' => chronos()->toUnix()];

        $driver = $this->createDriver(['session_key' => 'my_captcha']);

        self::assertTrue($driver->verify('ABC'));
    }
}
