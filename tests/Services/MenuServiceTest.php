<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Services;

use DomainException;
use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use Lyrasoft\Luna\Services\LocaleService;
use Lyrasoft\Luna\Services\MenuService;
use LogicException;
use Psr\Http\Message\UriInterface;
use ReflectionProperty;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Form\Form;

/**
 * Minimal menu view: active when variables contain current => true.
 */
final class FakeMenuView extends AbstractMenuView
{
    public static function getName(): string
    {
        return 'fake';
    }

    protected function defineVariablesForm(Form $form): void
    {
    }

    protected function defineParamsForm(Form $form): void
    {
    }

    public function route(Navigator $nav, array $variables, array $params): UriInterface
    {
        throw new LogicException('route() is not used in these tests.');
    }

    public function isActive(array $variables, array $params): bool
    {
        return ($variables['current'] ?? false) === true;
    }
}

/**
 * Runs MenuService queries against the real MySQL test DB.
 */
class MenuServiceTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::resetAndMigrate();
    }

    #[Before]
    protected function clearMenuTable(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Menu::class)->getTableName());
    }

    private function saveRootMenu(string $type, string $view, BasicState $state, string $title): Menu
    {
        return self::$orm->createOne(
            Menu::class,
            [
                'is_root' => true,
                'type' => $type,
                'view' => $view,
                'title' => $title,
                'state' => $state,
                'language' => '*',
            ]
        );
    }

    private function saveMenu(
        Menu $parent,
        string $type,
        string $view,
        BasicState $state,
        string $title = 'Menu',
        string $language = '*',
        array $variables = [],
    ): Menu {
        $menu = new Menu();
        $menu->type = $type;
        $menu->view = $view;
        $menu->title = $title;
        $menu->state = $state;
        $menu->language = $language;
        $menu->variables = $variables;
        $menu->parentId = $parent->id;

        return self::$orm->createOne(Menu::class, $menu);
    }

    /**
     * Seeds a 'main' tree: Root > [Plain (cat=news), Active (current=true)].
     */
    private function seedActiveTree(): Menu
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        // getMenusTree() and getActiveMenu() default to parent id 1.
        self::assertSame(1, $root->id, 'Root must be id 1 for default-parent lookups.');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Plain', '*', ['cat' => 'news']);
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Active', '*', ['current' => true]);

        return $root;
    }

    /**
     * @param  class-string<AbstractMenuView>[]  $views
     * @param  array                              $types
     */
    private function createService(
        array $views = [],
        array $types = [],
        bool $localeEnabled = false,
        string $locale = 'en-US',
    ): MenuService {
        $app = $this->createStub(ApplicationInterface::class);
        $app->method('config')->willReturnCallback(
            fn(string $key) => match ($key) {
                'menu.views' => $views,
                'menu.types' => $types,
                default => null,
            }
        );
        $app->method('make')->willReturnCallback(fn(string $class) => new $class());

        $service = new MenuService($app, self::$orm);

        // localeService is injected by DI in the app; wire a stub for tests.
        $localeService = $this->createStub(LocaleService::class);
        $localeService->method('isEnabled')->willReturn($localeEnabled);
        $localeService->method('getLocale')->willReturn($locale);

        $property = new ReflectionProperty(MenuService::class, 'localeService');
        $property->setValue($service, $localeService);

        // TranslatorTrait needs a language service; use an identity translator.
        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturnArgument(0);

        $langProperty = new ReflectionProperty(MenuService::class, 'lang');
        $langProperty->setValue($service, $lang);

        return $service;
    }

    #[Test]
    public function getMenuTypesReturnsEmptyWhenNoMenus(): void
    {
        self::assertSame([], $this->createService()->getMenuTypes());
    }

    #[Test]
    public function createSelectQueryFiltersByTypeAndPublishedState(): void
    {
        $root = $this->saveRootMenu('main', 'home', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'about', BasicState::UNPUBLISHED, 'Hidden');
        $this->saveMenu($root, 'footer', 'home', BasicState::PUBLISHED, 'Footer');
        $service = $this->createService();

        $menus = $service->createSelectQuery('main', true, $root->id)->all(Menu::class)->dump();

        self::assertCount(1, $menus);
        self::assertSame('Root', $menus[0]->title);
    }

    #[Test]
    public function createSelectQueryIncludesUnavailableWhenNotOnlyAvailable(): void
    {
        $root = $this->saveRootMenu('main', 'home', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'about', BasicState::UNPUBLISHED, 'Hidden');
        $service = $this->createService();

        $menus = $service->createSelectQuery('main', false, $root->id)->all(Menu::class)->dump();

        self::assertCount(2, $menus);
    }

    #[Test]
    public function createSelectQueryLimitsToParentSubtree(): void
    {
        $root = $this->saveRootMenu('main', 'home', BasicState::PUBLISHED, 'Root');
        $branch = $this->saveMenu($root, 'main', 'about', BasicState::PUBLISHED, 'Branch');
        $this->saveMenu($branch, 'main', 'team', BasicState::PUBLISHED, 'Leaf');
        $this->saveMenu($root, 'main', 'contact', BasicState::PUBLISHED, 'Sibling');
        $service = $this->createService();

        $menus = $service->createSelectQuery('main', true, $branch->id)->all(Menu::class)->dump();
        $titles = array_map(fn(Menu $m) => $m->title, $menus);

        self::assertContains('Branch', $titles);
        self::assertContains('Leaf', $titles);
        self::assertNotContains('Root', $titles);
        self::assertNotContains('Sibling', $titles);
    }

    #[Test]
    public function buildTreeThrowsWhenViewIsNotRegistered(): void
    {
        $menu = new Menu();
        $menu->id = 1;
        $menu->parentId = 0;
        $menu->view = 'unregistered-view';
        $menu->title = 'Broken';

        $this->expectException(DomainException::class);
        $this->expectExceptionMessage('Menu View: unregistered-view not found');

        $this->createService()->buildTree([$menu], 0);
    }

    #[Test]
    public function getViewsReturnsRegisteredViewsByName(): void
    {
        $views = $this->createService([FakeMenuView::class])->getViews();

        self::assertSame(['fake' => FakeMenuView::class], $views);
    }

    #[Test]
    public function getViewsGroupsByGroupName(): void
    {
        $views = $this->createService([FakeMenuView::class])->getViews(true);

        self::assertSame(
            FakeMenuView::class,
            $views[FakeMenuView::getGroup()]['fake'] ?? null
        );
    }

    #[Test]
    public function getViewInstanceReturnsNullForUnknownView(): void
    {
        self::assertNull($this->createService([FakeMenuView::class])->getViewInstance('nope'));
    }

    #[Test]
    public function getViewInstanceMakesRegisteredView(): void
    {
        $instance = $this->createService([FakeMenuView::class])->getViewInstance('fake');

        self::assertInstanceOf(FakeMenuView::class, $instance);
    }

    #[Test]
    public function getMenuTypesMergesDatabaseAndConfiguredTypes(): void
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'sidebar', 'fake', BasicState::PUBLISHED, 'Side');

        $types = $this->createService(
            types: ['footer' => 'Footer Menu', 'main'],
        )->getMenuTypes();

        self::assertSame(['footer', 'main', 'sidebar'], array_keys($types));
        self::assertSame('footer', $types['footer']['type']);
        self::assertSame('main', $types['main']['name']);
    }

    #[Test]
    public function getMenuTypesShowsKeyWhenNameDiffers(): void
    {
        $types = $this->createService(types: ['footer' => 'Footer Menu'])->getMenuTypes();

        self::assertSame('footer (Footer Menu)', $types['footer']['name']);
    }

    #[Test]
    public function createSelectQueryFiltersByLocaleWhenEnabled(): void
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'En', 'en-US');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Ja', 'ja-JP');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Any', '*');

        $titles = array_map(
            fn(Menu $m) => $m->title,
            $this->createService(localeEnabled: true, locale: 'en-US')
                ->createSelectQuery('main', true, $root->id)
                ->all(Menu::class)
                ->dump()
        );

        self::assertContains('En', $titles);
        self::assertContains('Any', $titles);
        self::assertNotContains('Ja', $titles);
    }

    #[Test]
    public function getMenusTreeBuildsNodesWithViewInstances(): void
    {
        $this->seedActiveTree();

        $tree = $this->createService([FakeMenuView::class])->getMenusTree('main');

        $titles = [];

        foreach ($tree->iterate() as $node) {
            $titles[] = $node->getValue()->title;
        }

        self::assertContains('Plain', $titles);
        self::assertContains('Active', $titles);
    }

    #[Test]
    public function getActiveMenuFindsActiveNodeOfType(): void
    {
        $this->seedActiveTree();
        $service = $this->createService([FakeMenuView::class]);

        $active = $service->getActiveMenu('main');

        self::assertNotNull($active);
        self::assertSame('Active', $active->getValue()->title);
    }

    #[Test]
    public function getActiveMenuReturnsNullWhenNothingActive(): void
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Plain', '*', ['cat' => 'news']);

        self::assertNull($this->createService([FakeMenuView::class])->getActiveMenu('main'));
    }

    #[Test]
    public function getAllMenusTreeReturnsTreePerType(): void
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Plain');

        $trees = $this->createService([FakeMenuView::class])->getAllMenusTree();

        self::assertSame(['main'], array_keys($trees));
    }

    #[Test]
    public function findMenuReturnsFirstMatchingNode(): void
    {
        $this->seedActiveTree();

        $menu = $this->createService([FakeMenuView::class])->findMenu(
            fn(DbMenuNode $node) => $node->getValue()->title === 'Plain'
        );

        self::assertNotNull($menu);
        self::assertSame('Plain', $menu->getValue()->title);
    }

    #[Test]
    public function eachVisitsEveryNodeOfType(): void
    {
        $this->seedActiveTree();
        $visited = [];

        $this->createService([FakeMenuView::class])->each(
            function (DbMenuNode $node) use (&$visited) {
                $visited[] = $node->getValue()->title;
            },
            'main'
        );

        self::assertNotContains('Root', $visited);
        self::assertContains('Plain', $visited);
        self::assertContains('Active', $visited);
    }

    #[Test]
    public function forceActiveIfNoExistsActivatesMatchingView(): void
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Plain', '*', ['cat' => 'news']);
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'Other', '*', ['cat' => 'blog']);
        $service = $this->createService([FakeMenuView::class]);

        $service->forceActiveIfNoExists('fake', ['cat' => 'news']);

        $active = $service->getActiveMenu('main');

        self::assertNotNull($active);
        self::assertSame('Plain', $active->getValue()->title);
    }

    #[Test]
    public function forceActiveIfNoExistsKeepsExistingActiveMenu(): void
    {
        $this->seedActiveTree();
        $service = $this->createService([FakeMenuView::class]);

        $service->forceActiveIfNoExists('fake', ['cat' => 'news']);

        self::assertSame('Active', $service->getActiveMenu('main')->getValue()->title);
    }

    #[Test]
    public function forceMenuActiveMarksFirstMatchingMenu(): void
    {
        $root = $this->saveRootMenu('main', 'fake', BasicState::PUBLISHED, 'Root');
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'A', '*', ['cat' => 'news']);
        $this->saveMenu($root, 'main', 'fake', BasicState::PUBLISHED, 'B', '*', ['cat' => 'news']);
        $service = $this->createService([FakeMenuView::class]);

        $service->forceMenuActive('fake', ['cat' => 'news'], true);

        $active = $service->getActiveMenu('main');

        self::assertNotNull($active);
        self::assertSame('A', $active->getValue()->title);
    }
}
