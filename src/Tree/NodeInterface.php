<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tree;

/**
 * The NodeInterface class.
 *
 * @link   https://github.com/nicmart/Tree/blob/master/src/Node/NodeInterface.php
 *
 * @since  1.0
 */
interface NodeInterface
{
    /**
     * Set the value of the current node
     *
     * @param mixed $value
     *
     * @return static the current instance
     */
    public function setValue(mixed $value): static;

    /**
     * Get the current node value
     *
     * @return mixed
     */
    public function getValue(): mixed;

    /**
     * Add a child
     *
     * @param NodeInterface $child
     *
     * @return static
     */
    public function addChild(NodeInterface $child): static;

    /**
     * Remove a node from children
     *
     * @param NodeInterface $child
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
    public function getChild(mixed $key): ?NodeInterface;

    /**
     * Replace the children set with the given one
     *
     * @param static[] $children
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
     * @return ?NodeInterface
     */
    public function getParent(): ?NodeInterface;

    /**
     * getTopParent
     *
     * @return  ?NodeInterface
     *
     * @since  1.7.12
     */
    public function getRoot(): ?NodeInterface;

    /**
     * Retrieves all ancestors of node excluding current node.
     *
     * @return array
     */
    public function getAncestors(): array;

    /**
     * Retrieves all ancestors of node as well as the node itself.
     *
     * @return Node[]
     */
    public function getAncestorsAndSelf(): array;

    /**
     * Retrieves all neighboring nodes, excluding the current node.
     *
     * @return array
     */
    public function getNeighbors(): array;

    /**
     * Returns all neighboring nodes, including the current node.
     *
     * @return Node[]
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
     * @return  \Traversable|NodeInterface[]
     */
    public function iterate(): \Traversable;
}
