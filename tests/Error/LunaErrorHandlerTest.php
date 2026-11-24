<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Error;

use Lyrasoft\Luna\Error\LunaErrorHandler;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Module\Front\Error\ErrorView;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Provider\RouterProvider;
use Windwalker\Core\Router\Router;
use Windwalker\Core\Testing\AbstractTestApp;
use Windwalker\DI\Container;

#[CoversClass(LunaErrorHandler::class)]
class LunaErrorHandlerTest extends TestCase
{
    private Container $container;

    protected function setUp(): void
    {
        $this->container = new Container();
    }

    #[Test]
    public function defaultRouteIsFrontHome(): void
    {
        $handler = new LunaErrorHandler($this->container);

        self::assertSame('front::home', $handler->getRoute());
        self::assertSame('front::home', $handler->getRouteName());
    }

    #[Test]
    public function setRouteReturnsSelfAndUpdatesRoute(): void
    {
        $handler = new LunaErrorHandler($this->container);

        $result = $handler->setRoute('admin::home');

        self::assertSame($handler, $result);
        self::assertSame('admin::home', $handler->getRoute());
        self::assertSame('admin::home', $handler->getRouteName());
    }

    #[Test]
    public function getRouteNameResolvesClosureRouteThroughContainer(): void
    {
        $handler = new LunaErrorHandler(
            $this->container,
            fn(): string => 'front::error-page',
        );

        self::assertSame('front::error-page', $handler->getRouteName());
    }

    #[Test]
    public function closureRouteReceivesHandlerInjectedUnderItsClassName(): void
    {
        $received = null;

        $handler = new LunaErrorHandler(
            $this->container,
            function (LunaErrorHandler $h) use (&$received): string {
                $received = $h;

                return 'front::home';
            },
        );

        $handler->getRouteName();

        self::assertSame($handler, $received);
    }

    #[Test]
    public function renderErrorPageShows404MessageForNotFound(): void
    {
        $html = $this->renderErrorPage(new RuntimeException('missing', 404));

        self::assertStringContainsString('Page not Found', $html);
        self::assertStringContainsString('404', $html);
    }

    #[Test]
    public function renderErrorPageShows500MessageForServerError(): void
    {
        $html = $this->renderErrorPage(new RuntimeException('boom', 500));

        self::assertStringContainsString('Internal Server Error', $html);
        self::assertStringContainsString('500', $html);
        self::assertStringNotContainsString('boom', $html);
    }

    #[Test]
    public function renderErrorPageFallsBackTo500ForUnexpectedCode(): void
    {
        $html = $this->renderErrorPage(new RuntimeException('weird', 302));

        self::assertStringContainsString('Internal Server Error', $html);
        self::assertStringContainsString('500', $html);
    }

    /**
     * Renders ErrorView through the real app context, the same way the
     * handler does, and returns the HTML body.
     */
    private function renderErrorPage(\Throwable $e): string
    {
        $ctx = AbstractTestApp::$ctx;

        // The view resolves its template against `@views` and `asset.namespace_base`,
        // and needs a Router, which RouterProvider builds from `routing.routes`.
        // The test bootstrap sets none of these, so inject them for this render only.
        $app = AbstractTestApp::$instance;
        $container = $app->getContainer();
        $previousBase = $app->config('asset.namespace_base');
        $previousViews = $app->config('@views');
        $previousRoutes = $app->config('routing.routes');
        $previousTimezone = $app->config('app.timezone');
        $previousServerTimezone = $app->config('app.server_timezone');
        $app->loadConfig([
            '@views' => LunaPackage::path('tests/views'),
            'asset' => ['namespace_base' => 'App\\Module'],
            'routing' => ['routes' => []],
            'app' => ['timezone' => 'UTC', 'server_timezone' => 'UTC'],
        ]);
        $container->registerServiceProvider(new RouterProvider($app));

        try {
            $ctx->service(LangService::class)
                ->loadFileFromPath(LunaPackage::path('resources/languages'), 'luna', 'ini');

            $response = $ctx->renderView(
                ErrorView::class,
                ['exception' => $e, 'stage' => 'front'],
            );

            return (string) $response->getBody();
        } finally {
            $container->remove(Router::class);
            $app->loadConfig([
                '@views' => $previousViews,
                'asset' => ['namespace_base' => $previousBase],
                'routing' => ['routes' => $previousRoutes],
                'app' => ['timezone' => $previousTimezone, 'server_timezone' => $previousServerTimezone],
            ]);
        }
    }
}
