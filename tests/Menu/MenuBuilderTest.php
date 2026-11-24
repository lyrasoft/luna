<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Menu;

use Lyrasoft\Luna\Menu\MenuBuilder;
use Lyrasoft\Luna\Menu\Tree\MenuNode;
use Lyrasoft\Luna\Menu\Tree\MenuNodeInterface;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;

/**
 * Custom node class used to verify that createNode() resolves non-default node classes through the container.
 */
class MenuBuilderTestCustomNode extends MenuNode {}

/**
 * Covers MenuBuilder tree construction, placeholder nodes, child registration and loading.
 */
class MenuBuilderTest extends TestCase
{
    private MenuHelper $menuHelper;

    #[Before]
    protected function prepareMenuHelper(): void
    {
        $this->menuHelper = $this->createStub(MenuHelper::class);
        $this->menuHelper->method('is')->willReturn(false);
    }

    private function createAppStub(): AppContext
    {
        $app = $this->createStub(AppContext::class);
        $app->method('service')->willReturnCallback(
            fn(string $class) => match ($class) {
                MenuHelper::class => $this->menuHelper,
                default => $this->createStub(Navigator::class),
            }
        );
        $app->method('make')->willReturnCallback(fn(string $class) => new $class());
        $app->method('call')->willReturnCallback(fn(callable $callable) => $callable());
        $app->method('isDebug')->willReturn(false);

        return $app;
    }

    private function createBuilder(?AppContext $app = null): MenuBuilder
    {
        return new MenuBuilder($app ?? $this->createAppStub());
    }

    /**
     * @return  array<string>
     */
    private function titlesOf(MenuNodeInterface $node): array
    {
        return array_map(
            static fn(MenuNode $child) => $child->getTitle(),
            $node->getChildren()
        );
    }

    #[Test]
    public function createTreeSetsRootAsTitledCurrentNode(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $root = $menu->getRoot();

        self::assertSame('mainmenu', $root->getTitle());
        self::assertSame($root, $menu->getCurrent());
        self::assertSame($root, $menu->getTree());
        self::assertSame([], $root->getChildren());
    }

    #[Test]
    public function addAppendsLinkNodeWithTitleAndLinkUnderCurrent(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = $menu->add('Home', 'https://example.com/home');

        self::assertSame(['Home'], $this->titlesOf($menu->getRoot()));
        self::assertSame('link.link', $node->getLayout());
        self::assertSame('https://example.com/home', (string) $node->getLink());
        self::assertSame($node, $menu->getLast());
    }

    #[Test]
    public function addWithoutUriLeavesLinkEmpty(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = $menu->add('Empty');

        self::assertNull($node->getLink());
        self::assertSame('Empty', $node->getTitle());
    }

    #[Test]
    public function addResolvesClosureUriThroughContainerCall(): void
    {
        $app = $this->createMock(AppContext::class);
        $app->method('service')->willReturnCallback(
            fn(string $class) => $class === MenuHelper::class ? $this->menuHelper : $this->createStub(Navigator::class)
        );
        $app->expects($this->once())
            ->method('call')
            ->willReturn('https://example.com/resolved');

        $menu = $this->createBuilder($app)->createTree('mainmenu');

        $node = $menu->add('Resolved', static fn() => 'https://example.com/resolved');

        self::assertSame('https://example.com/resolved', (string) $node->getLink());
    }

    #[Test]
    public function linkBehavesLikeAdd(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = $menu->link('Docs', '/docs');

        self::assertSame(['Docs'], $this->titlesOf($menu->getRoot()));
        self::assertSame('/docs', (string) $node->getLink());
        self::assertSame('link.link', $node->getLayout());
    }

    #[Test]
    public function headerCreatesPlaceholderHeaderNodeWithTitle(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = $menu->header('Section');

        self::assertSame('placeholder.header', $node->getLayout());
        self::assertSame('Section', $node->getTitle());
        self::assertSame(['Section'], $this->titlesOf($menu->getRoot()));
    }

    #[Test]
    public function textCreatesPlaceholderTextNodeWithTitle(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = $menu->text('Some text');

        self::assertSame('placeholder.text', $node->getLayout());
        self::assertSame('Some text', $node->getTitle());
    }

    #[Test]
    public function dividerCreatesPlaceholderDividerNodeAsChild(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = $menu->divider();

        self::assertSame('placeholder.divider', $node->getLayout());
        self::assertSame($node, $menu->getLast());
        self::assertCount(1, $menu->getRoot()->getChildren());
    }

    #[Test]
    public function registerChildrenNestsNodesUnderLastAddedNode(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $parent = $menu->add('Parent');

        $menu->registerChildren(function (MenuBuilder $menu) {
            $menu->add('Child A');
            $menu->add('Child B');
        });

        self::assertSame(['Parent'], $this->titlesOf($menu->getRoot()));
        self::assertSame(['Child A', 'Child B'], $this->titlesOf($parent));
    }

    #[Test]
    public function registerChildrenRestoresPreviousCurrentAfterCallback(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $menu->add('Parent');
        $menu->registerChildren(function (MenuBuilder $menu) {
            $menu->add('Nested');
        });

        $menu->add('Sibling');

        self::assertSame($menu->getRoot(), $menu->getCurrent());
        self::assertSame(['Parent', 'Sibling'], $this->titlesOf($menu->getRoot()));
    }

