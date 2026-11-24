<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Subscriber\AutoOpenGraphSubscriber;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Html\Metadata;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Core\State\AppState;
use Windwalker\Core\View\Event\BeforeRenderEvent;
use Windwalker\Core\View\View;
use Windwalker\DI\Container;

class AutoOpenGraphSubscriberTest extends TestCase
{
    private function createEvent(array $existingOg, ?string $siteName, array &$added): BeforeRenderEvent
    {
        $metadata = $this->createStub(Metadata::class);
        $metadata->method('getOpenGraphs')->willReturn(array_fill_keys($existingOg, 'x'));

        $htmlFrame = $this->createStub(HtmlFrame::class);
        $htmlFrame->method('getMetadata')->willReturn($metadata);
        $htmlFrame->method('getSiteName')->willReturn($siteName);
        $htmlFrame->method('addOpenGraph')->willReturnCallback(
            function (string $type, string $content) use (&$added, $htmlFrame) {
                $added[$type] = $content;

                return $htmlFrame;
            }
        );

        $view = $this->createStub(View::class);
        $view->method('getHtmlFrame')->willReturn($htmlFrame);

        $event = new BeforeRenderEvent(
            response: null,
            view: $view,
            viewModel: new \stdClass(),
            state: $this->createStub(AppState::class),
            layout: 'page',
            data: [],
        );

        return $event;
    }

    private function createSubscriber(string $url = 'https://example.com/page'): AutoOpenGraphSubscriber
    {
        $systemUri = new class ($url) extends SystemUri {
            public function __construct(private string $fullUrl) {}

            public function full(): string
            {
                return $this->fullUrl;
            }
        };

        $app = $this->createStub(AppContext::class);
        $app->method('getSystemUri')->willReturn($systemUri);

        $container = new Container();
        $container->set(AppContext::class, $app);

        return new AutoOpenGraphSubscriber($container);
    }

    #[Test]
    public function beforeRenderAddsMissingOpenGraphTags(): void
    {
        $added = [];
        $event = $this->createEvent([], 'My Site', $added);

        $this->createSubscriber()->beforeRender($event);

        self::assertSame(
            [
                'og:site_name' => 'My Site',
                'og:url' => 'https://example.com/page',
                'og:type' => 'website',
            ],
            $added
        );
    }

    #[Test]
    public function beforeRenderSkipsSiteNameWhenFrameHasNoSiteName(): void
    {
        $added = [];
        $event = $this->createEvent([], null, $added);

        $this->createSubscriber()->beforeRender($event);

        self::assertArrayNotHasKey('og:site_name', $added);
        self::assertSame('https://example.com/page', $added['og:url']);
        self::assertSame('website', $added['og:type']);
    }

    #[Test]
    public function beforeRenderKeepsExistingOpenGraphTags(): void
    {
        $added = [];
        $event = $this->createEvent(
            ['og:site_name', 'og:url', 'og:type'],
            'My Site',
            $added,
        );

        $this->createSubscriber()->beforeRender($event);

        self::assertSame([], $added);
    }
}
