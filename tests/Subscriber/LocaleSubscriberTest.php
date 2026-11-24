<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Services\LocaleService;
use Lyrasoft\Luna\Subscriber\LocaleSubscriber;
use Psr\Http\Message\ServerRequestInterface;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Events\Web\BeforeRoutingEvent;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Core\State\AppState;
use Windwalker\DI\Container;


class LocaleSubscriberTest extends TestCase
{
    private AppContext $app;

    private LocaleService $localeService;

    private Container $container;

    private AppState $state;

    /** @var array<string, mixed> */
    private array $store = [];

    protected function setUp(): void
    {
        $this->container = new Container();

        // In-memory state so assertions can read what the subscriber wrote.
        $this->state = $this->createStub(AppState::class);
        $this->state->method('get')
            ->willReturnCallback(fn (string $key, mixed $default = null) => $this->store[$key] ?? $default);
        $this->state->method('set')
            ->willReturnCallback(function (string $key, mixed $value): AppState {
                $this->store[$key] = $value;

                return $this->state;
            });

        $this->app = new class ($this->container, $this->createStub(SystemUri::class)) extends AppContext {
            public function __construct(Container $container, private SystemUri $systemUri)
            {
                parent::__construct($container);
            }

            public function getSystemUri(): SystemUri
            {
                return $this->systemUri;
            }
        };
        $this->app->setState($this->state);
        $this->localeService = $this->createStub(LocaleService::class);
    }

    private function createSubscriber(): LocaleSubscriber
    {
        $app = $this->app;
        $localeService = $this->localeService;

        return new class ($this->container, $app, $localeService) extends LocaleSubscriber {
            public function __construct(
                Container $container,
                private AppContext $appContext,
                private LocaleService $localeServiceInstance,
            ) {
                parent::__construct($container);
            }

            protected function getAppContext(): AppContext
            {
                return $this->appContext;
            }

            protected function getLocaleService(): LocaleService
            {
                return $this->localeServiceInstance;
            }
        };
    }

    private function createEvent(string $route): BeforeRoutingEvent
    {
        return new BeforeRoutingEvent(
            $this->createStub(SystemUri::class),
            $this->createStub(ServerRequestInterface::class),
            $route,
        );
    }

    private function createLanguage(string $code): Language
    {
        $language = new Language();
        $language->code = $code;

        return $language;
    }

    #[Test]
    public function beforeRoutingDoesNothingWhenLocaleDisabled(): void
    {
        $this->localeService->method('isEnabled')->willReturn(false);
        $this->localeService->method('isUriPrefixEnabled')->willReturn(true);

        $event = $this->createEvent('/en/foo');
        $this->createSubscriber()->beforeRouting($event);

        self::assertSame('/en/foo', $event->route);
        self::assertNull($this->state->get('origin_route'));
    }

    #[Test]
    public function beforeRoutingDoesNothingWhenUriPrefixDisabled(): void
    {
        $this->localeService->method('isEnabled')->willReturn(true);
        $this->localeService->method('isUriPrefixEnabled')->willReturn(false);

        $event = $this->createEvent('/en/foo');
        $this->createSubscriber()->beforeRouting($event);

        self::assertSame('/en/foo', $event->route);
    }

    #[Test]
    public function beforeRoutingKeepsEmptyRouteUnchanged(): void
    {
        $this->localeService->method('isEnabled')->willReturn(true);
        $this->localeService->method('isUriPrefixEnabled')->willReturn(true);
        $this->localeService->method('getLanguageByAlias')->willReturnCallback(function () {
            self::fail('getLanguageByAlias() must not be called for an empty route.');
        });

        $event = $this->createEvent('/');
        $this->createSubscriber()->beforeRouting($event);

        self::assertSame('/', $event->route);
        self::assertSame('/', $this->state->get('origin_route'));
    }

    #[Test]
    public function beforeRoutingKeepsRouteWhenFirstSegmentIsNotLanguage(): void
    {
        $this->localeService->method('isEnabled')->willReturn(true);
        $this->localeService->method('isUriPrefixEnabled')->willReturn(true);
        $this->localeService->method('getLanguageByAlias')->willReturn(null);

        $event = $this->createEvent('/articles/1');
        $this->createSubscriber()->beforeRouting($event);

        self::assertSame('/articles/1', $event->route);
        self::assertNull($this->state->get('matched_locale'));
    }

    #[Test]
    public function beforeRoutingStripsLanguageSegmentAndInjectsLocale(): void
    {
        $this->localeService->method('isEnabled')->willReturn(true);
        $this->localeService->method('isUriPrefixEnabled')->willReturn(true);
        $this->localeService->method('getLanguageByAlias')
            ->willReturnCallback(function (string $alias): ?Language {
                self::assertSame('en', $alias);

                return $this->createLanguage('en-US');
            });

        $event = $this->createEvent('/EN/articles/1');
        $this->createSubscriber()->beforeRouting($event);

        self::assertSame('articles/1', $event->route);
        self::assertSame('articles/1', $this->state->get('origin_route'));
        self::assertSame('en-US', $this->state->get('matched_locale'));
    }

    #[Test]
    public function injectLanguageWithNullDoesNotSetMatchedLocale(): void
    {
        $subscriber = $this->createSubscriber();
        $subscriber->injectLanguage(null);

        self::assertNull($this->state->get('matched_locale'));
    }
}
