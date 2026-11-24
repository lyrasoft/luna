<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Brick\Math\BigInteger;
use Lyrasoft\Luna\Auth\SRP\SRPService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\User\Handler\UserAuthorizationHandlerInterface;
use Lyrasoft\Luna\User\Handler\UserHandlerInterface;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Auth\AuthService;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Security\Exception\UnauthorizedException;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\ORM\ORM;
use Windwalker\SRP\Step\PasswordFile;

class UserServiceTest extends TestCase
{
    /**
     * @var  string[]
     */
    private array $authorizedActions = [];

    public function recordAuthorizedAction(string $action): void
    {
        $this->authorizedActions[] = $action;
    }

    private function createHandler(array $allowedActions = []): UserHandlerInterface
    {
        $test = $this;

        return new class ($test, $allowedActions) implements
            UserHandlerInterface,
            UserAuthorizationHandlerInterface {
            public function __construct(
                private UserServiceTest $test,
                private array $allowedActions,
            ) {}

            public function authorize(string|\UnitEnum $action, mixed $user = null, ...$args): bool
            {
                $name = is_string($action) ? $action : $action->name;

                $this->test->recordAuthorizedAction($name);

                return in_array($name, $this->allowedActions, true);
            }

            public function load(mixed $conditions = null): ?UserEntityInterface
            {
                return null;
            }

            public function login(mixed $user, array $options = []): bool
            {
                return true;
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

    private function createService(UserHandlerInterface $handler, ?AuthService $authService = null): UserService
    {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('service')
            ->willReturnCallback(
                fn(string $id) => match ($id) {
                    UserHandlerInterface::class => $handler,
                    AuthService::class => $authService ?? $this->createStub(AuthService::class),
                    default => null,
                }
            );

        return new UserService($app, $this->createStub(ORM::class));
    }

    /**
     * @param  array<class-string, object>  $services  Services resolved by the app stub.
     */
    private function createServiceWithContainer(
        array $services,
        string $loginName = 'username',
        string $identity = 'alice',
    ): UserService {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('retrieve')
            ->willReturnCallback(
                function (string $id) use ($services, $loginName) {
                    if ($id === LunaPackage::class) {
                        $luna = $this->createStub(LunaPackage::class);
                        $luna->method('getLoginName')->willReturn($loginName);

                        return $luna;
                    }

                    return $services[$id] ?? throw new \RuntimeException("Unexpected service: $id");
                }
            );

        $orm = $this->createStub(ORM::class);
        $orm->method('extractField')->willReturn($identity);

        return new UserService($app, $orm);
    }

    #[Test]
    public function canReturnsTrueWithoutAskingAuthServiceWhenHandlerAuthorizes()
    {
        $authService = $this->createMock(AuthService::class);
        $authService->expects($this->never())->method('authorize');

        $service = $this->createService($this->createHandler(['edit']), $authService);

        self::assertTrue($service->can('edit'));
        self::assertSame(['edit'], $this->authorizedActions);
    }

    #[Test]
    public function canFallsBackToAuthServiceWhenHandlerDenies()
    {
        $authService = $this->createMock(AuthService::class);
        $authService->expects($this->once())
            ->method('authorize')
            ->with('delete')
            ->willReturn(true);

        $service = $this->createService($this->createHandler([]), $authService);

        self::assertTrue($service->can('delete'));
        self::assertSame(['delete'], $this->authorizedActions);
    }

    #[Test]
    public function canAnyReturnsTrueWhenAnyActionIsAuthorized()
    {
        $authService = $this->createStub(AuthService::class);
        $authService->method('authorize')->willReturn(false);

        $service = $this->createService($this->createHandler(['view']), $authService);

        self::assertTrue($service->canAny(['edit', 'view', 'delete']));
        self::assertSame(['edit', 'view'], $this->authorizedActions);
    }

    #[Test]
    public function canAllStopsAtFirstDeniedAction()
    {
        $authService = $this->createStub(AuthService::class);
        $authService->method('authorize')->willReturn(false);

        $service = $this->createService($this->createHandler(['view']), $authService);

        self::assertFalse($service->canAll(['view', 'edit', 'delete']));
        self::assertSame(['view', 'edit'], $this->authorizedActions);
    }

    #[Test]
    public function mustLoadThrowsNotFoundWhenUserDoesNotExist()
    {
        $service = $this->createService($this->createHandler());

        $this->expectException(RouteNotFoundException::class);
        $this->expectExceptionCode(404);

        $service->mustLoad(['id' => 999]);
    }

    #[Test]
    public function hashPasswordForSaveUsesPasswordHasherWhenSrpDisabled()
    {
        $srp = $this->createStub(SRPService::class);
        $srp->method('isEnabled')->willReturn(false);

        $hasher = $this->createMock(PasswordHasherInterface::class);
        $hasher->expects($this->once())
            ->method('hash')
            ->with('secret123')
            ->willReturn('hashed-secret');

        $service = $this->createServiceWithContainer([
            SRPService::class => $srp,
            PasswordHasherInterface::class => $hasher,
        ]);

        $user = new User();
        $user->password = 'secret123';

        $result = $service->hashPasswordForSave($user, 'secret123');

        self::assertSame('hashed-secret', $result->password);
    }

    #[Test]
    public function hashPasswordForSaveStoresSrpVerifierWhenSrpEnabled()
    {
        $verifier = new PasswordFile(BigInteger::of(1234), BigInteger::of(5678));

        $srp = $this->createPartialMock(SRPService::class, ['isEnabled', 'generateVerifier']);
        $srp->method('isEnabled')->willReturn(true);
        $srp->expects($this->once())
            ->method('generateVerifier')
            ->with('alice@example.com', 'secret123')
            ->willReturn($verifier);

        $service = $this->createServiceWithContainer(
            [SRPService::class => $srp],
            loginName: 'email',
            identity: 'alice@example.com',
        );

        $user = new User();
        $user->password = 'secret123';

        $result = $service->hashPasswordForSave($user, 'secret123');

        self::assertSame(
            \Lyrasoft\Luna\Auth\SRP\SRPService::encodePasswordVerifier($verifier->salt, $verifier->verifier),
            $result->password,
        );
        self::assertNotSame('secret123', $result->password);
    }

    #[Test]
    public function getUserIdentityReturnsLoginNameField()
    {
        $service = $this->createServiceWithContainer(
            [],
            loginName: 'email',
            identity: 'alice@example.com',
        );

        $user = new User();
        $user->email = 'alice@example.com';

        self::assertSame('alice@example.com', $service->getUserIdentity($user));
    }

    #[Test]
    public function getLoggedInUserThrowsUnauthorizedWhenGuest()
    {
        $service = $this->createService($this->createHandler());

        $this->expectException(UnauthorizedException::class);
        $this->expectExceptionCode(401);

        $service->getLoggedInUser();
    }
}
