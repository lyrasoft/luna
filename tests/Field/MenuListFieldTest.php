<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Field\MenuListField;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Database\DatabaseAdapter;
use Windwalker\DOM\HTMLElement;

/**
 * Test-only subclass of MenuListField that exposes the protected prepareOptions() so the
 * option preparation can be asserted directly. Used only by MenuListFieldTest; remove together with that test.
 */
class MenuListFieldTestFixture extends MenuListField
{
    public ?DatabaseAdapter $adapter = null;

    public function getDb(): DatabaseAdapter
    {
        return $this->adapter;
    }

    /**
     * @return  array<HTMLElement>
     */
    public function publicPrepareOptions(): array
    {
        return $this->prepareOptions();
    }
}

/**
 * Runs MenuListField's query preparation and option building against the real MySQL test DB.
 */
class MenuListFieldTest extends TestCase
{
    use DatabaseTestTrait;

    private Menu $root;

    private Menu $a;

    private Menu $a1;

    private Menu $b;

    private Menu $side;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Menu::class)->getTableName());
    }

    /**
     * Builds the tree:
     *
     *   Root (mainmenu, root)
     *   ├── A (mainmenu)
     *   │   └── A1 (mainmenu)
     *   ├── B (mainmenu)
     *   └── Side (sidemenu)
     */
    #[Before]
    public function buildTree(): void
    {
        $this->root = $this->createMenu('Root', 'mainmenu');
        $this->a = $this->createMenu('A', 'mainmenu', $this->root);
        $this->a1 = $this->createMenu('A1', 'mainmenu', $this->a);
        $this->b = $this->createMenu('B', 'mainmenu', $this->root);
        $this->side = $this->createMenu('Side', 'sidemenu', $this->root);
    }

    /**
     * Creates a menu row and reloads it so lft/rgt/level reflect the stored nested-set values.
     */
    private function createMenu(string $title, string $type, ?Menu $parent = null): Menu
    {
        if (!$parent) {
            $root = self::$orm->mapper(Menu::class)->createRoot(['title' => $title, 'type' => $type]);

            return self::$orm->findOne(Menu::class, $root->getPrimaryKeyValue());
        }

        $menu = new Menu();
        $menu->title = $title;
        $menu->type = $type;
        $menu->parentId = $parent->id;

        $saved = self::$orm->createOne(Menu::class, $menu);

        return self::$orm->findOne(Menu::class, $saved->id);
    }

    private function makeField(string $menuType = 'mainmenu'): MenuListFieldTestFixture
    {
        /** @var MenuListFieldTestFixture $field */
        $field = self::make(MenuListFieldTestFixture::class);
        $field->adapter = self::$orm->db;
        $field->menuType($menuType);

        return $field;
    }

    /**
     * @return  string[]
     */
    private function titlesOf(iterable $items): array
    {
        $titles = [];

        foreach ($items as $item) {
            $titles[] = $item->title;
        }

        return $titles;
    }

    #[Test]
    public function queryFiltersByMenuType(): void
    {
        $titles = $this->titlesOf($this->makeField('sidemenu')->getItems());

        self::assertSame(['Side'], $titles);
    }

    #[Test]
    public function queryReturnsItemsInTreeOrder(): void
    {
        $titles = $this->titlesOf($this->makeField('mainmenu')->getItems());

        // Root is excluded by default; remaining mainmenu items follow nested-set (lft) order.
        self::assertSame(['A', 'A1', 'B'], $titles);
    }

    #[Test]
    public function queryExcludesRootByDefault(): void
    {
        $titles = $this->titlesOf($this->makeField('mainmenu')->getItems());

        self::assertNotContains('Root', $titles);
    }

    #[Test]
    public function queryIncludesRootWhenShowRootIsEnabled(): void
    {
        $field = $this->makeField('mainmenu')->showRoot(true);

        self::assertSame(['Root', 'A', 'A1', 'B'], $this->titlesOf($field->getItems()));
    }

    #[Test]
    public function queryLimitsDepthByMaxLevel(): void
    {
        $field = $this->makeField('mainmenu')->maxLevel($this->a->level);

        // A1 sits one level deeper than A, so it must be dropped.
        self::assertSame(['A', 'B'], $this->titlesOf($field->getItems()));
    }

    #[Test]
    public function queryWithoutMaxLevelReturnsAllDepths(): void
    {
        $field = $this->makeField('mainmenu')->maxLevel(null);

        self::assertContains('A1', $this->titlesOf($field->getItems()));
    }

    #[Test]
    public function zeroMaxLevelIsTreatedAsUnlimited(): void
    {
        // PHP falsy check: a 0 limit is skipped rather than filtering everything out.
        $field = $this->makeField('mainmenu')->maxLevel(0);

        self::assertSame(['A', 'A1', 'B'], $this->titlesOf($field->getItems()));
    }

    #[Test]
    public function optionsIndentChildrenByLevelAndKeepValues(): void
    {
        $field = $this->makeField('mainmenu');

        $options = $field->publicPrepareOptions();

        $byValue = [];

        foreach ($options as $option) {
            $byValue[(string) $option->getAttribute('value')] = trim($option->textContent);
        }

        self::assertSame(
            [
                (string) $this->a->id => 'A',
                (string) $this->a1->id => str_repeat('- ', max(0, $this->a1->level - 1)) . 'A1',
                (string) $this->b->id => 'B',
            ],
            $byValue
        );

        // Sanity: A1 must actually be indented, otherwise the level logic is not exercised.
        self::assertStringStartsWith('- ', $byValue[(string) $this->a1->id]);
    }

    #[Test]
    public function optionsUseCustomTextAndValueFields(): void
    {
        $field = $this->makeField('mainmenu');
        $field->textField('title');
        $field->valueField('id');
        $field->maxLevel($this->a->level);

        $values = [];

        foreach ($field->publicPrepareOptions() as $option) {
            $values[] = (string) $option->getAttribute('value');
        }

        self::assertSame([(string) $this->a->id, (string) $this->b->id], $values);
    }

    #[Test]
    public function optionsAreEmptyWhenTableIsCleared(): void
    {
        $field = $this->makeField('mainmenu');
        $field->table(null);

        self::assertSame([], $field->publicPrepareOptions());
    }
}
