<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Entity\Language;
use Lyrasoft\Luna\Field\LocaleSwitchField;
use Lyrasoft\Luna\Services\AssociationService;
use Lyrasoft\Luna\Services\LocaleService;
use PHPUnit\Framework\Attributes\Before;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Testing\Traits\DatabaseTestTrait;
use Windwalker\Database\DatabaseAdapter;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\Query\Query;

use function Windwalker\DOM\h;

/**
 * Entity without a primary key. Used only by LocaleSwitchFieldTest to cover the "must has a main key" guard in
 * getIdName() and the snake-case route name of a multi-word table; remove together with that test.
 */
#[Table('locale_switch_no_key')]
class LocaleSwitchNoKeyEntity implements EntityInterface
{
    use EntityTrait;

    #[Column('title')]
    public string $title = '';
}

/**
 * Test-only subclass of LocaleSwitchField. It swaps the DB query for canned rows, captures renderLayout() calls, and
 * exposes the protected prepareQuery(). Used only by LocaleSwitchFieldTest; remove together with that test.
 */
class LocaleSwitchFieldFixture extends LocaleSwitchField
{
    public array $rows = [];

    public int $itemsCalls = 0;

    /** @var array{layout: string, data: array}|null */
    public ?array $rendered = null;

    public ?DatabaseAdapter $adapter = null;

    public function injectServices(LocaleService $localeService, AssociationService $associationService): void
    {
        $this->localeService = $localeService;
        $this->associationService = $associationService;
    }

    public function getItems(): iterable
    {
        $this->itemsCalls++;

        return array_map(fn(array $row) => new \Windwalker\Data\Collection($row), $this->rows);
    }

    public function getDb(): DatabaseAdapter
    {
        return $this->adapter;
    }

    public function renderLayout(string $layout, array $data = []): string
    {
        $this->rendered = ['layout' => $layout, 'data' => $data];

        return '<rendered>';
    }

    public function callPrepareQuery(Query $query): void
    {
        $this->prepareQuery($query);
    }
}

class LocaleSwitchFieldTest extends TestCase
{
    use DatabaseTestTrait;

    private LocaleSwitchFieldFixture $field;

    private LocaleService $localeService;

    private AssociationService $associationService;

    #[Before]
    public function createField(): void
    {
        $this->localeService = $this->createStub(LocaleService::class);
        $this->localeService->method('getFallback')->willReturn('en-US');

        $this->associationService = $this->createStub(AssociationService::class);

        $this->field = new LocaleSwitchFieldFixture('locale', 'Locale');
        $this->field->injectServices($this->localeService, $this->associationService);
        $this->field->adapter = self::$db;
        $this->field->table(Language::class);
    }

    #[Test]
    public function valueFallsBackToDefaultLocaleWhenEmptyAndFallbackEnabled(): void
    {
        $this->field->useDefaultFallback(true);

        self::assertSame('en-US', $this->field->getValue());
    }

    #[Test]
    public function valueKeepsExplicitValueWhenFallbackEnabled(): void
    {
        $this->field->useDefaultFallback(true);
        $this->field->setValue('ja-JP');

        self::assertSame('ja-JP', $this->field->getValue());
    }

    #[Test]
    public function valueStaysEmptyWhenFallbackDisabled(): void
    {
        self::assertEmpty($this->field->getValue());
    }

    #[Test]
    public function loadItemsReturnsEmptyCollectionWithoutValueAndSkipsQuery(): void
    {
        $this->field->rows = [['language' => 'en-US']];

        $items = $this->field->loadItems();

        self::assertCount(0, $items);
        self::assertSame(0, $this->field->itemsCalls);
    }

    #[Test]
    public function loadItemsReadsRowsWhenValueIsSet(): void
    {
        $this->field->rows = [
            ['language' => 'en-US'],
            ['language' => 'ja-JP'],
        ];
        $this->field->setValue('en-US');

        $items = $this->field->loadItems();

        self::assertCount(2, $items);
        self::assertSame('ja-JP', $items[1]['language']);
    }

    #[Test]
    public function loadItemsLoadsWhenFallbackProvidesValue(): void
    {
        $this->field->useDefaultFallback(true);
        $this->field->rows = [['language' => 'en-US']];

        self::assertCount(1, $this->field->loadItems());
    }

    #[Test]
    public function loadItemsCachesRowsPerInstance(): void
    {
        $this->field->rows = [['language' => 'en-US']];
        $this->field->setValue('en-US');

        $this->field->loadItems();
        $this->field->loadItems();

        self::assertSame(1, $this->field->itemsCalls);
    }

    #[Test]
    public function getItemByLandCodeReturnsMatchingRow(): void
    {
        $this->field->rows = [
            ['language' => 'en-US', 'title' => 'English'],
            ['language' => 'ja-JP', 'title' => 'Japanese'],
        ];
        $this->field->setValue('en-US');

        $item = $this->field->getItemByLandCode('ja-JP');

        self::assertSame('Japanese', $item['title']);
    }

