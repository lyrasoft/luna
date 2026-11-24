<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Middleware;

use Lyrasoft\Luna\Middleware\AccessMiddleware;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UriInterface;
use Psr\Http\Server\RequestHandlerInterface;
use RuntimeException;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Security\Exception\UnauthorizedException;
use Windwalker\Http\Response\RedirectResponse;
use Windwalker\Http\Response\Response;

class AccessMiddlewareTest extends TestCase
{
    /**
     * @param  string[]  $allowed  Rules the mocked user is allowed to perform.
     */
    private function createApp(array $allowed = []): ApplicationInterface
    {
        $userService = $this->createStub(UserService::class);
        $userService->method('can')
            ->willReturnCallback(fn(string $rule) => in_array($rule, $allowed, true));

        $app = $this->createStub(ApplicationInterface::class);
        $app->method('service')->willReturn($userService);
        $app->method('call')
            ->willReturnCallback(fn(callable $callable, array $args = []) => $callable(...$args));

        return $app;
    }

    private function createHandler(ResponseInterface $response, bool $expectCalled): RequestHandlerInterface
    {
        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($expectCalled ? $this->once() : $this->never())
            ->method('handle')
            ->willReturn($response);

        return $handler;
    }

    #[Test]
    public function stringRuleAllowedPassesToHandler(): void
    {
        $response = new Response();
        $middleware = new AccessMiddleware($this->createApp(['can.edit']), 'can.edit');

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler($response, true),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function stringRuleDeniedThrowsUnauthorizedWithDefaultCode(): void
    {
        $middleware = new AccessMiddleware($this->createApp(), 'can.edit');

        try {
            $middleware->process(
                $this->createStub(ServerRequestInterface::class),
                $this->createHandler(new Response(), false),
            );
            self::fail('Expected UnauthorizedException was not thrown.');
        } catch (UnauthorizedException $e) {
            self::assertSame(403, $e->getCode());
        }
    }

    #[Test]
    public function arrayRulesPassWhenAnyRuleIsAllowed(): void
    {
        $response = new Response();
        $middleware = new AccessMiddleware($this->createApp(['can.view']), ['can.edit', 'can.view']);

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler($response, true),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function arrayRulesDeniedWhenNoRuleIsAllowed(): void
    {
        $middleware = new AccessMiddleware($this->createApp(), ['can.edit', 'can.view']);

        $this->expectException(UnauthorizedException::class);

        $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response(), false),
        );
    }

    #[Test]
    public function customExceptionClassAndErrorCodeAreUsed(): void
    {
        $middleware = new AccessMiddleware(
            $this->createApp(),
            'can.edit',
            RuntimeException::class,
            418,
        );

        try {
            $middleware->process(
                $this->createStub(ServerRequestInterface::class),
                $this->createHandler(new Response(), false),
            );
            self::fail('Expected RuntimeException was not thrown.');
        } catch (RuntimeException $e) {
            self::assertSame(418, $e->getCode());
        }
    }

    #[Test]
    public function exceptionClosureIsCalledInsteadOfThrowing(): void
    {
        $denied = new Response();
        $middleware = new AccessMiddleware(
            $this->createApp(),
            'can.edit',
            fn() => $denied,
        );

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response(), false),
        );

        self::assertSame($denied, $result);
    }

    #[Test]
    public function closureReturningFalseRaisesError(): void
    {
        $middleware = new AccessMiddleware($this->createApp(), fn() => false);

        $this->expectException(UnauthorizedException::class);

        $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response(), false),
        );
    }

    #[Test]
    public function closureReturningTruePassesToHandler(): void
    {
        $response = new Response();
        $middleware = new AccessMiddleware($this->createApp(), fn() => true);

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler($response, true),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function closureReturningUriRedirects(): void
    {
        $uri = $this->createStub(UriInterface::class);
        $middleware = new AccessMiddleware($this->createApp(), fn() => $uri);

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response(), false),
        );

        self::assertInstanceOf(RedirectResponse::class, $result);
    }

    #[Test]
    public function closureReturningResponseIsReturnedDirectly(): void
    {
        $response = new Response();
        $middleware = new AccessMiddleware($this->createApp(), fn() => $response);

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(new Response(), false),
        );

        self::assertSame($response, $result);
    }

    #[Test]
    public function closureReturningRuleStringIsEvaluatedAsRule(): void
    {
        $response = new Response();
        $middleware = new AccessMiddleware(
            $this->createApp(['can.edit']),
            fn() => 'can.edit',
        );

        $result = $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler($response, true),
        );

        self::assertSame($response, $result);
    }
}
