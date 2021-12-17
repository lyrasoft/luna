<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tree;

/**
 * The Node class.
 *
 * @since  1.0
 */
class Node implements NodeInterface, \JsonSerializable
{
    /**
     * @var mixed
     */
    protected mixed $value;

    /**
     * parent
     *
     * @var NodeInterface
     */
    protected ?NodeInterface $parent = null;

    /**
     * @var NodeInterface[]
     */
    protected array $children = [];

    /**
     * Property key.
     *
     * @var  integer
     */
    protected int $key = 0;

    /**
     * @param mixed           $value
     * @param NodeInterface[] $children
     */
    public function __construct(mixed $value = null, array $children = [])
    {
        $this->setValue($value);

        if (!empty($children)) {
            $this->setChildren($children);
        }
    }

    /**
     * Set the value of the current node
     *
     * @param mixed $value
     *
     * @return static the current instance
     */
    public function setValue(mixed $value): static
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get the current node value
     *
     * @return mixed
     */
    public function getValue(): mixed
    {
        return $this->value;
    }

    /**
     * Add a child
     *
     * @param NodeInterface $child
     *
     * @return static
     */
    public function addChild(NodeInterface $child): static
    {
        $child->setParent($this);
        $this->children[] = $child;

        return $this;
    }

    /**
     * Remove a node from children
     *
     * @param NodeInterface $child
     *
     * @return static the current instance
     */
    public function removeChild(NodeInterface $child): static
    {
        foreach ($this->children as $key => $myChild) {
            if ($child === $myChild) {
                unset($this->children[$key]);
            }
        }

        $this->children = array_values($this->children);

        $child->setParent(null);

        return $this;
    }

    /**
     * Get a child by key.
     *
     * @param  string|int  $key
     *
     * @return NodeInterface|null
     */
    public function getChild(mixed $key): ?NodeInterface
    {
        if (isset($this->children[$key])) {
            return $this->children[$key];
        }

        return null;
    }

    /**
     * Remove all children
     *
     * @return static The current instance
     */
    public function removeAllChildren(): static
    {
        $this->setChildren([]);

        return $this;
    }

    /**
     * Return the array of children
     *
     * @return static[]
     */
    public function getChildren(): array
    {
        return $this->children;
    }

    /**
     * Replace the children set with the given one
     *
     * @param static[] $children
     *
     * @return static
     */
    public function setChildren(array $children): static
    {
        $this->removeParentFromChildren();

        $this->children = [];

        foreach ($children as $child) {
            $this->addChild($child);
        }

        return $this;
    }

    /**
     * setParent
     *
     * @param  NodeInterface|null  $parent
     *
     * @return static
     */
    public function setParent(?NodeInterface $parent = null): static
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * getParent
     *
     * @return ?NodeInterface
     */
    public function getParent(): ?NodeInterface
    {
        return $this->parent;
    }

    /**
     * getTopParent
     *
     * @return  ?NodeInterface
     *
     * @since  1.7.12
     */
    public function getRoot(): ?NodeInterface
    {
        if (!$this->getParent()) {
            return $this;
        }

        $parents = $this->getAncestors();

        return $parents[array_key_first($parents)] ?? $this;
    }

    /**
     * Retrieves all ancestors of node excluding current node.
     *
     * @return array
     */
    public function getAncestors(): array
    {
        $parents = [];
        $node    = $this;

        while ($parent = $node->getParent()) {
            array_unshift($parents, $parent);
            $node = $parent;
        }

        return $parents;
    }

    /**
     * Retrieves all ancestors of node as well as the node itself.
     *
     * @return Node[]
     */
    public function getAncestorsAndSelf(): array
    {
        return array_merge($this->getAncestors(), [$this]);
    }

    /**
     * Retrieves all neighboring nodes, excluding the current node.
     *
     * @return array
     */
    public function getNeighbors(): array
    {
        $neighbors = $this->getParent()->getChildren();
        $current   = $this;

        // Uses array_values to reset indexes after filter.
        return array_values(
            array_filter(
                $neighbors,
                static function ($item) use ($current) {
                    return $item !== $current;
                }
            )
        );
    }

