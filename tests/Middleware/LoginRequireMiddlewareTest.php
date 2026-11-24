<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Middleware;

use Closure;
use Lyrasoft\Luna\Middleware\LoginRequireMiddleware;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use ReflectionProperty;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Router\SystemUri;
use Windwalker\DI\Container;
use Windwalker\Http\Response\RedirectResponse;
use Windwalker\Http\Response\Response;

class LoginRequireMiddlewareTest extends TestCase
{
    private function createMiddleware(
        UserService $userService,
        ?AppContext $app = null,
        ?Container $container = null,
        array|Closure $excludes = [],
        string|Closure $route = 'login',
    ): LoginRequireMiddleware {
        $middleware = new LoginRequireMiddleware($excludes, $route);

        $this->setProperty($middleware, 'userService', $userService);
        $this->setProperty($middleware, 'app', $app ?? $this->createStub(AppContext::class));
        $this->setProperty($middleware, 'container', $container ?? $this->createStub(Container::class));

        return $middleware;
    }

    private function setProperty(object $object, string $name, mixed $value): void
    {
        new ReflectionProperty($object, $name)->setValue($object, $value);
    }

    private function createGuest(): UserService
    {
        $userService = $this->createStub(UserService::class);
        $userService->method('isLogin')->willReturn(false);

        return $userService;
    }

    private function createRouteUri(RedirectResponse $redirect): RouteUri
    {
        $routeUri = $this->createMock(RouteUri::class);
        $routeUri->expects($this->once())->method('withReturn')->willReturnSelf();
        $routeUri->expects($this->once())->method('toResponse')->willReturn($redirect);

        return $routeUri;
    }

    #[Test]
    public function loggedInUserPassesThroughWithoutRedirect(): void
    {
        $response = new Response();

        $userService = $this->createStub(UserService::class);
        $userService->method('isLogin')->willReturn(true);

        $container = $this->createMock(Container::class);
        $container->expects($this->never())->method('get');

        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->once())->method('handle')->willReturn($response);

        $result = $this->createMiddleware($userService, container: $container)->process(
            $this->createStub(ServerRequestInterface::class),
            $handler,
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function guestIsRedirectedToLoginRouteWithReturn(): void
    {
        $redirect = new RedirectResponse('/login');

        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('login')
            ->willReturn($this->createRouteUri($redirect));

        $container = $this->createMock(Container::class);
        $container->expects($this->once())
            ->method('get')
            ->with(Navigator::class)
            ->willReturn($nav);

        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->never())->method('handle');

        $result = $this->createMiddleware($this->createGuest(), container: $container)->process(
            $this->createStub(ServerRequestInterface::class),
            $handler,
        );

        self::assertSame($redirect, $result);
    }

    #[Test]
    public function guestOnExcludedRouteReachesHandler(): void
    {
        $route = $this->createStub(Route::class);
        $route->method('getName')->willReturn('register');

        $systemUri = new SystemUri('http://localhost/index.php/register')
            ->withScriptName('/index.php');

        $app = $this->createStub(AppContext::class);
        $app->method('getMatchedRoute')->willReturn($route);
        $app->method('getSystemUri')->willReturn($systemUri);

        $container = $this->createMock(Container::class);
        $container->expects($this->never())->method('get');

        $response = new Response();
        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->once())->method('handle')->willReturn($response);

        $result = $this->createMiddleware(
            $this->createGuest(),
            app: $app,
            container: $container,
            excludes: ['register'],
        )->process(
            $this->createStub(ServerRequestInterface::class),
            $handler,
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function closureRouteReturningRouteUriIsUsedForRedirect(): void
    {
        $redirect = new RedirectResponse('/custom-login');

        $container = $this->createMock(Container::class);
        $container->expects($this->once())
            ->method('get')
            ->with(Navigator::class)
            ->willReturn($nav = $this->createMock(Navigator::class));
        $container->expects($this->once())
            ->method('call')
            ->willReturn($this->createRouteUri($redirect));

        $nav->expects($this->never())->method('to');

        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->never())->method('handle');

        $result = $this->createMiddleware(
            $this->createGuest(),
            container: $container,
            route: fn() => null,
        )->process(
            $this->createStub(ServerRequestInterface::class),
            $handler,
        );

        self::assertSame($redirect, $result);
    }

    #[Test]
    public function closureRouteReturningStringIsConvertedToRouteUri(): void
    {
        $redirect = new RedirectResponse('/custom-login');

        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())
            ->method('createRouteUri')
            ->with('/custom-login')
            ->willReturn($this->createRouteUri($redirect));

        $container = $this->createMock(Container::class);
        $container->expects($this->once())->method('get')->with(Navigator::class)->willReturn($nav);
        $container->expects($this->once())->method('call')->willReturn('/custom-login');

        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->never())->method('handle');

        $result = $this->createMiddleware(
            $this->createGuest(),
            container: $container,
            route: fn() => '/custom-login',
        )->process(
            $this->createStub(ServerRequestInterface::class),
            $handler,
        );

        self::assertSame($redirect, $result);
    }
}
