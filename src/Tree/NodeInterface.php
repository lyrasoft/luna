<?php

namespace Lyrasoft\Luna\Tree;

use IteratorAggregate;
use Traversable;

/**
 * The NodeInterface class.
 *
 * @template T
 *
 * @link   https://github.com/nicmart/Tree/blob/master/src/Node/NodeInterface.php
 *
 * @since  1.0
 */
interface NodeInterface extends IteratorAggregate
{
    /**
     * Set the value of the current node
     *
     * @param  T  $value
     *
     * @return static the current instance
     */
    public function setValue(mixed $value): static;

    /**
     * Get the current node value
     *
     * @return T
     */
    public function getValue(): mixed;

    /**
     * Add a child
     *
     * @param  NodeInterface  $child
     *
     * @return static
     */
    public function addChild(mixed $child): static;

    /**
     * Remove a node from children
     *
     * @param  NodeInterface  $child
     *
     * @return static the current instance
     */
    public function removeChild(NodeInterface $child): static;

    /**
     * Remove all children
     *
     * @return static The current instance
     */
    public function removeAllChildren(): static;

    /**
     * Return the array of children
     *
     * @return static[]
     */
    public function getChildren(): array;

    /**
     * Get a child by key.
     *
     * @param  string|int  $key
     *
     * @return NodeInterface|null
     */
    public function getChild(mixed $key): ?static;

    /**
     * Replace the children set with the given one
     *
     * @param  static[]  $children
     *
     * @return static
     */
    public function setChildren(array $children): static;

    /**
     * setParent
     *
     * @param  NodeInterface|null  $parent
     *
     * @return static
     */
    public function setParent(?NodeInterface $parent = null): static;

    /**
     * getParent
     *
     * @return ?static
     */
    public function getParent(): ?static;

    /**
     * getTopParent
     *
     * @return  ?static
     *
     * @since  1.7.12
     */
    public function getRoot(): ?static;

    /**
     * Retrieves all ancestors of node excluding current node.
     *
     * @return static[]
     */
    public function getAncestors(): array;

    /**
     * Retrieves all ancestors of node as well as the node itself.
     *
     * @return static[]
     */
    public function getAncestorsAndSelf(): array;

    /**
     * Retrieves all neighboring nodes, excluding the current node.
     *
     * @return static[]
     */
    public function getNeighbors(): array;

    /**
     * Returns all neighboring nodes, including the current node.
     *
     * @return static[]
     */
    public function getNeighborsAndSelf(): array;

    /**
     * Return true if the node is the root, false otherwise
     *
     * @return bool
     */
    public function isRoot(): bool;

    /**
     * Return true if the node is a child, false otherwise.
     *
     * @return bool
     */
    public function isChild(): bool;

    /**
     * Return true if the node has no children, false otherwise
     *
     * @return bool
     */
    public function isLeaf(): bool;

    /**
     * Return the distance from the current node to the root
     *
     * @return int
     */
    public function getDepth(): int;

    /**
     * Return the height of the tree whose root is this node
     *
     * @return int
     */
    public function getHeight(): int;

    /**
     * iterate
     *
     * @return  Traversable|static[]
     */
    public function iterate(): Traversable;
}
