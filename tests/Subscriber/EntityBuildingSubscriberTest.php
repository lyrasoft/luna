<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Subscriber\EntityBuildingSubscriber;
use PhpParser\Node\Attribute;
use PhpParser\Node\AttributeGroup;
use PhpParser\Node\Name;
use PhpParser\Node\Stmt\Property;
use PhpParser\Node\Stmt\PropertyProperty;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Generator\Builder\EntityMemberBuilder;
use Windwalker\Core\Generator\Event\BuildEntityPropertyEvent;
use Windwalker\Database\Schema\Ddl\Column;

class EntityBuildingSubscriberTest extends TestCase
{
    private function createBuilder(): EntityMemberBuilder
    {
        $builder = $this->createStub(EntityMemberBuilder::class);
        $builder->method('attribute')->willReturnCallback(
            static fn (string $name): Attribute => new Attribute(new Name($name))
        );
        $builder->method('attributeGroup')->willReturnCallback(
            static fn (Attribute $attr): AttributeGroup => new AttributeGroup([$attr])
        );

        return $builder;
    }

    private function createEvent(string $colName, ?Property $prop = null): BuildEntityPropertyEvent
    {
        $column = new Column();
        $column->columnName = $colName;

        return new BuildEntityPropertyEvent(
            propName: $colName,
            prop: $prop ?? new Property(1, [new PropertyProperty($colName)]),
            column: $column,
            entityMemberBuilder: $this->createBuilder(),
        );
    }

    private function attrNames(Property $prop): array
    {
        $names = [];

        foreach ($prop->attrGroups as $group) {
            foreach ($group->attrs as $attr) {
                $names[] = (string) $attr->name;
            }
        }

        return $names;
    }

    #[Test]
    public function aliasColumnGetsSlugifyAttribute(): void
    {
        $event = $this->createEvent('alias');

        (new EntityBuildingSubscriber())->buildEntityProperty($event);

        self::assertSame(['Slugify'], $this->attrNames($event->prop));
    }

    #[Test]
    public function disabledSlugColumnAddsNothing(): void
    {
        $event = $this->createEvent('alias');

        (new EntityBuildingSubscriber(['slug_column' => false]))->buildEntityProperty($event);

        self::assertSame([], $this->attrNames($event->prop));
    }

    #[Test]
    public function createdAndModifiedGetTimeAttributes(): void
    {
        $subscriber = new EntityBuildingSubscriber();

        $created = $this->createEvent('created');
        $subscriber->buildEntityProperty($created);
        self::assertSame(['CreatedTime'], $this->attrNames($created->prop));

        $modified = $this->createEvent('modified');
        $subscriber->buildEntityProperty($modified);
        self::assertSame(['CurrentTime'], $this->attrNames($modified->prop));
    }

    #[Test]
    public function authorIsInsertedBeforeUuidAttribute(): void
    {
        $prop = new Property(
            1,
            [new PropertyProperty('created_by')],
            [],
            null,
            [new AttributeGroup([new Attribute(new Name('Uuid'))])],
        );

        $event = $this->createEvent('created_by', $prop);

        (new EntityBuildingSubscriber())->buildEntityProperty($event);

        self::assertSame(['Author', 'Uuid'], $this->attrNames($event->prop));
    }

    #[Test]
    public function modifierIsAppendedWhenNoUuidAttribute(): void
    {
        $event = $this->createEvent('modified_by');

        (new EntityBuildingSubscriber())->buildEntityProperty($event);

        self::assertSame(['Modifier'], $this->attrNames($event->prop));
    }

    #[Test]
    public function orderingColumnIsLeftUntouched(): void
    {
        $event = $this->createEvent('ordering');

        (new EntityBuildingSubscriber())->buildEntityProperty($event);

        self::assertSame([], $this->attrNames($event->prop));
    }

    #[Test]
    public function findUuidAttrIndexIsCaseInsensitive(): void
    {
        $prop = new Property(
            1,
            [new PropertyProperty('id')],
            [],
            null,
            [
                new AttributeGroup([new Attribute(new Name('Column'))]),
                new AttributeGroup([new Attribute(new Name('GeneratedUUID'))]),
            ],
        );

        self::assertSame(1, EntityBuildingSubscriber::findUuidAttrIndex($prop));
        self::assertFalse(
            EntityBuildingSubscriber::findUuidAttrIndex(new Property(1, [new PropertyProperty('x')]))
        );
    }
}
