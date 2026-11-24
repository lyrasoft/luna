<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Tree;

use Lyrasoft\Luna\Tree\Node;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class NodeTest extends TestCase
{
    #[Test]
    public function addChildWrapsRawValueInNodeAndSetsParent(): void
    {
        $root = new Node('root');

        $root->addChild('leaf');

        $child = $root->getChild(0);

        self::assertInstanceOf(Node::class, $child);
        self::assertSame('leaf', $child->getValue());
        self::assertSame($root, $child->getParent());
    }

    #[Test]
    public function addChildKeepsExistingNodeAndSetsParent(): void
    {
        $root = new Node('root');
        $child = new Node('child');

        $root->addChild($child);

        self::assertSame($child, $root->getChild(0));
        self::assertSame($root, $child->getParent());
    }

    #[Test]
    public function removeChildDetachesChildAndReindexesChildren(): void
    {
        $root = new Node('root');
        $first = new Node('first');
        $second = new Node('second');
        $root->addChild($first);
        $root->addChild($second);

        $root->removeChild($first);

        self::assertSame([$second], $root->getChildren());
        self::assertSame($second, $root->getChild(0));
        self::assertNull($first->getParent());
    }

    #[Test]
    public function getChildReturnsNullWhenKeyMissing(): void
    {
        $root = new Node('root');

        self::assertNull($root->getChild(5));
    }

    #[Test]
    public function getChildValuesReturnsValuesOfDirectChildrenOnly(): void
    {
        $root = new Node('root', [
            new Node('a', [new Node('a1')]),
            new Node('b'),
        ]);

        self::assertSame(['a', 'b'], $root->getChildValues());
        self::assertSame(['a', 'b'], $root->childValues);
    }

    #[Test]
    public function getAncestorsAndSelfReturnsRootToSelfOrder(): void
    {
        $root = new Node('root');
        $middle = new Node('middle');
        $leaf = new Node('leaf');
        $root->addChild($middle);
        $middle->addChild($leaf);

        self::assertSame([$root, $middle, $leaf], $leaf->getAncestorsAndSelf());
    }

    #[Test]
    public function getNeighborsExcludesCurrentNode(): void
    {
        $root = new Node('root');
        $first = new Node('first');
        $second = new Node('second');
        $third = new Node('third');
        $root->addChild($first);
        $root->addChild($second);
        $root->addChild($third);

        self::assertSame([$first, $third], $second->getNeighbors());
    }

    #[Test]
    public function getDepthCountsEdgesToRoot(): void
    {
        $root = new Node('root');
        $leaf = new Node('leaf');
        $root->addChild(new Node('middle', [$leaf]));

        self::assertSame(0, $root->getDepth());
        self::assertSame(2, $leaf->getDepth());
    }

    #[Test]
    public function getHeightReturnsLongestPathBelowNode(): void
    {
        $root = new Node('root', [
            new Node('short'),
            new Node('long', [new Node('deep', [new Node('deeper')])]),
        ]);

        self::assertSame(3, $root->getHeight());
        self::assertSame(0, $root->getChild(0)->getHeight());
    }

    #[Test]
    public function rootReturnsTopmostAncestor(): void
    {
        $root = new Node('root');
        $leaf = new Node('leaf');
        $root->addChild(new Node('middle', [$leaf]));

        self::assertSame($root, $leaf->root());
        self::assertSame($root, $root->root());
    }

    #[Test]
    public function getSizeCountsSelfAndAllDescendants(): void
    {
        $root = new Node('root', [
            new Node('a', [new Node('a1'), new Node('a2')]),
            new Node('b'),
        ]);

        self::assertSame(5, $root->getSize());
    }

    #[Test]
    public function dumpIncludesParentByDefault(): void
    {
        $root = new Node('root');
        $child = new Node('child');
        $root->addChild($child);

        $dump = $root->dump();

        self::assertArrayHasKey('parent', $dump);
        self::assertSame('child', $dump['children'][0]['value']);
        self::assertSame($root, $dump['children'][0]['parent']);
    }

    #[Test]
    public function dumpWithoutParentOmitsParentKeyRecursively(): void
    {
        $root = new Node('root', [new Node('child')]);

        $dump = $root->dump(true, true);

        self::assertArrayNotHasKey('parent', $dump);
        self::assertArrayNotHasKey('parent', $dump['children'][0]);
        self::assertSame('child', $dump['children'][0]['value']);
    }

    #[Test]
    public function filterChildrenRemovesChildrenFailingCallback(): void
    {
        $root = new Node('root', [
            new Node(1),
            new Node(2),
            new Node(3),
        ]);

        $root->filterChildren(static fn(Node $node) => $node->getValue() % 2 === 1);

        self::assertSame([1, 3], $root->getChildValues());
    }

    #[Test]
    public function getRootReturnsTopmostAncestorOrSelfWhenRoot(): void
    {
        $root = new Node('root');
        $leaf = new Node('leaf');
        $root->addChild(new Node('middle', [$leaf]));

        self::assertSame($root, $leaf->getRoot());
        self::assertSame($root, $root->getRoot());
    }

    #[Test]
    public function setChildrenDetachesPreviousChildren(): void
    {
        $root = new Node('root', [new Node('old')]);
        $old = $root->getChild(0);
        $new = new Node('new');

        $root->setChildren([$new]);

        self::assertNull($old->getParent());
        self::assertSame([$new], $root->getChildren());
        self::assertSame($root, $new->getParent());
    }

    #[Test]
    public function iterateVisitsAllDescendantsDepthFirst(): void
    {
        $root = new Node('root', [
            new Node('a', [new Node('a1'), new Node('a2')]),
            new Node('b'),
        ]);

        $values = [];

        foreach ($root->iterate() as $node) {
            $values[] = $node->getValue();
        }

        self::assertSame(['a', 'a1', 'a2', 'b'], $values);
    }
}
