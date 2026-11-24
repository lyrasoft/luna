<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Importer;

use Lyrasoft\Luna\Importer\NestedDataImporter;
use Lyrasoft\Luna\Tree\Node;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\ORM\Nested\NestedEntityInterface;
use Windwalker\ORM\Nested\Position;
use Windwalker\ORM\NestedSetMapper;
use Windwalker\ORM\ORM;

#[AllowMockObjectsWithoutExpectations]
class NestedDataImporterTest extends TestCase
{
    #[Test]
    public function importItemUsesRootAsDefaultParentAndCustomChildProcessor(): void
    {
        $root = $this->createStub(NestedEntityInterface::class);

        $mapper = $this->createMock(NestedSetMapper::class);
        $mapper->expects($this->once())
            ->method('getRoot')
            ->willReturn($root);

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('mapper')
            ->willReturn($mapper);
        $orm->expects($this->once())
            ->method('saveOne')
            ->willReturnArgument(0);

        $receivedParent = null;
        $importer = new NestedDataImporter($orm);
        $importer->setChildProcessor(function (object $child, object $parent) use (&$receivedParent) {
            $receivedParent = $parent;

            return $child;
        });

        $importer->importItem((object) ['title' => 'a']);

        self::assertSame($root, $receivedParent);
    }

    #[Test]
    public function importItemReplacesItemWithProcessorResult(): void
    {
        $mapper = $this->createStub(NestedSetMapper::class);
        $mapper->method('getRoot')->willReturn($this->createStub(NestedEntityInterface::class));

        $orm = $this->createMock(ORM::class);
        $orm->expects($this->once())
            ->method('mapper')
            ->willReturn($mapper);
        $orm->expects($this->once())
            ->method('saveOne')
            ->with($this->callback(fn(object $item) => $item->title === 'processed'))
            ->willReturnArgument(0);

        $importer = new NestedDataImporter($orm);
        $importer->setChildProcessor(function (object $child) {
            return (object) ['title' => 'processed'];
        });

        $importer->importItem((object) ['title' => 'original']);
    }

    #[Test]
    public function importItemSavesChildrenUnderTheSavedParent(): void
    {
        $mapper = $this->createStub(NestedSetMapper::class);
        $mapper->method('getRoot')->willReturn($this->createStub(NestedEntityInterface::class));

        $orm = $this->createMock(ORM::class);
        $orm->method('mapper')->willReturn($mapper);
        $orm->expects($this->exactly(3))
            ->method('saveOne')
            ->willReturnArgument(0);

        $parentObj = (object) ['title' => 'parent'];
        $childA = (object) ['title' => 'child-a'];
        $childB = (object) ['title' => 'child-b'];

        $pairs = [];
        $importer = new NestedDataImporter($orm);
        $importer->setChildProcessor(function (object $child, object $parent) use (&$pairs) {
            $pairs[] = [$child->title, $parent->title ?? null];

            return $child;
        });

        $node = new Node($parentObj, [new Node($childA), new Node($childB)]);

        $saved = $importer->importItem($node);

        self::assertSame($parentObj, $saved);
        self::assertSame(
            [
                ['parent', null],
                ['child-a', 'parent'],
                ['child-b', 'parent'],
            ],
            $pairs
        );
    }

    #[Test]
    public function importItemUnwrapsNodeParentArgument(): void
    {
        $mapper = $this->createStub(NestedSetMapper::class);
        $mapper->method('getRoot')->willReturn($this->createStub(NestedEntityInterface::class));

        $orm = $this->createMock(ORM::class);
        $orm->method('mapper')->willReturn($mapper);
        $orm->method('saveOne')->willReturnArgument(0);

        $parentValue = (object) ['id' => 9, 'title' => 'node-parent'];

        $receivedParent = null;
        $importer = new NestedDataImporter($orm);
        $importer->setChildProcessor(function (object $child, object $parent) use (&$receivedParent) {
            $receivedParent = $parent;

            return $child;
        });

        $importer->importItem((object) ['title' => 'child'], null, new Node($parentValue));

        self::assertSame($parentValue, $receivedParent);
    }

    #[Test]
    public function defaultChildProcessorPositionsChildAsLastChildOfParent(): void
    {
        $child = $this->createStub(NestedEntityInterface::class);
        $child->method('getPrimaryKeyValue')->willReturn(5);

        $parent = $this->createStub(NestedEntityInterface::class);
        $parent->method('getPrimaryKeyValue')->willReturn(42);

        $mapper = $this->createMock(NestedSetMapper::class);
        $mapper->expects($this->once())
            ->method('setPosition')
            ->with($child, 42, Position::LAST_CHILD);
        $mapper->method('getRoot')->willReturn($parent);

        $orm = $this->createMock(ORM::class);
        $orm->method('mapper')->willReturn($mapper);
        $orm->method('saveOne')->willReturnArgument(0);

        $saved = new NestedDataImporter($orm)->importItem($child);

        self::assertSame($child, $saved);
    }
}
