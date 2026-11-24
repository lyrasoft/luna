<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\View\RouteMenuView;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Core\Router\Router;

/**
 * Covers RouteMenuView, which builds a URI from a named route and its variables, and checks
 * active state through MenuHelper.
 *
 * The MenuHelper is injected through reflection because AbstractMenuView declares it with #[Inject].
 */
class RouteMenuViewTest extends TestCase
{
    private RouteMenuView $view;

    #[Before]
    protected function createView(): void
    {
        $this->view = new RouteMenuView($this->createStub(Router::class));
    }

    #[Test]
    public function routeBuildsUriFromRouteNameAndVariables(): void
    {
        $nav = $this->createMock(Navigator::class);
        $expected = $this->createStub(RouteUri::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('article_item', ['id' => 1])
            ->willReturn($expected);

        $uri = $this->view->route($nav, ['route' => 'article_item', 'variables' => ['id' => 1]], []);

        self::assertSame($expected, $uri);
    }

    #[Test]
    public function routeUsesEmptyVariablesWhenNoneAreConfigured(): void
    {
        $nav = $this->createMock(Navigator::class);
        $expected = $this->createStub(RouteUri::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('home', [])
            ->willReturn($expected);

        $uri = $this->view->route($nav, ['route' => 'home'], []);

        self::assertSame($expected, $uri);
    }

    #[Test]
    public function isActiveChecksRouteAndVariablesWithMenuHelper(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article_item', ['id' => 1])
            ->willReturn(true);

        $this->injectMenuHelper($menuHelper);

        self::assertTrue($this->view->isActive(['route' => 'article_item', 'variables' => ['id' => 1]], []));
    }

    #[Test]
    public function isActiveUsesEmptyVariablesWhenNoneAreConfigured(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('home', [])
            ->willReturn(false);

        $this->injectMenuHelper($menuHelper);

        self::assertFalse($this->view->isActive(['route' => 'home'], []));
    }

    private function injectMenuHelper(MenuHelper $menuHelper): void
    {
        $property = new \ReflectionProperty(AbstractMenuView::class, 'menuHelper');
        $property->setValue($this->view, $menuHelper);
    }
}
