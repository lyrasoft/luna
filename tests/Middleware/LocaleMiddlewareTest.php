<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Middleware;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Middleware\LocaleMiddleware;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Http\BrowserNext;
use Windwalker\Core\Router\Event\AfterRouteBuildEvent;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\Router;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Core\State\AppState;
use Windwalker\Event\EventEmitter;
use Windwalker\Http\Response\Response;

class LocaleMiddlewareTest extends TestCase
{
    private function createApp(
        bool $i18nEnabled,
        ?AppState $state = null,
        ?BrowserNext $browser = null,
        ?LocaleService $localeService = null,
        ?Navigator $nav = null,
    ): AppContext {
        $app = $this->createStub(AppContext::class);
        $app->method('config')->willReturn($i18nEnabled);
        $app->method('getState')->willReturn($state ?? $this->createStub(AppState::class));
        $app->method('retrieve')->willReturn($browser ?? $this->createStub(BrowserNext::class));
        $app->method('service')->willReturnCallback(
            fn(string $class) => match ($class) {
                LocaleService::class => $localeService ?? $this->createStub(LocaleService::class),
                Navigator::class => $nav ?? $this->createStub(Navigator::class),
                default => null,
            },
        );

        return $app;
    }

    private function createLocaleService(): LocaleService
    {
        $localeService = $this->createStub(LocaleService::class);
        $localeService->method('isUriPrefixEnabled')->willReturn(false);

        return $localeService;
    }

    private function createMiddleware(AppContext $app, bool $useBrowser = false, bool $uriPrefix = false): LocaleMiddleware
    {
        return new LocaleMiddleware($app, useBrowser: $useBrowser, uriPrefix: $uriPrefix);
    }

    private function createHandler(): RequestHandlerInterface
    {
        $handler = $this->createMock(RequestHandlerInterface::class);
        $handler->expects($this->once())->method('handle')->willReturn(new Response());

        return $handler;
    }

