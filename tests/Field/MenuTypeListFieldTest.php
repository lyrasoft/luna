<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Field\MenuTypeListField;
use Lyrasoft\Luna\Services\MenuService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Lyrasoft\Luna\Tests\TestApp;
use Windwalker\DOM\HTMLElement;

/**
 * Tests for MenuTypeListField, which builds select options from MenuService::getMenuTypes()
 * plus any saved value that is not a known menu type.
 *
 * The MenuService double is injected through the DI container so the field's #[Inject]
 * property is resolved the same way as in the application.
 */
class MenuTypeListFieldTest extends TestCase
{
    /**
     * Menu types keyed by type, shaped like MenuService::getMenuTypes() returns them.
     */
    private const MENU_TYPES = [
        'article' => ['title' => 'Article', 'name' => 'Article', 'type' => 'article'],
        'product' => ['title' => 'Product', 'name' => 'Shop Product (product)', 'type' => 'product'],
    ];

    #[Test]
    public function optionsUseMenuTypeNameAsTextAndTypeAsValue(): void
    {
        $field = $this->createField(self::MENU_TYPES);

        $options = $field->getOptions();

        self::assertCount(2, $options);
        self::assertSame(['article', 'product'], $this->optionValues($options));
        self::assertSame('Article', $options[0]->textContent);
        self::assertSame('Shop Product (product)', $options[1]->textContent);
    }

    #[Test]
    public function manuallyAddedOptionsStayBeforeMenuTypeOptions(): void
    {
        $field = $this->createField(self::MENU_TYPES);
        $field->option('None', '');

        self::assertSame(
            ['', 'article', 'product'],
            $this->optionValues($field->getOptions()),
        );
    }

    #[Test]
    public function unknownSavedValueIsAppendedAsOwnOption(): void
    {
        $field = $this->createField(self::MENU_TYPES, 'legacy');

        $options = $field->getOptions();

        self::assertSame(['article', 'product', 'legacy'], $this->optionValues($options));
        self::assertSame('legacy', $options[2]->textContent);
    }

    #[Test]
    public function savedValueThatIsAKnownMenuTypeIsNotDuplicated(): void
    {
        $field = $this->createField(self::MENU_TYPES, 'product');

        self::assertSame(['article', 'product'], $this->optionValues($field->getOptions()));
    }

    #[Test]
    public function emptySavedValueAddsNoExtraOption(): void
    {
        $field = $this->createField(self::MENU_TYPES, '');

        self::assertSame(['article', 'product'], $this->optionValues($field->getOptions()));
    }

    #[Test]
    public function defaultValueIsUsedAsUnknownOptionWhenNoValueIsSet(): void
    {
        $field = $this->createField(self::MENU_TYPES);
        $field->defaultValue('archived');

        self::assertSame(
            ['article', 'product', 'archived'],
            $this->optionValues($field->getOptions()),
        );
    }

    #[Test]
    public function multipleFieldAppendsOnlyUnknownValues(): void
    {
        $field = $this->createField(self::MENU_TYPES);
        $field->multiple(true);
        $field->setValue(['article', 'legacy', 'old-type']);

        self::assertSame(
            ['article', 'product', 'legacy', 'old-type'],
            $this->optionValues($field->getOptions()),
        );
    }

    #[Test]
    public function multipleFieldSplitsCommaSeparatedValueBeforeCheckingOptions(): void
    {
        $field = $this->createField(self::MENU_TYPES);
        $field->multiple(true);
        $field->setValue('product, legacy');

        self::assertSame(
            ['article', 'product', 'legacy'],
            $this->optionValues($field->getOptions()),
        );
    }

    #[Test]
    public function noMenuTypesAndNoValueProducesNoOptions(): void
    {
        $field = $this->createField([]);

        self::assertSame([], $field->getOptions());
    }

    #[Test]
    public function noMenuTypesStillAddsSavedValue(): void
    {
        $field = $this->createField([], 'legacy');

        self::assertSame(['legacy'], $this->optionValues($field->getOptions()));
    }

    /**
     * @param  array<string, array{title: string, name: string, type: string}>  $types
     */
    private function createField(array $types, mixed $value = null): MenuTypeListField
    {
        $menuService = $this->createStub(MenuService::class);
        $menuService->method('getMenuTypes')->willReturn($types);

        $container = TestApp::$instance->getContainer()->createChild();
        $container->set(MenuService::class, $menuService);

        /** @var MenuTypeListField $field */
        $field = $container->newInstance(MenuTypeListField::class, ['name' => 'menutype']);

        if ($value !== null) {
            $field->setValue($value);
        }

        return $field;
    }

    /**
     * @param  array<HTMLElement>  $options
     *
     * @return  list<string>
     */
    private function optionValues(array $options): array
    {
        return array_map(static fn(HTMLElement $option): string => (string) $option['value'], $options);
    }
}
