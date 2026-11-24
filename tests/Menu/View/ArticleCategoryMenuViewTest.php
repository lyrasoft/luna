<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\View\ArticleCategoryMenuView;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\ORM\ORM;

/**
 * Covers ArticleCategoryMenuView, which routes to the article category page by path, resolves the
 * category path from its id, and checks active state through MenuHelper.
 *
 * ORM is a mock so that no database is needed, and MenuHelper is injected through reflection.
 */
class ArticleCategoryMenuViewTest extends TestCase
{
    private ArticleCategoryMenuView $view;

    #[Before]
    protected function createView(): void
    {
        $this->view = new ArticleCategoryMenuView($this->createStub(ORM::class));
    }

    #[Test]
    public function routeSetsPathVariableOnCategoryRoute(): void
    {
        $routeUri = $this->createMock(RouteUri::class);
        $routeUri->expects($this->once())
            ->method('var')
            ->with('path', 'news/tech')
            ->willReturn($routeUri);

        $nav = $this->createMock(Navigator::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('article_category')
            ->willReturn($routeUri);

        $uri = $this->view->route($nav, ['path' => 'news/tech'], []);

        self::assertSame($routeUri, $uri);
    }

    #[Test]
    public function prepareVariablesStoreResolvesPathFromCategoryId(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('findResult')
            ->with(\Lyrasoft\Luna\Entity\Category::class, 'path', 4)
            ->willReturn('news/tech');

        $view = new ArticleCategoryMenuView($orm);
        $variables = ['id' => 4];
        $view->prepareVariablesStore($variables);

        self::assertSame('news/tech', $variables['path']);
    }

    #[Test]
    public function prepareVariablesStoreSetsEmptyPathWhenCategoryIsNotFound(): void
    {
        $orm = $this->createStub(ORM::class);
        $orm->method('findResult')->willReturn(null);

        $view = new ArticleCategoryMenuView($orm);
        $variables = ['id' => 99];
        $view->prepareVariablesStore($variables);

        self::assertSame('', $variables['path']);
    }

    #[Test]
    public function prepareVariablesStoreSkipsLookupWhenIdIsEmpty(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->never())->method('findResult');

        $view = new ArticleCategoryMenuView($orm);
        $variables = ['id' => 0, 'path' => 'manual'];
        $view->prepareVariablesStore($variables);

        self::assertSame('manual', $variables['path']);
    }

    #[Test]
    public function isActiveChecksCategoryRouteWithPath(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article_category', ['path' => 'news/tech'])
            ->willReturn(true);

        $property = new \ReflectionProperty(AbstractMenuView::class, 'menuHelper');
        $property->setValue($this->view, $menuHelper);

        self::assertTrue($this->view->isActive(['path' => 'news/tech'], []));
    }
}