    #[Test]
    public function getItemByLandCodeReturnsNullWhenNoRowMatches(): void
    {
        $this->field->rows = [['language' => 'en-US']];
        $this->field->setValue('en-US');

        self::assertNull($this->field->getItemByLandCode('zh-TW'));
    }

    #[Test]
    public function getItemByLandCodeUsesConfiguredLanguageField(): void
    {
        $this->field->languageField('lang');
        $this->field->rows = [
            ['language' => 'en-US', 'lang' => 'en'],
            ['language' => 'ja-JP', 'lang' => 'ja'],
        ];
        $this->field->setValue('en-US');

        self::assertSame('ja-JP', $this->field->getItemByLandCode('ja')['language']);
        self::assertNull($this->field->getItemByLandCode('ja-JP'));
    }

    #[Test]
    public function prepareInputHidesInputAndExposesCurrentValue(): void
    {
        $this->field->setValue('ja-JP');

        $input = $this->field->prepareInput(h('input', [], null));

        self::assertSame('display: none;', $input['style']);
        self::assertSame('value', $input['data-role']);
        self::assertSame('ja-JP', $input['value']);
    }

    #[Test]
    public function buildFieldElementRendersDefaultLayoutWithFieldContext(): void
    {
        $input = h('input', [], null);

        $result = $this->field->buildFieldElement($input, ['foo' => 'bar']);

        self::assertSame('<rendered>', $result);
        self::assertSame('@theme::field.locale-switch', $this->field->rendered['layout']);
        self::assertSame($this->field, $this->field->rendered['data']['field']);
        self::assertSame($input, $this->field->rendered['data']['input']);
        self::assertSame(['foo' => 'bar'], $this->field->rendered['data']['options']);
    }

    #[Test]
    public function buildFieldElementUsesCustomLayoutWhenSet(): void
    {
        $this->field->layout('custom.locale-switch');

        $this->field->buildFieldElement(h('input', [], null));

        self::assertSame('custom.locale-switch', $this->field->rendered['layout']);
    }

    #[Test]
    public function prepareQueryFiltersByCurrentIdAndAssociatedTargets(): void
    {
        $this->field->currentId(5);

        $calls = [];
        $this->associationService->method('getRelativeItemsByTargetId')
            ->willReturnCallback(function (string $type, string $id) use (&$calls) {
                $calls[] = [$type, $id];

                return [(object) ['targetId' => 7], (object) ['targetId' => 9]];
            });

        $query = $this->createMock(Query::class);
        $query->expects($this->once())
            ->method('where')
            ->with('id', 'in', [5, 7, 9]);

        $this->field->callPrepareQuery($query);

        self::assertSame([['language', '5']], $calls);
    }

    #[Test]
    public function prepareQueryUsesConfiguredAssocType(): void
    {
        $this->field->assocType('article');
        $this->field->currentId(5);

        $calls = [];
        $this->associationService->method('getRelativeItemsByTargetId')
            ->willReturnCallback(function (string $type, string $id) use (&$calls) {
                $calls[] = [$type, $id];

                return [];
            });

        $query = $this->createMock(Query::class);
        $query->expects($this->once())
            ->method('where')
            ->with('id', 'in', [5]);

        $this->field->callPrepareQuery($query);

        self::assertSame([['article', '5']], $calls);
    }

    #[Test]
    public function idNameIsMainKeyOfTable(): void
    {
        self::assertSame('id', $this->field->getIdName());
    }

    #[Test]
    public function idNameThrowsWhenTableHasNoMainKey(): void
    {
        $this->field->table(LocaleSwitchNoKeyEntity::class);

        $this->expectException(\LogicException::class);
        $this->expectExceptionMessageIsOrContains('must has a main key');

        $this->field->getIdName();
    }

    #[Test]
    public function tableRejectsNonEntityClass(): void
    {
        $this->expectException(\LogicException::class);
        $this->expectExceptionMessageIsOrContains('must be an entity');

        $this->field->table(\stdClass::class);
    }

    #[Test]
    public function routeNameDefaultsToSnakeTableNameWithEditSuffix(): void
    {
        self::assertSame('language_edit', $this->field->getRouteName());

        $field = new LocaleSwitchFieldFixture('locale', 'Locale');
        $field->table(LocaleSwitchNoKeyEntity::class);

        self::assertSame('locale_switch_no_key_entity_edit', $field->getRouteName());
    }

    #[Test]
    public function routeNameFallsBackWhenCustomNameIsEmpty(): void
    {
        $this->field->routeName('');

        self::assertSame('language_edit', $this->field->getRouteName());

        $this->field->routeName('site_locale');

        self::assertSame('site_locale', $this->field->getRouteName());
    }

    #[Test]
    public function assocTypeDefaultsToSnakeTableNameUntilConfigured(): void
    {
        self::assertSame('language', $this->field->getAssocType());

        $this->field->assocType('article');

        self::assertSame('article', $this->field->getAssocType());
    }
}
