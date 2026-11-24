<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Tag;
use Lyrasoft\Luna\Field\TagListField;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Testing\Database\TestDatabaseFixtures;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Database\DatabaseAdapter;

/**
 * Test-only subclass of TagListField that reads from the test DB adapter directly,
 * because the default connection name is not configured inside the test container.
 */
class TagListFieldFixture extends TagListField
{
    public ?DatabaseAdapter $adapter = null;

    public function getDb(): DatabaseAdapter
    {
        return $this->adapter;
    }
}

/**
 * Runs TagListField's query preparation (title ordering, id/title selection, caller
 * query constraints) and option building against the real MySQL test DB, so the tag
 * rows come from the actual entity save path.
 */
class TagListFieldTest extends TestCase
{
    use DatabaseTestTrait;

    protected static function prepareTablesBeforeClass(): void
    {
        TestDatabaseFixtures::migrate();
    }

    protected function clearTables(): void
    {
        static::truncateTables(self::$orm->getEntityMetadata(Tag::class)->getTableName());
    }

    private function saveTag(string $title, BasicState $state = BasicState::PUBLISHED): Tag
    {
        $tag = new Tag();
        $tag->title = $title;
        $tag->state = $state;

        return self::$orm->createOne(Tag::class, $tag);
    }

    private function createField(): TagListFieldFixture
    {
        $field = new TagListFieldFixture('tags');
        $field->adapter = static::$db;

        return $field;
    }

    /**
     * @return  string[]  Option values, in rendered order.
     */
    private function optionValues(TagListFieldFixture $field): array
    {
        return array_map(
            fn($option) => (string) $option->getAttribute('value'),
            $field->getOptions()
        );
    }

    #[Test]
    public function defaultTableIsTagEntity(): void
    {
        self::assertSame(Tag::class, $this->createField()->getTable());
    }

    #[Test]
    public function itemsAreOrderedByTitleAscending(): void
    {
        $this->saveTag('Zeta');
        $this->saveTag('Alpha');
        $this->saveTag('Mid');

        $titles = array_map(
            fn($item) => $item->title,
            iterator_to_array($this->createField()->getItems())
        );

        self::assertSame(['Alpha', 'Mid', 'Zeta'], $titles);
    }

    #[Test]
    public function itemsExposeOnlyIdAndTitle(): void
    {
        $this->saveTag('Alpha');

        $items = iterator_to_array($this->createField()->getItems());

        self::assertCount(1, $items);
        self::assertSame(['id', 'title'], array_keys($items[0]->toArray()));
    }

    #[Test]
    public function callerConstraintsAreAppliedWhileTitleOrderIsKept(): void
    {
        $this->saveTag('Zeta');
        $this->saveTag('Alpha', BasicState::UNPUBLISHED);
        $this->saveTag('Mid');

        $field = $this->createField();
        $field->configureQuery(
            fn($query) => $query->where('tag.state', BasicState::PUBLISHED->value)
        );

        $titles = array_map(
            fn($item) => $item->title,
            iterator_to_array($field->getItems())
        );

        self::assertSame(['Mid', 'Zeta'], $titles);
    }

    #[Test]
    public function optionValuesAreTagIdsAndTextsAreTitlesInTitleOrder(): void
    {
        $zeta = $this->saveTag('Zeta');
        $alpha = $this->saveTag('Alpha');

        $options = $this->createField()->getOptions();

        self::assertSame(
            [(string) $alpha->id, (string) $zeta->id],
            array_map(fn($option) => (string) $option->getAttribute('value'), $options)
        );
        // No level column is selected, so no indentation prefix is added.
        self::assertSame(['Alpha', 'Zeta'], array_map(fn($option) => trim($option->textContent), $options));
    }

    #[Test]
    public function optionMatchingCurrentValueIsSelected(): void
    {
        $alpha = $this->saveTag('Alpha');
        $mid = $this->saveTag('Mid');

        $field = $this->createField();
        $field->value((string) $mid->id);

        $select = $field->buildFieldElement(h('select'));
        $selected = array_values(array_filter(
            iterator_to_array($select->getElementsByTagName('option')),
            fn($option) => $option->hasAttribute('selected')
        ));

        self::assertCount(1, $selected);
        self::assertSame((string) $mid->id, $selected[0]->getAttribute('value'));
        self::assertNotSame((string) $alpha->id, $selected[0]->getAttribute('value'));
    }

    #[Test]
    public function noOptionsAreBuiltWhenTableIsRemoved(): void
    {
        $this->saveTag('Alpha');

        $field = $this->createField();
        $field->table(null);

        self::assertSame([], $this->optionValues($field));
    }

    #[Test]
    public function noOptionsAreBuiltWhenNoTagExists(): void
    {
        self::assertSame([], $this->optionValues($this->createField()));
    }
}
