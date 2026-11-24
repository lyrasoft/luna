<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu\Tree;

use Closure;
use Lyrasoft\Luna\Enum\MenuTarget;
use Lyrasoft\Luna\Menu\Tree\MenuNode;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\UriInterface;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Router\Exception\RouteNotFoundException;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\RouteUri;

class MenuNodeTest extends TestCase
{
    private MenuNode $root;

    #[Before]
    public function setUpNode(): void
    {
        $this->root = new MenuNode();
        $this->root->title('Main');
        $this->root->setMenuHelper($this->createStub(MenuHelper::class));
    }

    #[Test]
    public function linkStringIsConvertedToUri(): void
    {
        $node = new MenuNode()->link('/articles');

        $link = $node->getLink();

        self::assertInstanceOf(UriInterface::class, $link);
        self::assertSame('/articles', (string) $link);
    }

    #[Test]
    public function linkNullClearsLink(): void
    {
        $node = new MenuNode()->link('/articles')->link(null);

        self::assertNull($node->getLink());
    }

    #[Test]
    public function targetDefaultsToSelf(): void
    {
        self::assertSame(MenuTarget::SELF, new MenuNode()->getTarget());
    }

    #[Test]
    public function linkTargetAcceptsEnumAndKnownString(): void
    {
        $node = new MenuNode()->linkTarget(MenuTarget::BLANK);
        self::assertSame(MenuTarget::BLANK, $node->getTarget());

        $node->linkTarget('_top');
        self::assertSame(MenuTarget::TOP, $node->getTarget());
    }

    #[Test]
    public function linkTargetFallsBackToSelfForUnknownString(): void
    {
        $node = new MenuNode()->linkTarget('_unknown');

        self::assertSame(MenuTarget::SELF, $node->getTarget());
    }

    #[Test]
    public function htmlAttributesIncludeDefaultMenuIdAndElementAttributes(): void
    {
        $node = new MenuNode()->attr('id', 'main');

        $attrs = $node->getHTMLAttributes();

        self::assertArrayHasKey('data-menu-id', $attrs);
        self::assertSame('', $attrs['data-menu-id']);
        self::assertSame('main', $attrs['id']);
    }

    #[Test]
    public function htmlAttributesMergeArgumentOverridesDefaults(): void
    {
        $node = new MenuNode();

        $attrs = $node->getHTMLAttributes(['data-menu-id' => '7', 'role' => 'menuitem']);

        self::assertSame('7', $attrs['data-menu-id']);
        self::assertSame('menuitem', $attrs['role']);
    }

    #[Test]
    public function elementIsCreatedOnceAndReused(): void
    {
        $node = new MenuNode();

        self::assertSame($node->getElement(), $node->getElement());
    }

    #[Test]
    public function extraValueIsNullWhenMissing(): void
    {
        $node = new MenuNode()->setExtraValue('color', 'red');

        self::assertSame('red', $node->getExtraValue('color'));
        self::assertNull($node->getExtraValue('size'));
    }

    #[Test]
    public function forceActiveOverridesActiveHandler(): void
    {
        $node = new MenuNode()->activeHandler(static fn() => true);

        $node->forceActive(false);
        self::assertFalse($node->isActive());

        $node->forceActive(true);
        self::assertTrue($node->isActive());
    }

    #[Test]
    public function activeHandlerDecidesActiveState(): void
    {
        $node = new MenuNode()->activeHandler(static fn(MenuNode $n) => $n->getTitle() === '');

        self::assertTrue($node->isActive());

        $node->activeHandler(static fn() => false);

        self::assertFalse($node->isActive());
    }

    #[Test]
    public function isActiveMatchesRouteNameAndVariablesFromRouteUri(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article', ['id' => 1], 'Main')
            ->willReturn(true);

        $node = new MenuNode()
            ->setMenuHelper($menuHelper)
            ->link($this->createRouteUri('article', ['id' => 1]));
        $node->setParent($this->root);

        self::assertTrue($node->isActive());
    }

    #[Test]
    public function isActiveReturnsFalseWhenRouteNotFound(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->never())->method('is');

        $uri = new RouteUri(
            static function () {
                throw new RouteNotFoundException('missing');
            },
            null,
            $this->createStub(Navigator::class)
        );

        $node = new MenuNode()->setMenuHelper($menuHelper)->link($uri);
        $node->setParent($this->root);

        self::assertFalse($node->isActive());
    }

    #[Test]
    public function isActiveIgnoresChildrenUnlessRequested(): void
    {
        $parent = new MenuNode()->activeHandler(static fn() => false);
        $child = new MenuNode()->activeHandler(static fn() => true);
        $parent->addChild($child);

        self::assertFalse($parent->isActive());
        self::assertTrue($parent->isActive(true));
    }

    #[Test]
    public function activeForDelegatesPathAndQueryToMenuHelper(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article', ['id' => 1], 'Main')
            ->willReturn(true);

        $node = new MenuNode()
            ->setMenuHelper($menuHelper)
            ->activeFor('article', ['id' => 1]);
        $node->setParent($this->root);

        self::assertTrue($node->isActive());
    }

    #[Test]
    public function activeForUsesFalseQueryByDefault(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with(['article', 'category'], false, 'Main')
            ->willReturn(false);

        $node = new MenuNode()
            ->setMenuHelper($menuHelper)
            ->activeFor(['article', 'category']);
        $node->setParent($this->root);

        self::assertFalse($node->isActive());
    }

    #[Test]
    public function isUsesRootTitleAsNamespace(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article', ['id' => 2], 'Main')
            ->willReturn(true);

        $node = new MenuNode()->setMenuHelper($menuHelper);
        $this->root->addChild($node);

        self::assertTrue($node->is('article', ['id' => 2]));
    }

    #[Test]
    public function isUsesEmptyNamespaceForOrphanNode(): void
    {
        $menuHelper = $this->createMock(MenuHelper::class);
        $menuHelper->expects($this->once())
            ->method('is')
            ->with('article', [], '')
            ->willReturn(false);

        $node = new MenuNode()->setMenuHelper($menuHelper);

        self::assertFalse($node->is('article'));
    }

    #[Test]
    public function hasVisibleChildrenIgnoresHiddenChildren(): void
    {
        $this->root->addChild(new MenuNode()->hidden(true));

        self::assertFalse($this->root->hasVisibleChildren());

        $this->root->addChild(new MenuNode());

        self::assertTrue($this->root->hasVisibleChildren());
    }

    #[Test]
    public function getActiveReturnsFirstActiveNodeDepthFirst(): void
    {
        $inactive = new MenuNode()->activeHandler(static fn() => false);
        $firstActive = new MenuNode()->activeHandler(static fn() => true);
        $secondActive = new MenuNode()->activeHandler(static fn() => true);

        $group = new MenuNode();
        $group->activeHandler(static fn() => false);
        $group->addChild($firstActive);

        $this->root->addChild($inactive);
        $this->root->addChild($group);
        $this->root->addChild($secondActive);

        self::assertSame($firstActive, $this->root->getActive());
    }

    #[Test]
    public function getActiveReturnsNullWhenNoNodeIsActive(): void
    {
        $this->root->addChild(new MenuNode()->activeHandler(static fn() => false));

        self::assertNull($this->root->getActive());
    }

    private function createRouteUri(string $routeName, array $vars): RouteUri
    {
        $route = $this->createStub(Route::class);
        $route->method('getName')->willReturn($routeName);

        $handler = static fn(array $data): array => ['/articles/1', $data, $route];

        return new RouteUri(
            Closure::fromCallable($handler),
            $vars,
            $this->createStub(Navigator::class)
        );
    }
}
