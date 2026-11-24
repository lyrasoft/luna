<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Field\CategoryListField;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;

/**
 * Runs CategoryListField's query preparation (type filter, level limit, root
 * exclusion, lft ordering) against the real MySQL test DB, so the nested-set
 * columns (lft, level, parent_id) come from the actual entity save path.
 */
class CategoryListFieldTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    /**
     * Truncate drops the migration-created root, so re-create it (it gets id 1 again).
     */
    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Category::class)->getTableName());

        self::$orm->mapper(Category::class)->createRootIfNotExist();
    }

    private function root(): Category
    {
        return self::$orm->mapper(Category::class)->getRoot();
    }

    private function saveCategory(string $title, string $type, Category $parent): Category
    {
        $category = new Category();
        $category->title = $title;
        $category->type = $type;
        $category->parentId = $parent->id;

        return self::$orm->createOne(Category::class, $category);
    }

    private function createField(): CategoryListField
    {
        return static::make(CategoryListField::class, ['name' => 'category']);
    }

    /**
     * @return  string[]  Option values, in rendered order.
     */
    private function optionValues(CategoryListField $field): array
    {
        return array_map(
            fn($option) => (string) $option->getAttribute('value'),
            $field->getOptions()
        );
    }

    #[Test]
    public function rootCategoryIsExcludedByDefault(): void
    {
        $root = $this->root();
        $child = $this->saveCategory('Article A', 'article', $root);

        $field = $this->createField();
        $field->categoryType('article');

        self::assertSame([(string) $child->id], $this->optionValues($field));
        self::assertNotContains((string) $root->id, $this->optionValues($field));
    }

    #[Test]
    public function showRootIncludesRootCategory(): void
    {
        $root = $this->root();
        $this->saveCategory('Article A', 'article', $root);

        // Root is stored with an empty type, so filter on '' to reach it.
        $field = $this->createField();
        $field->categoryType('')->showRoot(true);

        self::assertContains((string) $root->id, $this->optionValues($field));
    }

    #[Test]
    public function onlyCategoriesOfRequestedTypeAreListed(): void
    {
        $root = $this->root();
        $article = $this->saveCategory('Article A', 'article', $root);
        $product = $this->saveCategory('Product B', 'product', $root);

        $field = $this->createField();
        $field->categoryType('product');

        self::assertSame([(string) $product->id], $this->optionValues($field));
        self::assertNotContains((string) $article->id, $this->optionValues($field));
    }

    #[Test]
    public function maxLevelLimitsNestedDepth(): void
    {
        $root = $this->root();
        $a = $this->saveCategory('A', 'article', $root);
        $a1 = $this->saveCategory('A1', 'article', $a);
        $b = $this->saveCategory('B', 'article', $root);

        $field = $this->createField();
        $field->categoryType('article')->maxLevel(1);

        self::assertSame([(string) $a->id, (string) $b->id], $this->optionValues($field));

        $field->maxLevel(2);

        self::assertSame(
            [(string) $a->id, (string) $a1->id, (string) $b->id],
            $this->optionValues($field)
        );
    }

    #[Test]
    public function nullOrZeroMaxLevelDoesNotLimitDepth(): void
    {
        $root = $this->root();
        $a = $this->saveCategory('A', 'article', $root);
        $a1 = $this->saveCategory('A1', 'article', $a);
        $a11 = $this->saveCategory('A11', 'article', $a1);

        $expected = [(string) $a->id, (string) $a1->id, (string) $a11->id];

        $field = $this->createField();
        $field->categoryType('article')->maxLevel(null);

        self::assertSame($expected, $this->optionValues($field));

        // 0 is falsy, so the field treats it the same as "no limit".
        $field->maxLevel(0);

        self::assertSame($expected, $this->optionValues($field));
    }

    #[Test]
    public function optionsFollowTreeOrderAndIndentByLevel(): void
    {
        $root = $this->root();

        // Inserted in non-tree order: ordering must follow lft, not id.
        $b = $this->saveCategory('B', 'article', $root);
        $a = $this->saveCategory('A', 'article', $root);
        $a1 = $this->saveCategory('A1', 'article', $a);

        $field = $this->createField();
        $field->categoryType('article');

        $options = $field->getOptions();

        self::assertSame(
            [(string) $b->id, (string) $a->id, (string) $a1->id],
            array_map(fn($option) => (string) $option->getAttribute('value'), $options)
        );
        self::assertSame(['B', '- A', '- - A1'], array_map(fn($option) => trim($option->textContent), $options));
    }
}
