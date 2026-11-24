<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\Subscriber\UserSwitchSubscriber;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Router\Route;
use Windwalker\Core\State\AppState;
use Windwalker\Core\View\Event\BeforeRenderEvent;
use Windwalker\Core\View\View;
use Windwalker\DI\Container;
use Windwalker\Session\Session;

class UserSwitchSubscriberTest extends TestCase
{
    private function createEvent(): BeforeRenderEvent
    {
        return new BeforeRenderEvent(
            response: null,
            view: $this->createStub(View::class),
            viewModel: new \stdClass(),
            state: $this->createStub(AppState::class),
            layout: 'page',
            data: [],
        );
    }

    /**
     * @return array{0: Container, 1: AppContext}
     */
    private function createContainer(
        string $namespace,
        bool $hasSwitched,
        ?Session $session,
        ?RendererService $renderer = null,
    ): array {
        $switcher = $this->createStub(UserSwitchService::class);
        $switcher->method('hasSwitched')->willReturn($hasSwitched);

        $userService = $this->createStub(UserService::class);
        $userService->method('getUser')->willReturn(new User());

        $route = $this->createStub(Route::class);
        $route->method('getExtraValue')->willReturnCallback(
            static fn (string $key) => $key === 'namespace' ? $namespace : null
        );

        $services = [
            UserSwitchService::class => $switcher,
            UserService::class => $userService,
            RendererService::class => $renderer ?? $this->createStub(RendererService::class),
        ];

        $app = $this->createStub(AppContext::class);
        $app->method('service')->willReturnCallback(
            static fn (string $id) => $services[$id]
        );
        $app->method('getMatchedRoute')->willReturn($route);

        $container = new Container();
        $container->set(AppContext::class, $app);

        if ($session !== null) {
            $container->set(Session::class, $session);
        }

        return [$container, $app];
    }

    #[Test]
    public function beforeRenderDoesNothingWithoutSession(): void
    {
        [$container] = $this->createContainer('admin', true, null);

        $handlerCalled = false;
        $subscriber = new UserSwitchSubscriber(
            $container,
            static function () use (&$handlerCalled): void {
                $handlerCalled = true;
            },
        );

        $subscriber->beforeRender($this->createEvent());

        self::assertFalse($handlerCalled);
    }

    #[Test]
    public function beforeRenderDoesNothingOutsideAdminNamespace(): void
    {
        $session = $this->createStub(Session::class);

        [$container] = $this->createContainer('front', true, $session);

        $handlerCalled = false;
        $subscriber = new UserSwitchSubscriber(
            $container,
            static function () use (&$handlerCalled): void {
                $handlerCalled = true;
            },
        );

        $subscriber->beforeRender($this->createEvent());

        self::assertFalse($handlerCalled);
    }

    #[Test]
    public function beforeRenderDoesNothingWhenNotSwitched(): void
    {
        $session = $this->createStub(Session::class);

        $renderer = $this->createMock(RendererService::class);
        $renderer->expects(self::never())->method('render');

        [$container] = $this->createContainer('admin', false, $session, $renderer);

        $handlerCalled = false;
        $subscriber = new UserSwitchSubscriber(
            $container,
            static function () use (&$handlerCalled): void {
                $handlerCalled = true;
            },
        );

        $subscriber->beforeRender($this->createEvent());

        self::assertFalse($handlerCalled);
    }

    #[Test]
    public function beforeRenderPassesRenderedNoticeToMessageHandler(): void
    {
        $session = $this->createStub(Session::class);
        $session->method('get')->willReturn(9);

        $renderer = $this->createMock(RendererService::class);
        $renderer->expects(self::once())
            ->method('render')
            ->with('widget.user-switch-notice', self::arrayHasKey('keepaccess'))
            ->willReturn('<div>notice</div>');

        [$container] = $this->createContainer('admin', true, $session, $renderer);

        $received = null;
        $subscriber = new UserSwitchSubscriber(
            $container,
            static function (string $message) use (&$received): void {
                $received = $message;
            },
        );

        $subscriber->beforeRender($this->createEvent());

        self::assertSame('<div>notice</div>', $received);
    }

    #[Test]
    public function getMessageHandlerReturnsSameInstanceAndSetterOverrides(): void
    {
        $container = new Container();
        $subscriber = new UserSwitchSubscriber($container);

        $default = $subscriber->getMessageHandler();

        self::assertInstanceOf(\Closure::class, $default);
        self::assertSame($default, $subscriber->getMessageHandler());

        $custom = static fn (string $message): null => null;
        $subscriber->setMessageHandler($custom);

        self::assertSame($custom, $subscriber->getMessageHandler());
    }
}