    /**
     * Returns all neighboring nodes, including the current node.
     *
     * @return Node[]
     */
    public function getNeighborsAndSelf(): array
    {
        return $this->getParent()->getChildren();
    }

    /**
     * Return true if the node is the root, false otherwise
     *
     * @return bool
     */
    public function isRoot(): bool
    {
        return $this->getParent() === null;
    }

    /**
     * Return true if the node is a child, false otherwise.
     *
     * @return bool
     */
    public function isChild(): bool
    {
        return $this->getParent() !== null;
    }

    /**
     * Return true if the node has no children, false otherwise
     *
     * @return bool
     */
    public function isLeaf(): bool
    {
        return count($this->children) === 0;
    }

    /**
     * Alias of isLeaf.
     *
     * @return  bool
     *
     * @since  1.7
     */
    public function hasChildren(): bool
    {
        return !$this->isLeaf();
    }

    /**
     * Return the distance from the current node to the root
     *
     * @return int
     */
    public function getDepth(): int
    {
        if ($this->isRoot()) {
            return 0;
        }

        return $this->getParent()->getDepth() + 1;
    }

    /**
     * Return the height of the tree whose root is this node
     *
     * @return int
     */
    public function getHeight(): int
    {
        if ($this->isLeaf()) {
            return 0;
        }

        $heights = [];

        foreach ($this->getChildren() as $child) {
            $heights[] = $child->getHeight();
        }

        return max($heights) + 1;
    }

    /**
     * Find the root of the node
     *
     * @return static
     */
    public function root(): static
    {
        $node = $this;

        while ($parent = $node->getParent()) {
            $node = $parent;
        }

        return $node;
    }

    /**
     * Return the number of nodes in a tree
     *
     * @return int
     */
    public function getSize(): int
    {
        $size = 1;

        foreach ($this->getChildren() as $child) {
            $size += $child->getSize();
        }

        return $size;
    }

    /**
     * removeParentFromChildren
     *
     * @return  void
     */
    protected function removeParentFromChildren(): void
    {
        foreach ($this->getChildren() as $child) {
            $child->setParent(null);
        }
    }

    /**
     * Retrieve an external iterator
     *
     * @return \Traversable An instance of an object implementing Iterator.
     */
    public function getIterator(): \Traversable
    {
        return new \RecursiveIteratorIterator(
            new RecursiveNodeIterator($this->children),
            \RecursiveIteratorIterator::SELF_FIRST
        );
    }

    /**
     * dump
     *
     * @param bool $recursive
     * @param bool $withoutParent
     *
     * @return  array
     *
     * @since  1.4.2
     */
    public function dump(bool $recursive = true, bool $withoutParent = false): array
    {
        $self = get_object_vars($this);

        if ($withoutParent) {
            unset($self['parent']);
        }

        if ($recursive) {
            /** @var Node $child */
            foreach ($self['children'] as &$child) {
                $child = $child->dump(true, $withoutParent);
            }
        }

        return $self;
    }

    /**
     * Specify data which should be serialized to JSON
     *
     * @return mixed Data which can be serialized by json_encode,
     *               which is a value of any type other than a resource.
     */
    public function jsonSerialize(): mixed
    {
        return $this->dump(true, true);
    }

    /**
     * __get
     *
     * @param string $name
     *
     * @return  mixed
     *
     * @since  1.7.6
     */
    public function __get(string $name)
    {
        return $this->getValue()->$name;
    }

    /**
     * __set
     *
     * @param string $name
     * @param mixed  $value
     *
     * @return  void
     *
     * @since  1.7.6
     */
    public function __set(string $name, mixed $value): void
    {
        $this->getValue()->$name = $value;
    }

    /**
     * __isset
     *
     * @param string $name
     *
     * @return  bool
     *
     * @since  1.7.6
     */
    public function __isset(string $name): bool
    {
        return isset($this->getValue()->$name);
    }

    public function __call(string $name, array $args): mixed
    {
        return $this->getValue()->$name(...$args);
    }

    /**
     * @inheritDoc
     */
    public function iterate(): \Traversable
    {
        return $this->getIterator();
    }
}
