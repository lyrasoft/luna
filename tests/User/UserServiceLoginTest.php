<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Entity\UserRole;
use Lyrasoft\Luna\User\Event\LoginFailEvent;
use Lyrasoft\Luna\User\Handler\UserHandlerInterface;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Auth\AuthService;
use Windwalker\ORM\ORM;

class UserServiceLoginTest extends TestCase
{
    private function createHandler(bool $loginResult = true): UserHandlerInterface
    {
        return new class ($loginResult) implements UserHandlerInterface {
            public array $loggedIn = [];

            public function __construct(private bool $loginResult) {}

            public function load(mixed $conditions = null): ?UserEntityInterface
            {
                return null;
            }

            public function login(mixed $user, array $options = []): bool
            {
                $this->loggedIn[] = $user;

                return $this->loginResult;
            }

            public function logout(mixed $user = null): bool
            {
                return true;
            }

            public function getUserEntityClass(): string
            {
                return User::class;
            }

            public function createUserEntity(array $data = []): object
            {
                return new User();
            }
        };
    }

    private function createService(
        UserHandlerInterface $handler,
        AuthService $authService,
        ?AccessService $accessService = null,
    ): UserService {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('service')
            ->willReturnCallback(
                fn(string $id) => match ($id) {
                    UserHandlerInterface::class => $handler,
                    AuthService::class => $authService,
                    AccessService::class => $accessService ?? $this->createStub(AccessService::class),
                    default => null,
                }
            );

        return new UserService($app, $this->createStub(ORM::class));
    }

    #[Test]
    public function authenticateFallsBackToAuthServiceWhenHandlerIsNotAuthenticator()
    {
        $expected = new AuthResult(AuthResult::SUCCESS, ['username' => 'alice']);

        $authService = $this->createMock(AuthService::class);
        $authService->expects($this->once())
            ->method('authenticate')
            ->with(['username' => 'alice'])
            ->willReturn($expected);

        $service = $this->createService($this->createHandler(), $authService);

        self::assertSame($expected, $service->authenticate(['username' => 'alice']));
    }

    #[Test]
    public function attemptToLoginFailureEmitsLoginFailEventAndDoesNotLogin()
    {
        $authService = $this->createStub(AuthService::class);
        $authService->method('authenticate')->willReturn(false);

        $handler = $this->createHandler();
        $service = $this->createService($handler, $authService);

        $failed = [];
        $service->on(
            LoginFailEvent::class,
            function (LoginFailEvent $event) use (&$failed) {
                $failed[] = $event;
            }
        );

        $result = $service->attemptToLogin(['username' => 'alice', 'password' => 'bad']);

        self::assertFalse($result);
        self::assertCount(1, $failed);
        self::assertSame([], $handler->loggedIn);
    }

    #[Test]
    public function attemptToLoginSuccessLogsInUserAndReturnsResult()
    {
        $authResult = new AuthResult(AuthResult::SUCCESS, ['username' => 'alice']);

        $authService = $this->createStub(AuthService::class);
        $authService->method('authenticate')->willReturn($authResult);

        $handler = $this->createHandler(true);
        $service = $this->createService($handler, $authService);

        $result = $service->attemptToLogin(['username' => 'alice', 'password' => 'secret']);

        self::assertInstanceOf(AuthResult::class, $result);
        self::assertCount(1, $handler->loggedIn);
        self::assertInstanceOf(User::class, $handler->loggedIn[0]);
    }

    #[Test]
    public function verifyLoginAccessReturnsSuccessResultWhenNoListenerDenies()
    {
        $service = $this->createService($this->createHandler(), $this->createStub(AuthService::class));

        $result = $service->verifyLoginAccess(new User());

        self::assertInstanceOf(AuthResult::class, $result);
        self::assertTrue($result->isSuccess());
    }

    #[Test]
    public function verifyLoginAccessReturnsFalseWhenAuthorizeEventFails()
    {
        $service = $this->createService($this->createHandler(), $this->createStub(AuthService::class));

        $resultSet = new ResultSet();

        $service->on(
            \Lyrasoft\Luna\User\Event\LoginAuthEvent::class,
            static function () {
                throw new \Lyrasoft\Luna\User\Exception\AuthenticateFailException('denied');
            }
        );

        $result = $service->verifyLoginAccess(new User(), $resultSet);

        self::assertFalse($result);
        self::assertCount(1, $resultSet->getResults());
        self::assertArrayHasKey('authorize', $resultSet->getResults());
    }

    #[Test]
    public function isRoleDelegatesToAccessService()
    {
        $role = new UserRole();

        $accessService = $this->createMock(AccessService::class);
        $accessService->expects($this->once())
            ->method('userIsRole')
            ->with($this->isInstanceOf(UserEntityInterface::class), $role)
            ->willReturn(true);

        $service = $this->createService(
            $this->createHandler(),
            $this->createStub(AuthService::class),
            $accessService
        );

        self::assertTrue($service->isRole($role));
    }

    #[Test]
    public function getUserRolesDelegatesToAccessService()
    {
        $roles = [new UserRole()];

        $accessService = $this->createMock(AccessService::class);
        $accessService->expects($this->once())
            ->method('getUserRoles')
            ->with($this->isInstanceOf(UserEntityInterface::class))
            ->willReturn($roles);

        $service = $this->createService(
            $this->createHandler(),
            $this->createStub(AuthService::class),
            $accessService
        );

        self::assertSame($roles, $service->getUserRoles(new User()));
    }
}
