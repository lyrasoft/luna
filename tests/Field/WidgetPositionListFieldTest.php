<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Field;

use Lyrasoft\Luna\Field\WidgetPositionListField;
use Lyrasoft\Luna\Services\LocaleService;
use Lyrasoft\Luna\Widget\WidgetService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Script\UnicornScript;
use Windwalker\DI\Container;
use Windwalker\DOM\HTMLElement;

use function Windwalker\DOM\h;

/**
 * Unit tests of WidgetPositionListField.
 *
 * Covers how widget positions become select options (value, label and selection) and
 * the tom-select script that is queued when the field is built. The services are
 * injected by the DI container through #[Service] properties, so they are replaced
 * with doubles here. Nothing in this fixture depends on the database.
 */
class WidgetPositionListFieldTest extends TestCase
{
    #[Test]
    public function optionValueAndLabelUseOnlyPositionWhenNameMatches(): void
    {
        $field = $this->createField(
            positions: ['hero' => 'hero'],
        );

        $html = $this->renderSelect($field);

        self::assertStringContainsString('<option value="hero">hero</option>', $html);
    }

    #[Test]
    public function optionLabelAppendsNameInParenthesesWhenNameDiffers(): void
    {
        $field = $this->createField(
            positions: ['header' => 'Site Header'],
        );

        $html = $this->renderSelect($field);

        self::assertStringContainsString('<option value="header">header (Site Header)</option>', $html);
    }

    #[Test]
    public function optionsFollowPositionOrderFromWidgetService(): void
    {
        $field = $this->createField(
            positions: [
                'footer' => 'Footer',
                'hero' => 'hero',
                'sidebar' => 'Side Bar',
            ],
        );

        $values = array_map(
            static fn(HTMLElement $option) => (string) $option['value'],
            $field->getOptions(),
        );

        self::assertSame(['footer', 'hero', 'sidebar'], $values);
    }

    #[Test]
    public function noOptionsAreCreatedWhenNoPositionsExist(): void
    {
        $field = $this->createField(positions: []);

        self::assertSame([], $field->getOptions());
    }

    #[Test]
    public function selectedValueMatchesPositionNotDisplayName(): void
    {
        $field = $this->createField(
            positions: ['header' => 'Site Header'],
        );

        $field->setValue('header');
        self::assertStringContainsString(
            '<option value="header" selected="selected">header (Site Header)</option>',
            $this->renderSelect($field),
        );

        $field->setValue('Site Header');
        self::assertStringNotContainsString('selected="selected"', $this->renderSelect($field));
    }

    #[Test]
    public function tomSelectScriptDisablesCreateByDefault(): void
    {
        $script = $this->createMock(UnicornScript::class);
        $script->expects($this->once())
            ->method('importMainThen')
            ->with(
                $this->logicalAnd(
                    $this->stringContains("u.\$ui.tomSelect('#input-position', {"),
                    $this->stringContains('create: false'),
                ),
            )
            ->willReturnSelf();

        $field = $this->createField(script: $script);

        $this->renderSelect($field);
    }

    #[Test]
    public function tomSelectScriptEnablesCreateWhenAllowCreateIsSet(): void
    {
        $script = $this->createMock(UnicornScript::class);
        $script->expects($this->once())
            ->method('importMainThen')
            ->with($this->stringContains('create: true'))
            ->willReturnSelf();

        $field = $this->createField(script: $script);
        $field->allowCreate(true);

        $this->renderSelect($field);
    }

    #[Test]
    public function buildingFieldQueuesScriptOnceAndAddsPositionOptions(): void
    {
        $script = $this->createMock(UnicornScript::class);
        $script->expects($this->once())
            ->method('importMainThen')
            ->willReturnSelf();

        $field = $this->createField(
            positions: ['hero' => 'hero'],
            script: $script,
        );

        $html = $this->renderSelect($field);

        self::assertStringContainsString('<option value="hero">hero</option>', $html);
    }

    /**
     * Builds the field through the DI container, so #[Service] properties are injected.
     *
     * @param  array<string, string>  $positions  Map of position => display name, as WidgetService returns.
     */
    private function createField(
        array $positions = [],
        ?UnicornScript $script = null,
    ): WidgetPositionListField {
        $widgetService = $this->createStub(WidgetService::class);
        $widgetService->method('getAllPositions')->willReturn($positions);

        if ($script === null) {
            $script = $this->createStub(UnicornScript::class);
            $script->method('importMainThen')->willReturnSelf();
        }

        $container = new Container();
        $container->set(WidgetService::class, $widgetService);
        $container->set(UnicornScript::class, $script);
        $container->set(LocaleService::class, $this->createStub(LocaleService::class));

        $field = $container->newInstance(
            WidgetPositionListField::class,
            ['name' => 'position', 'label' => 'Position'],
        );

        $this->injectProperty($field, 'widgetService', $widgetService);
        $this->injectProperty($field, 'unicornScript', $script);
        $this->injectProperty($field, 'localeService', $container->get(LocaleService::class));

        return $field;
    }

    private function injectProperty(object $object, string $name, object $value): void
    {
        $property = new \ReflectionProperty($object, $name);
        $property->setValue($object, $value);
    }

    private function renderSelect(WidgetPositionListField $field): string
    {
        $input = h('select', ['id' => 'input-position', 'name' => 'position'], null);

        return (string) $field->buildFieldElement($input);
    }
}
