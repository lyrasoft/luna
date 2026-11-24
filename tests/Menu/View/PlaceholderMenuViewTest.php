<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Menu\View\PlaceholderMenuView;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Router\Navigator;
use Windwalker\Uri\Uri;

/**
 * Covers PlaceholderMenuView, which routes to the configured url for non-link placeholders
 * and renders through the placeholder layout.
 */
class PlaceholderMenuViewTest extends TestCase
{
    #[Test]
    public function routeUsesHashUrlAsIs(): void
    {
        $view = new PlaceholderMenuView();

        $uri = $view->route($this->createStub(Navigator::class), ['url' => '#'], []);

        self::assertEquals(new Uri('#'), $uri);
    }

    #[Test]
    public function routeUsesJavascriptUrlAsIs(): void
    {
        $view = new PlaceholderMenuView();

        $uri = $view->route($this->createStub(Navigator::class), ['url' => 'javascript://'], []);

        self::assertEquals(new Uri('javascript://'), $uri);
    }

    #[Test]
    public function isActiveIsAlwaysFalse(): void
    {
        $view = new PlaceholderMenuView();

        self::assertFalse($view->isActive(['url' => '#'], []));
    }

    #[Test]
    public function layoutIsThePlaceholderBladeTemplate(): void
    {
        $view = new PlaceholderMenuView();

        self::assertSame('@menu::placeholder.placeholder', $view->getLayout());
    }
}