    #[Test]
    public function registerChildrenForNestsNodesUnderGivenNode(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $target = $menu->add('Target');
        $menu->add('Other');

        $menu->registerChildrenFor($target, function (MenuBuilder $menu) {
            $menu->header('Inside');
        });

        self::assertSame(['Inside'], $this->titlesOf($target));
        self::assertSame(['Target', 'Other'], $this->titlesOf($menu->getRoot()));
        self::assertSame($menu->getRoot(), $menu->getCurrent());
    }

    #[Test]
    public function nestedRegisterChildrenRestoresEachLevel(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $level1 = $menu->add('L1');

        $menu->registerChildren(function (MenuBuilder $menu) {
            $level2 = $menu->add('L2');

            $menu->registerChildren(function (MenuBuilder $menu) {
                $menu->add('L3');
            });

            $menu->add('L2 sibling');
        });

        $menu->add('Root sibling');

        self::assertSame(['L2', 'L2 sibling'], $this->titlesOf($level1));
        self::assertSame(['L1', 'Root sibling'], $this->titlesOf($menu->getRoot()));
        self::assertSame($menu->getRoot(), $menu->getCurrent());
    }

    #[Test]
    public function addNodeAttachesExistingNodeAndUpdatesLast(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $node = new MenuNode();
        $node->title('Attached');

        $result = $menu->addNode($node);

        self::assertSame($node, $result);
        self::assertSame($node, $menu->getLast());
        self::assertSame(['Attached'], $this->titlesOf($menu->getRoot()));
        self::assertSame($menu->getRoot(), $node->getParent());
    }

    #[Test]
    public function createNodeDefaultInjectsMenuHelperUsedForActiveCheck(): void
    {
        $helper = $this->createMock(MenuHelper::class);
        $helper->expects($this->once())
            ->method('is')
            ->with('dashboard', [], 'mainmenu')
            ->willReturn(true);

        $menu = $this->createBuilder($this->createAppStub());
        $this->setMenuHelper($menu, $helper);
        $menu->createTree('mainmenu');

        $node = $menu->createNode();
        $menu->getRoot()->addChild($node);

        self::assertSame($helper, $node->getMenuHelper());
        self::assertTrue($node->is('dashboard'));
    }

    #[Test]
    public function createNodeWithCustomClassResolvesThroughContainer(): void
    {
        $app = $this->createMock(AppContext::class);
        $app->method('service')->willReturn($this->menuHelper);
        $app->expects($this->once())
            ->method('make')
            ->with(MenuBuilderTestCustomNode::class)
            ->willReturn(new MenuBuilderTestCustomNode());

        $node = $this->createBuilder($app)->createNode(MenuBuilderTestCustomNode::class);

        self::assertInstanceOf(MenuBuilderTestCustomNode::class, $node);
    }

    #[Test]
    public function fromTreeMirrorsSourceHierarchyIntoMenu(): void
    {
        $source = new MenuNode();

        $a = new MenuNode();
        $a->title('A');
        $a1 = new MenuNode();
        $a1->title('A1');
        $a->addChild($a1);

        $b = new MenuNode();
        $b->title('B');

        $source->addChild($a);
        $source->addChild($b);

        $menu = $this->createBuilder()->createTree('mainmenu');

        $menu->fromTree(
            $source,
            static function (MenuNode $child, MenuBuilder $menu) {
                $menu->add($child->getTitle());
            }
        );

        self::assertSame(['A', 'B'], $this->titlesOf($menu->getRoot()));
        self::assertSame(['A1'], $this->titlesOf($menu->getRoot()->getChildren()[0]));
        self::assertSame([], $this->titlesOf($menu->getRoot()->getChildren()[1]));
    }

    #[Test]
    public function fromTreeAcceptsPlainIterableOfNodes(): void
    {
        $first = new MenuNode();
        $first->title('First');
        $second = new MenuNode();
        $second->title('Second');

        $menu = $this->createBuilder()->createTree('mainmenu');

        $menu->fromTree(
            [$first, $second],
            static function (MenuNode $child, MenuBuilder $menu) {
                $menu->add($child->getTitle());
            }
        );

        self::assertSame(['First', 'Second'], $this->titlesOf($menu->getRoot()));
    }

    #[Test]
    public function loadIncludesMenuFilesWithBuilderAndLangInScope(): void
    {
        $menu = $this->createBuilder()->createTree('mainmenu');

        $lang = $this->createStub(LangService::class);
        $property = new ReflectionProperty(MenuBuilder::class, 'lang');
        $property->setValue($menu, $lang);

        $menu->load(__DIR__ . '/Fixtures/menu-load.php');

        self::assertSame(['Loaded header', 'lang-ok'], $this->titlesOf($menu->getRoot()));
    }

    #[Test]
    public function headerBeforeCreateTreeFailsBecauseNoCurrentNodeExists(): void
    {
        $menu = $this->createBuilder();

        $this->expectException(\Error::class);
        $this->expectExceptionMessageIsOrContains('must not be accessed before initialization');

        $menu->header('Orphan');
    }

    private function setMenuHelper(MenuBuilder $menu, MenuHelper $helper): void
    {
        $property = new ReflectionProperty(MenuBuilder::class, 'menuHelper');
        $property->setValue($menu, $helper);
    }
}
