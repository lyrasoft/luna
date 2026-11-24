<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\User;

use Lyrasoft\Luna\Entity\User;
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
use Windwalker\ORM\ORM;

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
    public function getLoggedInUserThrowsUnauthorizedWhenGuest()
    {
        $service = $this->createService($this->createHandler());

        $this->expectException(UnauthorizedException::class);
        $this->expectExceptionCode(401);

        $service->getLoggedInUser();
    }
}