    #[Test]
    public function disabledI18nPassesThroughWithoutSettingLocale(): void
    {
        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('setLocale');

        $app = $this->createApp(false, localeService: $localeService);

        $this->createMiddleware($app, useBrowser: true)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function matchedLocaleIsRememberedAndApplied(): void
    {
        $state = $this->createMock(AppState::class);
        $state->expects($this->atLeastOnce())->method('get')->with('matched_locale')->willReturn('ja-JP');
        $state->expects($this->once())->method('remember')->with('locale', 'ja-JP');

        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->once())->method('setLocale')->with('ja-JP');
        $localeService->method('isUriPrefixEnabled')->willReturn(false);

        $app = $this->createApp(true, state: $state, localeService: $localeService);

        $this->createMiddleware($app)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function sessionLocaleIsUsedWhenNoMatchedLocale(): void
    {
        $state = $this->createStub(AppState::class);
        $state->method('get')->willReturnCallback(
            fn(string $key) => $key === 'locale' ? 'zh-TW' : null,
        );

        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->once())->method('setLocale')->with('zh-TW');
        $localeService->method('isUriPrefixEnabled')->willReturn(false);

        $app = $this->createApp(true, state: $state, localeService: $localeService);

        $this->createMiddleware($app)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function browserLanguageIsUsedForNonRobotWhenNoLocaleResolved(): void
    {
        $browser = $this->createStub(BrowserNext::class);
        $browser->method('isRobot')->willReturn(false);

        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->once())->method('getBrowserLanguage')->willReturn('en-US');
        $localeService->expects($this->once())->method('setLocale')->with('en-US');
        $localeService->method('isUriPrefixEnabled')->willReturn(false);

        $app = $this->createApp(true, browser: $browser, localeService: $localeService);

        $this->createMiddleware($app, useBrowser: true)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function robotDoesNotTriggerBrowserLanguageDetection(): void
    {
        $browser = $this->createStub(BrowserNext::class);
        $browser->method('isRobot')->willReturn(true);

        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('getBrowserLanguage');
        $localeService->expects($this->never())->method('setLocale');
        $localeService->method('isUriPrefixEnabled')->willReturn(false);

        $app = $this->createApp(true, browser: $browser, localeService: $localeService);

        $this->createMiddleware($app, useBrowser: true)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function browserLanguageIsSkippedWhenUseBrowserIsOff(): void
    {
        $browser = $this->createStub(BrowserNext::class);
        $browser->method('isRobot')->willReturn(false);

        $localeService = $this->createMock(LocaleService::class);
        $localeService->expects($this->never())->method('getBrowserLanguage');
        $localeService->expects($this->never())->method('setLocale');
        $localeService->method('isUriPrefixEnabled')->willReturn(false);

        $app = $this->createApp(true, browser: $browser, localeService: $localeService);

        $this->createMiddleware($app, useBrowser: false)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function navigatorListenerIsRegisteredOnlyWhenUriPrefixIsEnabled(): void
    {
        $state = $this->createStub(AppState::class);
        $state->method('get')->willReturn('en-US');

        $nav = $this->createStub(Navigator::class);

        $localeService = $this->createMock(LocaleService::class);
        $localeService->method('isUriPrefixEnabled')->willReturn(true);
        $localeService->expects($this->once())
            ->method('listenNavigatorBuildEventOnce')
            ->with($nav, $this->isInstanceOf(\Closure::class));

        $app = $this->createApp(true, state: $state, localeService: $localeService, nav: $nav);

        $this->createMiddleware($app, uriPrefix: true)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }

    #[Test]
    public function navigatorBuildAddsLocalePrefixOnlyToRoutesWithLocaleMiddleware(): void
    {
        $state = $this->createStub(AppState::class);
        $state->method('get')->willReturn('ja-JP');

        $lang = new Language();
        $lang->alias = 'ja';

        $localeService = $this->createStub(LocaleService::class);
        $localeService->method('isUriPrefixEnabled')->willReturn(true);
        $localeService->method('getCurrentLanguage')->willReturn($lang);

        $nav = null;
        $app = $this->createStub(AppContext::class);
        $app->method('config')->willReturn(true);
        $app->method('getState')->willReturn($state);
        $app->method('retrieve')->willReturn($this->createStub(BrowserNext::class));
        $app->method('service')->willReturnCallback(
            function (string $class) use (&$nav, $localeService) {
                return match ($class) {
                    LocaleService::class => $localeService,
                    Navigator::class => $nav,
                    default => null,
                };
            },
        );
        $app->method('getSystemUri')->willReturn(new SystemUri('http://example.com'));
        $app->method('getMatchedRoute')->willReturn(new Route('with_locale', '/article/{id}'));

        $middleware = $this->createMiddleware($app, uriPrefix: true);

        $router = new Router([
            'with_locale' => new Route(
                'with_locale',
                '/article/{id}',
                ['extra' => ['middlewares' => [$middleware]]],
            ),
            'without_locale' => new Route('without_locale', '/about'),
        ]);

        $nav = new Navigator($router, new EventEmitter(), $app);

        $localeService->method('listenNavigatorBuildEventOnce')->willReturnCallback(
            fn(Navigator $n, \Closure $listener) => $n->on(AfterRouteBuildEvent::class, $listener)
        );

        $middleware->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );

        self::assertSame('/ja/article/1', (string) $nav->to('with_locale', ['id' => 1]));
        self::assertSame('/about', (string) $nav->to('without_locale'));
    }

    #[Test]
    public function navigatorListenerIsSkippedWhenUriPrefixOptionIsOff(): void
    {
        $state = $this->createStub(AppState::class);
        $state->method('get')->willReturn('en-US');

        $localeService = $this->createMock(LocaleService::class);
        $localeService->method('isUriPrefixEnabled')->willReturn(true);
        $localeService->expects($this->never())->method('listenNavigatorBuildEventOnce');

        $app = $this->createApp(true, state: $state, localeService: $localeService);

        $this->createMiddleware($app, uriPrefix: false)->process(
            $this->createStub(ServerRequestInterface::class),
            $this->createHandler(),
        );
    }
}
