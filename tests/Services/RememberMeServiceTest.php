<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\Services\RememberMeService;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\AfterClass;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\Runtime\Config;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Core\Utilities\Base64Url;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\Database\DatabaseAdapter;
use Windwalker\DI\Container;
use Windwalker\Session\Bridge\BridgeInterface;
use Windwalker\Session\Cookie\CookiesInterface;
use Windwalker\Session\Session;

use function Windwalker\chronos;

#[AllowMockObjectsWithoutExpectations]
class RememberMeServiceTest extends TestCase
{
    use DatabaseTestTrait;

    private array $config = [];

    private array $jar = [];

    protected static function prepareTablesBeforeClass(): void
    {
        // The RememberToken entity uses ServerTimeCast, which needs a ChronosService with server timezone and DB format.
        static::$container->share(
            ChronosService::class,
            fn(Container $container) => new ChronosService(
                new Config(['app' => ['timezone' => 'UTC', 'server_timezone' => 'UTC']]),
                $container->get(DatabaseAdapter::class),
            ),
        );

        TestDatabaseFixtures::resetAndMigrate();
    }

    #[AfterClass]
    public static function removeChronosBinding(): void
    {
        // Avoid leaking the test-only ChronosService binding into other test classes sharing the container.
        static::$container->remove(ChronosService::class);
    }

    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(RememberToken::class)->getTableName());
    }

    private function createService(array $config = []): RememberMeService
    {
        $this->config = array_merge(['user.remember.enabled' => true], $config);
        $this->jar = [];

        $app = $this->createStub(AppContext::class);
        $app->method('config')
            ->willReturnCallback(fn(string $name) => $this->config[$name] ?? null);

        $cookies = $this->createStub(CookiesInterface::class);
        $cookies->method('get')
            ->willReturnCallback(fn(string $name) => $this->jar[$name] ?? null);
        $cookies->method('set')
            ->willReturnCallback(function (string $name, string $value): bool {
                $this->jar[$name] = $value;

                return true;
            });
        $cookies->method('remove')
            ->willReturnCallback(function (string $name): bool {
                unset($this->jar[$name]);

                return true;
            });

        $session = $this->createStub(Session::class);
        $session->method('getId')->willReturn('sess-1');
        $session->method('getCookies')->willReturn($cookies);
        // Not a PhpBridge, so syncToDatabaseSession() stays a no-op.
        $session->method('getBridge')->willReturn($this->createStub(BridgeInterface::class));

        return new RememberMeService(
            $app,
            self::$orm,
            $session,
            $this->createStub(UserService::class),
            $this->createStub(PasswordHasherInterface::class),
        );
    }

    #[Test]
    public function startNewRememberReturnsNullWhenDisabled(): void
    {
        $service = $this->createService(['user.remember.enabled' => false]);

        self::assertNull($service->startNewRemember(1));
        self::assertNull($service->getCookieTokenPair());
    }

    #[Test]
    public function startNewRememberStoresHashedValidatorAndSetsCookie(): void
    {
        $service = $this->createService();

        $item = $service->startNewRemember(7);

        self::assertNotNull($item);
        self::assertSame(7, (int) $item->userId);

        [$cookieSelector, $cookieValidator] = $service->getCookieTokenPair();

        self::assertSame($item->selector, $cookieSelector);
        self::assertSame(32, strlen($cookieValidator));

        // Only the hash of the validator is stored; the raw value lives in the cookie.
        $stored = $service->findTokenItem($item->selector);
        self::assertNotNull($stored);
        self::assertSame(hash('sha256', $cookieValidator, true), $stored->validator);
        self::assertSame('sess-1', $stored->sessId);
    }

    #[Test]
    public function getRenewableTokenItemReturnsTokenForValidCookie(): void
    {
        $service = $this->createService();
        $item = $service->startNewRemember(1);

        $token = $service->getRenewableTokenItem();

        self::assertNotNull($token);
        self::assertSame($item->id, $token->id);
    }

    #[Test]
    public function getRenewableTokenItemRejectsWrongValidatorWithoutForgettingCookie(): void
    {
        $service = $this->createService();
        $item = $service->startNewRemember(1);

        $this->jar[$service->getCookieName()] = $service->encodeRememberToken(
            $item->selector,
            str_repeat('x', 32)
        );

        self::assertNull($service->getRenewableTokenItem());
        self::assertArrayHasKey($service->getCookieName(), $this->jar);
    }

    #[Test]
    public function getRenewableTokenItemForgetsCookieWhenTokenIsMissing(): void
    {
        $service = $this->createService();

        $this->jar[$service->getCookieName()] = $service->encodeRememberToken(
            str_repeat('a', 16),
            str_repeat('b', 32)
        );

        self::assertNull($service->getRenewableTokenItem());
        self::assertArrayNotHasKey($service->getCookieName(), $this->jar);
    }

    #[Test]
    public function getRenewableTokenItemDeletesExpiredTokenAndForgetsCookie(): void
    {
        $service = $this->createService();
        $item = $service->startNewRemember(1);

        $item->expiredAt = chronos('-1 day');
        self::$orm->updateOne($item);

        self::assertNull($service->getRenewableTokenItem());
        self::assertNull($service->findTokenItem($item->selector));
        self::assertArrayNotHasKey($service->getCookieName(), $this->jar);
    }

    #[Test]
    public function getRenewableTokenItemReturnsNullWhenDisabled(): void
    {
        $service = $this->createService();
        $service->startNewRemember(1);

        $this->config['user.remember.enabled'] = false;

        self::assertNull($service->getRenewableTokenItem());
    }

    #[Test]
    public function getCurrentTokenItemReturnsNullWithoutCookie(): void
    {
        $service = $this->createService();

        self::assertNull($service->getCurrentSelector());
        self::assertNull($service->getCurrentTokenItem());
    }

    #[Test]
    public function getCurrentTokenItemReturnsTokenMatchingCookieSelector(): void
    {
        $service = $this->createService();
        $item = $service->startNewRemember(1);

        self::assertSame($item->selector, $service->getCurrentSelector());
        self::assertSame($item->id, $service->getCurrentTokenItem()->id);
    }

    #[Test]
    public function renewRotatesValidatorAndUpdatesCookie(): void
    {
        $service = $this->createService();
        $item = $service->startNewRemember(1);

        [, $oldValidator] = $service->getCookieTokenPair();

        $newValidator = $service->renew($item);

        self::assertNotSame($oldValidator, $newValidator);

        [$selector, $cookieValidator] = $service->getCookieTokenPair();
        self::assertSame($item->selector, $selector);
        self::assertSame($newValidator, $cookieValidator);

        $stored = $service->findTokenItem($item->selector);
        self::assertSame(hash('sha256', $newValidator, true), $stored->validator);

        // The renewed cookie must validate against the stored token.
        self::assertNotNull($service->getRenewableTokenItem());
    }

    #[Test]
    public function renewThrowsWhenDisabled(): void
    {
        $service = $this->createService(['user.remember.enabled' => false]);

        $this->expectException(\LogicException::class);
        $this->expectExceptionMessageIsOrContains('Remember me is not enabled.');

        $service->renew(new RememberToken());
    }

    #[Test]
    public function forgetRemovesTokenRowAndCookie(): void
    {
        $service = $this->createService();
        $item = $service->startNewRemember(1);

        $service->forget();

        self::assertNull($service->findTokenItem($item->selector));
        self::assertNull($service->getCookieTokenPair());
    }

    #[Test]
    public function clearExpiredDeletesOnlyExpiredTokens(): void
    {
        // Probability equals divisor, so the random roll always clears.
        $service = $this->createService([
            'user.remember.clear_probability' => 100,
            'user.remember.clear_divisor' => 100,
        ]);

        $active = $service->startNewRemember(1);
        $expired = $service->startNewRemember(2);
        $expired->expiredAt = chronos('-1 day');
        self::$orm->updateOne($expired);

        $service->clearExpired();

        self::assertNotNull($service->findTokenItem($active->selector));
        self::assertNull($service->findTokenItem($expired->selector));
    }

    #[Test]
    public function encodeAndDecodeRememberTokenRoundTrip(): void
    {
        $service = $this->createService();

        $selector = str_repeat('a', 16);
        $validator = str_repeat('b', 32);

        $encoded = $service->encodeRememberToken($selector, $validator);

        self::assertSame([$selector, $validator], $service->decodeRememberToken($encoded));
    }

    #[Test]
    public function decodeRememberTokenReturnsNullForTooShortInput(): void
    {
        $service = $this->createService();

        // Selector is present but the validator slice is empty.
        self::assertNull($service->decodeRememberToken((string) Base64Url::encode('short')));
        self::assertNull($service->decodeRememberToken(''));
    }

    #[Test]
    public function configGettersUseDefaultsWhenUnset(): void
    {
        $service = $this->createService();

        self::assertSame('WINDWALKER_REMEMBER', $service->getCookieName());
        self::assertSame(1, $service->getClearProbability());
        self::assertSame(100, $service->getClearDivisor());

        $expires = $service->getExpires();
        self::assertInstanceOf(Chronos::class, $expires);
        self::assertGreaterThan(time() + 99 * 86400, $expires->getTimestamp());
    }

    #[Test]
    public function configGettersUseConfiguredValues(): void
    {
        $service = $this->createService([
            'user.remember.cookie_name' => 'MY_REMEMBER',
            'user.remember.clear_probability' => 5,
            'user.remember.clear_divisor' => 50,
            'user.remember.expires' => '2days',
        ]);

        self::assertSame('MY_REMEMBER', $service->getCookieName());
        self::assertSame(5, $service->getClearProbability());
        self::assertSame(50, $service->getClearDivisor());
        self::assertLessThan(time() + 3 * 86400, $service->getExpires()->getTimestamp());
    }
}
