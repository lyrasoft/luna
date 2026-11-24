<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\User\Handler\UserHandler;
use Lyrasoft\Luna\User\Handler\UserHandlerInterface;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Session\Bridge\BridgeInterface;
use Windwalker\Session\Session;

/**
 * Covers the origin-user session bookkeeping of UserSwitchService against a real users table.
 */
#[AllowMockObjectsWithoutExpectations]
class UserSwitchServiceTest extends TestCase
{
    use DatabaseTestTrait;

    private array $store = [];

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(User::class)->getTableName());
    }

    private function createService(): UserSwitchService
    {
        $session = $this->createStub(Session::class);
        $session->method('get')->willReturnCallback(fn($key) => $this->store[$key] ?? null);
        $session->method('set')->willReturnCallback(function ($key, $value) use ($session) {
            $this->store[$key] = $value;

            return $session;
        });
        $session->method('has')->willReturnCallback(fn($key) => array_key_exists($key, $this->store));
        $session->method('remove')->willReturnCallback(function ($key) use ($session) {
            unset($this->store[$key]);

            return $session;
        });
        $session->method('getId')->willReturn('sess-1');
        // Not a PhpBridge, so UserHandler::syncToDatabaseSession() stays a no-op.
        $session->method('getBridge')->willReturn($this->createStub(BridgeInterface::class));

        $appContext = $this->createStub(AppContext::class);
        $appContext->method('config')->willReturn(null);

        $handler = new UserHandler($appContext, $session, self::$orm, ['entity' => User::class]);

        $app = $this->createStub(ApplicationInterface::class);
        $app->method('service')->willReturnCallback(
            fn(string $id) => match ($id) {
                UserHandlerInterface::class => $handler,
                default => null,
            }
        );

        $userService = new UserService($app, self::$orm, $session);

        return new UserSwitchService(
            $this->createStub(ApplicationInterface::class),
            $session,
            $userService
        );
    }

    private function saveUser(string $username): User
    {
        $user = new User();
        $user->username = $username;
        $user->email = $username . '@example.com';
        $user->name = $username;
        $user->enabled = true;

        return self::$orm->createOne(User::class, $user);
    }

    private function loginAs(User $user): void
    {
        $this->store['login_user_id'] = $user->id;
    }

    #[Test]
    public function switchStoresOriginAndLogsInTargetUser(): void
    {
        $origin = $this->saveUser('origin');
        $target = $this->saveUser('target');
        $this->loginAs($origin);

        $service = $this->createService();
        $result = $service->switch($target, ['keepaccess' => true]);

        self::assertSame($service, $result);
        self::assertSame($origin->id, $service->getOriginUserId());
        self::assertSame($origin->id, $this->store[UserSwitchService::USER_MASK_ID]);
        self::assertSame($target->id, $this->store['login_user_id']);
    }

    #[Test]
    public function switchWithoutKeepAccessClearsMask(): void
    {
        $origin = $this->saveUser('origin2');
        $target = $this->saveUser('target2');
        $this->loginAs($origin);

        $service = $this->createService();
        $service->switch($target);

        self::assertNull($this->store[UserSwitchService::USER_MASK_ID]);
        self::assertSame($target->id, $this->store['login_user_id']);
    }

    #[Test]
    public function switchKeepsExistingOriginWhenAlreadySwitched(): void
    {
        $origin = $this->saveUser('first');
        $second = $this->saveUser('second');
        $target = $this->saveUser('third');
        $this->loginAs($second);

        $service = $this->createService();
        $service->setOriginUserId($origin->id);
        $service->switch($target);

        self::assertSame($origin->id, $service->getOriginUserId());
        self::assertNull($this->store[UserSwitchService::USER_MASK_ID]);
        self::assertSame($target->id, $this->store['login_user_id']);
    }

    #[Test]
    public function recoverLogsInOriginUserAndClearsSwitch(): void
    {
        $origin = $this->saveUser('recover-origin');
        $target = $this->saveUser('recover-target');
        $this->loginAs($target);

        $service = $this->createService();
        $service->setOriginUserId($origin->id);
        $service->recover();

        self::assertFalse($service->hasSwitched());
        self::assertSame($origin->id, $this->store['login_user_id']);
    }

    #[Test]
    public function recoverThrowsWhenNoOriginUser(): void
    {
        $this->expectException(ValidateFailException::class);

        $this->createService()->recover();
    }

    #[Test]
    public function hasSwitchedIsFalseByDefault(): void
    {
        self::assertFalse($this->createService()->hasSwitched());
    }

    #[Test]
    public function setOriginUserIdStoresValueAndMarksSwitched(): void
    {
        $service = $this->createService();

        $result = $service->setOriginUserId(42);

        self::assertSame($service, $result);
        self::assertTrue($service->hasSwitched());
        self::assertSame(42, $service->getOriginUserId());
    }

    #[Test]
    public function getOriginUserIdReturnsNullWhenNotSet(): void
    {
        self::assertNull($this->createService()->getOriginUserId());
    }

    #[Test]
    public function removeOriginUserIdClearsOriginAndKeepAccess(): void
    {
        $this->store['keepaccess'] = true;
        $service = $this->createService();
        $service->setOriginUserId(7);

        $result = $service->removeOriginUserId();

        self::assertSame($service, $result);
        self::assertFalse($service->hasSwitched());
        self::assertNull($service->getOriginUserId());
        self::assertArrayNotHasKey('keepaccess', $this->store);
    }
}
