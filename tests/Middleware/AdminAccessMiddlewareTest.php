<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Middleware;

use Closure;
use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Middleware\AdminAccessMiddleware;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use ReflectionProperty;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Http\Response\Response;

class AdminAccessMiddlewareTest extends TestCase
{
    private function createMiddleware(UserService $userService): AdminAccessMiddleware
    {
        $middleware = new AdminAccessMiddleware($userService);

        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturn('Authorize failed');

        new ReflectionProperty(AdminAccessMiddleware::class, 'lang')->setValue($middleware, $lang);

        return $middleware;
    }

    private function createHandler(ResponseInterface $response): RequestHandlerInterface
    {
        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->once())->method('handle')->willReturn($response);

        return $handler;
    }

    #[Test]
    public function guestPassesThroughWithoutAdminCheck(): void
    {
        $response = new Response();

        $userService = $this->createMock(UserService::class);
        $userService->method('isLogin')->willReturn(false);
        $userService->expects($this->never())->method('can');
        $userService->expects($this->once())->method('on');

        $result = $this->createMiddleware($userService)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler($response),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function loggedInUserWithAdminAccessPasses(): void
    {
        $response = new Response();

        $userService = $this->createStub(UserService::class);
        $userService->method('isLogin')->willReturn(true);
        $userService->method('can')
            ->willReturnCallback(fn($action) => $action === AccessService::ADMIN_ACCESS_ACTION);

        $result = $this->createMiddleware($userService)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler($response),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function loggedInUserWithoutAdminAccessGetsRouteNotFound(): void
    {
        $userService = $this->createStub(UserService::class);
        $userService->method('isLogin')->willReturn(true);
        $userService->method('can')->willReturn(false);

        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->never())->method('handle');

        $this->expectException(RouteNotFoundException::class);

        $this->createMiddleware($userService)->process(
            $this->createStub(ServerRequestInterface::class),
            $handler,
        );
    }

    #[Test]
    public function loginListenerRejectsUserWithoutAdminAccess(): void
    {
        $listener = null;

        $userService = $this->createStub(UserService::class);
        $userService->method('isLogin')->willReturn(false);
        $userService->method('on')
            ->willReturnCallback(function (string $event, Closure $callback) use (&$listener, $userService) {
                $listener = $callback;

                return $userService;
            });
        $userService->method('can')->willReturn(false);

        $this->createMiddleware($userService)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response()),
        );

        $event = new LoginAuthEvent(
            $this->createStub(UserEntityInterface::class),
            false,
            new ResultSet(),
        );

        try {
            $listener($event);
            self::fail('Expected AuthenticateFailException was not thrown.');
        } catch (AuthenticateFailException $e) {
            self::assertSame(403, $e->getCode());
        }
    }

    #[Test]
    public function loginListenerAllowsUserWithAdminAccess(): void
    {
        $listener = null;

        $userService = $this->createStub(UserService::class);
        $userService->method('isLogin')->willReturn(false);
        $userService->method('on')
            ->willReturnCallback(function (string $event, Closure $callback) use (&$listener, $userService) {
                $listener = $callback;

                return $userService;
            });
        $userService->method('can')->willReturn(true);

        $this->createMiddleware($userService)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response()),
        );

        $event = new LoginAuthEvent(
            $this->createStub(UserEntityInterface::class),
            false,
            new ResultSet(),
        );

        $listener($event);
    }
}
