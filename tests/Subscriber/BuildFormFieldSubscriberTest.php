<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Field\UserModalField;
use Lyrasoft\Luna\Subscriber\BuildFormFieldSubscriber;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Unicorn\Field\CalendarField;
use Unicorn\Field\SingleImageDragField;
use Unicorn\Form\Event\BuildFormFieldEvent;
use Unicorn\Form\FormFieldsBuilder;
use Windwalker\Database\Schema\Ddl\Column;

class BuildFormFieldSubscriberTest extends TestCase
{
    private function createEvent(string $colName, FormFieldsBuilder $builder, string $label = 'Label'): BuildFormFieldEvent
    {
        $column = new Column();
        $column->columnName = $colName;

        return new BuildFormFieldEvent(
            column: $column,
            formFieldsBuilder: $builder,
            label: $label,
        );
    }

    #[Test]
    public function createdByUsesUserModalFieldDisabled(): void
    {
        $builder = $this->createMock(FormFieldsBuilder::class);
        $builder->expects(self::once())
            ->method('addUse')
            ->with(UserModalField::class);

        $event = $this->createEvent('created_by', $builder, 'Creator');

        new BuildFormFieldSubscriber()->buildFormField($event);

        self::assertStringContainsString("\$form->add('created_by', UserModalField::class)", (string) $event->code);
        self::assertStringContainsString('->label(Creator)', (string) $event->code);
        self::assertStringContainsString('->disabled(true)', (string) $event->code);
    }

    #[Test]
    public function modifiedByUsesUserModalField(): void
    {
        $builder = $this->createStub(FormFieldsBuilder::class);

        $event = $this->createEvent('modified_by', $builder);

        new BuildFormFieldSubscriber()->buildFormField($event);

        self::assertStringContainsString("\$form->add('modified_by', UserModalField::class)", (string) $event->code);
    }

    #[Test]
    public function createdAndModifiedUseCalendarField(): void
    {
        $builder = $this->createMock(FormFieldsBuilder::class);
        $builder->expects(self::exactly(2))
            ->method('addUse')
            ->with(CalendarField::class);

        $subscriber = new BuildFormFieldSubscriber();

        $created = $this->createEvent('created', $builder);
        $subscriber->buildFormField($created);
        self::assertStringContainsString("\$form->add('created', CalendarField::class)", (string) $created->code);

        $modified = $this->createEvent('modified', $builder);
        $subscriber->buildFormField($modified);
        self::assertStringContainsString("\$form->add('modified', CalendarField::class)", (string) $modified->code);
    }

    #[Test]
    public function imageUsesCroppedSingleImageDragField(): void
    {
        $builder = $this->createMock(FormFieldsBuilder::class);
        $builder->expects(self::once())
            ->method('addUse')
            ->with(SingleImageDragField::class);

        $event = $this->createEvent('image', $builder);

        new BuildFormFieldSubscriber()->buildFormField($event);

        $code = (string) $event->code;

        self::assertStringContainsString("\$form->add('image', SingleImageDragField::class)", $code);
        self::assertStringContainsString('->crop(true)', $code);
        self::assertStringContainsString('->width(800)', $code);
        self::assertStringContainsString('->height(600)', $code);
    }

    #[Test]
    public function unknownColumnLeavesCodeNullAndAddsNoUse(): void
    {
        $builder = $this->createMock(FormFieldsBuilder::class);
        $builder->expects(self::never())->method('addUse');

        $event = $this->createEvent('title', $builder);

        new BuildFormFieldSubscriber()->buildFormField($event);

        self::assertNull($event->code);
    }
}
