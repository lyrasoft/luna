<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\Tree;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Router\Navigator;
use Windwalker\Uri\Uri;

class DbMenuNodeTest extends TestCase
{
    #[Test]
    public function constructorDefaultsValueToEmptyMenu(): void
    {
        $node = new DbMenuNode();

        self::assertInstanceOf(Menu::class, $node->getValue());
        self::assertNull($node->getValue()->id);
    }

    #[Test]
    public function setValueRejectsNonMenuValue(): void
    {
        $node = new DbMenuNode();

        $this->expectException(\TypeError::class);
        $this->expectExceptionMessageIsOrContains(Menu::class);

        $node->setValue('not a menu');
    }

    #[Test]
    public function titleComesFromMenuEntity(): void
    {
        $menu = new Menu();
        $menu->title = 'Articles';

        $node = new DbMenuNode($menu);

        self::assertSame('Articles', $node->getTitle());
    }

    #[Test]
    public function isHiddenReflectsMenuHiddenFlag(): void
    {
        $menu = new Menu();
        $menu->hidden = true;

        self::assertTrue(new DbMenuNode($menu)->isHidden());

        $menu->hidden = false;

        self::assertFalse(new DbMenuNode($menu)->isHidden());
    }

    #[Test]
    public function hasVisibleChildrenIgnoresHiddenMenus(): void
    {
        $hidden = new Menu();
        $hidden->hidden = true;

        $root = new DbMenuNode();
        $root->setChildren([new DbMenuNode($hidden)]);

        self::assertFalse($root->hasVisibleChildren());

        $root->addChild(new DbMenuNode(new Menu()));

        self::assertTrue($root->hasVisibleChildren());
    }

    #[Test]
    public function htmlAttributesUseMenuIdAndLetMergeOverride(): void
    {
        $menu = new Menu();
        $menu->id = 5;
        $node = new DbMenuNode($menu);

        self::assertSame(['data-menu-id' => 5], $node->getHTMLAttributes());
        self::assertSame(
            ['data-menu-id' => 9, 'role' => 'menuitem'],
            $node->getHTMLAttributes(['data-menu-id' => 9, 'role' => 'menuitem'])
        );
    }

    #[Test]
    public function isMatchesViewAndVariablesSubset(): void
    {
        $menu = new Menu();
        $menu->view = 'article';
        $menu->variables = ['id' => 1, 'lang' => 'en'];
        $node = new DbMenuNode($menu);

        self::assertTrue($node->is('article', ['id' => 1]));
        self::assertFalse($node->is('article', ['id' => 2]));
        self::assertFalse($node->is('category', ['id' => 1]));
    }

    #[Test]
    public function getMenuByIdFindsNestedNode(): void
    {
        $root = $this->createTree();

        $found = $root->getMenuById(3);

        self::assertNotNull($found);
        self::assertSame(3, $found->getValue()->id);
        self::assertNull($root->getMenuById(99));
    }

    #[Test]
    public function getActiveReturnsFirstActiveNodeInTree(): void
    {
        $root = $this->createTree();
        $root->forceActive(false);
        $root->findFirst(static fn(DbMenuNode $n) => $n->getValue()->id === 2)->forceActive(false);
        $root->findFirst(static fn(DbMenuNode $n) => $n->getValue()->id === 3)->forceActive(false);

        $active = new DbMenuNode(new Menu());
        $active->forceActive(true);
        $root->findFirst(static fn(DbMenuNode $n) => $n->getValue()->id === 2)->addChild($active);

        self::assertSame($active, $root->getActive());
    }

    #[Test]
    public function forceActiveWorksWithoutViewInstance(): void
    {
        $node = new DbMenuNode(new Menu());

        $node->forceActive(true);
        self::assertTrue($node->isActive());

        $node->forceActive(false);
        self::assertFalse($node->isActive());
    }

    #[Test]
    public function isActiveDelegatesToViewInstanceWithMenuVariablesAndParams(): void
    {
        $menu = new Menu();
        $menu->variables = ['id' => 1];
        $menu->params = ['layout' => 'grid'];

        $view = $this->createMock(AbstractMenuView::class);
        $view->expects($this->once())
            ->method('isActive')
            ->with(['id' => 1], ['layout' => 'grid'])
            ->willReturn(true);

        $node = new DbMenuNode($menu);
        $node->setViewInstance($view);

        self::assertTrue($node->isActive());
    }

    #[Test]
    public function isActiveChecksChildrenOnlyWhenRequested(): void
    {
        $parentView = $this->createStub(AbstractMenuView::class);
        $parentView->method('isActive')->willReturn(false);

        $childView = $this->createStub(AbstractMenuView::class);
        $childView->method('isActive')->willReturn(true);

        $parent = new DbMenuNode(new Menu());
        $parent->setViewInstance($parentView);

        $child = new DbMenuNode(new Menu());
        $child->setViewInstance($childView);
        $parent->addChild($child);

        self::assertFalse($parent->isActive());
        self::assertTrue($parent->isActive(true));
    }

    #[Test]
    public function routeDelegatesToViewInstanceWithMenuVariablesAndParams(): void
    {
        $menu = new Menu();
        $menu->variables = ['id' => 2];
        $menu->params = ['layout' => 'list'];

        $nav = $this->createStub(Navigator::class);
        $expected = new Uri('/articles/2');

        $view = $this->createMock(AbstractMenuView::class);
        $view->expects($this->once())
            ->method('route')
            ->with($nav, ['id' => 2], ['layout' => 'list'])
            ->willReturn($expected);

        $node = new DbMenuNode($menu);
        $node->setViewInstance($view);

        self::assertSame($expected, $node->route($nav));
    }

    #[Test]
    public function routeReturnsNullWithoutViewInstance(): void
    {
        $node = new DbMenuNode(new Menu());
        $node->setViewInstance(null);

        self::assertNull($node->route($this->createStub(Navigator::class)));
    }

    private function createTree(): DbMenuNode
    {
        $rootMenu = new Menu();
        $rootMenu->id = 1;

        $childMenu = new Menu();
        $childMenu->id = 2;

        $grandMenu = new Menu();
        $grandMenu->id = 3;

        $root = new DbMenuNode($rootMenu);
        $child = new DbMenuNode($childMenu);
        $grand = new DbMenuNode($grandMenu);

        $root->setViewInstance(null);
        $child->setViewInstance(null);
        $grand->setViewInstance(null);

        $child->addChild($grand);
        $root->addChild($child);

        return $root;
    }
}
