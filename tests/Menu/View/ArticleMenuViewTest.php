<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Menu\View\ArticleMenuView;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\ORM\ORM;

/**
 * Covers ArticleMenuView, which routes to the article item page, resolves the article alias from its
 * id, and checks active state through MenuHelper.
 *
 * ORM is a mock so that no database is needed, and MenuHelper is injected through reflection.
 */
class ArticleMenuViewTest extends TestCase
{
    private ORM $orm;

    private ArticleMenuView $view;

    #[Before]
    protected function createView(): void
    {
        $this->orm = $this->createStub(ORM::class);
        $this->view = new ArticleMenuView($this->orm);
    }

    #[Test]
    public function routeBuildsArticleItemUriFromVariables(): void
    {
        $nav = $this->createMock(Navigator::class);
        $expected = $this->createStub(RouteUri::class);
        $nav->expects($this->once())
            ->method('to')
            ->with('article_item', ['id' => 7, 'alias' => 'hello'])
            ->willReturn($expected);

        $uri = $this->view->route($nav, ['id' => 7, 'alias' => 'hello'], []);

        self::assertSame($expected, $uri);
    }

    #[Test]
    public function prepareVariablesStoreResolvesAliasFromArticleId(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('findOne')
            ->with(\Lyrasoft\Luna\Entity\Article::class, 5)
            ->willReturn(new class () {
                public string $alias = 'hello-world';
            });

        $view = new ArticleMenuView($orm);
        $variables = ['id' => 5];
        $view->prepareVariablesStore($variables);

        self::assertSame('hello-world', $variables['alias']);
    }

    #[Test]
    public function prepareVariablesStoreSetsEmptyAliasWhenArticleIsNotFound(): void
    {
        $orm = $this->createStub(ORM::class);
        $orm->method('findOne')->willReturn(null);

        $view = new ArticleMenuView($orm);
        $variables = ['id' => 99];
        $view->prepareVariablesStore($variables);

        self::assertSame('', $variables['alias']);
    }

    #[Test]
    public function prepareVariablesStoreSkipsLookupWhenIdIsEmpty(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->never())->method('findOne');

        $view = new ArticleMenuView($orm);
        $variables = ['id' => 0];
        $view->prepareVariablesStore($variables);

        self::assertArrayNotHasKey('alias', $variables);
    }

    #[Test]
    public function isActiveChecksArticleItemRouteWithArticleId(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article_item', ['id' => 3])
            ->willReturn(true);

        $this->injectMenuHelper($menuHelper);

        self::assertTrue($this->view->isActive(['id' => 3], []));
    }

    private function injectMenuHelper(MenuHelper $menuHelper): void
    {
        $property = new \ReflectionProperty(\Lyrasoft\Luna\Menu\AbstractMenuView::class, 'menuHelper');
        $property->setValue($this->view, $menuHelper);
    }
}
