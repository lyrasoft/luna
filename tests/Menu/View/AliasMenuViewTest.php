<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\View;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use Lyrasoft\Luna\Menu\View\AliasMenuView;
use Lyrasoft\Luna\Menu\View\LinkMenuView;
use Lyrasoft\Luna\Services\MenuService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Router\Navigator;
use Windwalker\ORM\ORM;
use Windwalker\Uri\Uri;

/**
 * Covers AliasMenuView, which points at another menu item of a given type and delegates
 * route() and isActive() to that target node.
 *
 * The menu tree is built from in-memory DbMenuNode objects, and the ORM and MenuService are
 * stubbed or mocked, so no database is used.
 */
class AliasMenuViewTest extends TestCase
{
    #[Test]
    public function prepareVariablesStoreResolvesTypeOfTargetMenu(): void
    {
        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('findResult')
            ->with(Menu::class, 'type', 5)
            ->willReturn('article');

        $view = new AliasMenuView($orm, $this->createStub(MenuService::class));

        $variables = ['target' => 5];
        $view->prepareVariablesStore($variables);

        self::assertSame('article', $variables['type']);
    }

    #[Test]
    public function routeDelegatesToTargetMenuRoute(): void
    {
        $menuService = $this->menuServiceReturning(
            $this->makeTree(
                $this->makeNode(
                    $this->makeMenu(5, 'link', ['url' => 'https://example.com/docs']),
                    new LinkMenuView()
                ),
            )
        );

        $view = new AliasMenuView($this->createStub(ORM::class), $menuService);

        $uri = $view->route($this->createStub(Navigator::class), ['target' => 5, 'type' => 'link'], []);

        self::assertSame('https://example.com/docs', (string) $uri);
    }

    #[Test]
    public function routeFallsBackToJavascriptUriWhenTargetIsMissing(): void
    {
        $menuService = $this->menuServiceReturning(
            $this->makeTree(
                $this->makeNode(
                    $this->makeMenu(5, 'link', ['url' => 'https://example.com']),
                    new LinkMenuView()
                ),
            )
        );

        $view = new AliasMenuView($this->createStub(ORM::class), $menuService);

        $uri = $view->route($this->createStub(Navigator::class), ['target' => 99, 'type' => 'link'], []);

        self::assertEquals(new Uri('javascript://'), $uri);
    }

    #[Test]
    public function routeLooksUpMenusOfTheTypeStoredInVariables(): void
    {
        $menuService = $this->createMock(MenuService::class);
        $menuService->expects($this->once())
            ->method('getMenusTree')
            ->with('article')
            ->willReturn($this->makeTree());

        $view = new AliasMenuView($this->createStub(ORM::class), $menuService);

        $view->route($this->createStub(Navigator::class), ['target' => 5, 'type' => 'article'], []);
    }

    #[Test]
    public function routeUsesEmptyTypeWhenTypeIsNotStored(): void
    {
        $menuService = $this->createMock(MenuService::class);
        $menuService->expects($this->once())
            ->method('getMenusTree')
            ->with('')
            ->willReturn($this->makeTree());

        $view = new AliasMenuView($this->createStub(ORM::class), $menuService);

        $view->route($this->createStub(Navigator::class), ['target' => 5], []);
    }

    #[Test]
    public function isActivePassesTargetVariablesAndParamsToTargetView(): void
    {
        $targetView = $this->createMock(AbstractMenuView::class);
        $targetView->expects($this->once())
            ->method('isActive')
            ->with(['url' => '/about'], ['tab' => 'team'])
            ->willReturn(true);

        $menu = $this->makeMenu(5, 'page', ['url' => '/about'], ['tab' => 'team']);
        $menuService = $this->menuServiceReturning(
            $this->makeTree($this->makeNode($menu, $targetView))
        );

        $view = new AliasMenuView($this->createStub(ORM::class), $menuService);

        self::assertTrue($view->isActive(['target' => 5, 'type' => 'page'], []));
    }

    #[Test]
    public function isActiveIsFalseWhenTargetIsMissing(): void
    {
        $view = new AliasMenuView(
            $this->createStub(ORM::class),
            $this->menuServiceReturning($this->makeTree())
        );

        self::assertFalse($view->isActive(['target' => 5, 'type' => 'link'], []));
    }

    private function menuServiceReturning(DbMenuNode $tree): MenuService
    {
        $menuService = $this->createStub(MenuService::class);
        $menuService->method('getMenusTree')->willReturn($tree);

        return $menuService;
    }

    /**
     * The root uses id 1, so targets used in these tests never match the root node.
     */
    private function makeTree(DbMenuNode ...$children): DbMenuNode
    {
        return new DbMenuNode($this->makeMenu(1, 'root', []), $children);
    }

    private function makeNode(Menu $menu, AbstractMenuView $view): DbMenuNode
    {
        $node = new DbMenuNode($menu);
        $node->setViewInstance($view);

        return $node;
    }

    private function makeMenu(int $id, string $view, array $variables, array $params = []): Menu
    {
        $menu = new Menu();
        $menu->id = $id;
        $menu->view = $view;
        $menu->variables = $variables;
        $menu->params = $params;

        return $menu;
    }
}
