<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Menu\View\LinkMenuView;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Router\Navigator;

/**
 * Covers LinkMenuView, which uses the configured url verbatim as the menu target and is never active.
 */
class LinkMenuViewTest extends TestCase
{
    #[Test]
    public function routeUsesAbsoluteUrlAsIs(): void
    {
        $view = new LinkMenuView();

        $uri = $view->route(
            $this->createStub(Navigator::class),
            ['url' => 'https://example.com/a?b=c'],
            []
        );

        self::assertSame('https://example.com/a?b=c', (string) $uri);
    }

    #[Test]
    public function routeKeepsRelativeUrlWithQueryString(): void
    {
        $view = new LinkMenuView();

        $uri = $view->route(
            $this->createStub(Navigator::class),
            ['url' => '/about?tab=team'],
            []
        );

        self::assertSame('/about?tab=team', (string) $uri);
    }

    #[Test]
    public function isActiveIsAlwaysFalseEvenWhenUrlMatches(): void
    {
        $view = new LinkMenuView();

        self::assertFalse($view->isActive(['url' => '/about'], []));
    }
}
