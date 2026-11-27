<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Tree;

use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\TreeBuilder;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class TreeBuilderTest extends TestCase
{
    #[Test]
    public function createBuildsTreeFromParentIdRelations(): void
    {
        $items = [
            (object) ['id' => 2, 'parent_id' => 1, 'title' => 'a'],
            (object) ['id' => 3, 'parent_id' => 1, 'title' => 'b'],
            (object) ['id' => 4, 'parent_id' => 2, 'title' => 'a1'],
        ];

        $root = TreeBuilder::create($items);

        self::assertNull($root->getValue());
        self::assertCount(2, $root->getChildren());
        self::assertSame('a', $root->getChild(0)->getValue()->title);
        self::assertSame('a1', $root->getChild(0)->getChild(0)->getValue()->title);
        self::assertSame($root, $root->getChild(0)->getParent());
    }

    #[Test]
    public function createUsesObjectRootAsRootNodeValue(): void
    {
        $rootItem = (object) ['id' => 1, 'parent_id' => 0, 'title' => 'root'];
        $items = [
            (object) ['id' => 2, 'parent_id' => 1, 'title' => 'child'],
        ];

        $root = TreeBuilder::create($items, root: $rootItem);

        self::assertSame($rootItem, $root->getValue());
        self::assertSame('child', $root->getChild(0)->getValue()->title);
    }

    #[Test]
    public function createAcceptsExistingNodeAsRoot(): void
    {
        $existing = new Node((object) ['id' => 7, 'parent_id' => 0]);
        $items = [
            (object) ['id' => 8, 'parent_id' => 7],
        ];

        $root = TreeBuilder::create($items, root: $existing);

        self::assertSame($existing, $root);
        self::assertSame(8, $root->getChild(0)->getValue()->id);
    }

    #[Test]
    public function createSupportsClosureKeyAndParentNames(): void
    {
        $items = [
            ['key' => 'x', 'up' => 1],
            ['key' => 'y', 'up' => 'x'],
        ];

        $root = TreeBuilder::create(
            $items,
            keyName: static fn(array $data) => $data['key'],
            parentIdName: static fn(array $data) => $data['up'],
            root: 1,
        );

        self::assertCount(1, $root->getChildren());
        self::assertSame('x', $root->getChild(0)->getValue()['key']);
        self::assertSame('y', $root->getChild(0)->getChild(0)->getValue()['key']);
    }

    #[Test]
    public function createReturnsRootWhenItemsEmpty(): void
    {
        $root = TreeBuilder::create([], root: 1);

        self::assertInstanceOf(Node::class, $root);
        self::assertSame([], $root->getChildren());
    }

    #[Test]
    public function createSkipsItemsWithMissingKeyOrParent(): void
    {
        $items = [
            (object) ['id' => null, 'parent_id' => 1],
            (object) ['id' => 2, 'parent_id' => null],
            (object) ['id' => 3, 'parent_id' => ''],
            (object) ['id' => 4, 'parent_id' => 1],
        ];

        $root = TreeBuilder::create($items);

        self::assertCount(1, $root->getChildren());
        self::assertSame(4, $root->getChild(0)->getValue()->id);
    }

    #[Test]
    public function createReturnsRootWhenEveryItemIsSkipped(): void
    {
        $items = [
            (object) ['id' => null, 'parent_id' => 1],
            (object) ['id' => 2, 'parent_id' => ''],
        ];

        $root = TreeBuilder::create($items);

        self::assertSame([], $root->getChildren());
    }

    #[Test]
    public function createDoesNotAttachSelfParentedItems(): void
    {
        $items = [
            (object) ['id' => 5, 'parent_id' => 5],
        ];

        $root = TreeBuilder::create($items);

        self::assertSame([], $root->getChildren());
    }

    #[Test]
    public function createIgnoresItemsWhoseParentIsUnknown(): void
    {
        $items = [
            (object) ['id' => 2, 'parent_id' => 1],
            (object) ['id' => 3, 'parent_id' => 99],
        ];

        $root = TreeBuilder::create($items);

        self::assertCount(1, $root->getChildren());
        self::assertSame(2, $root->getChild(0)->getValue()->id);
    }

    #[Test]
    public function createUsesCustomNodeClass(): void
    {
        $items = [
            (object) ['id' => 2, 'parent_id' => 1],
        ];

        $root = TreeBuilder::create($items, nodeClass: TreeBuilderTestNode::class);

        self::assertInstanceOf(TreeBuilderTestNode::class, $root);
        self::assertInstanceOf(TreeBuilderTestNode::class, $root->getChild(0));
    }
}

class TreeBuilderTestNode extends Node {}
