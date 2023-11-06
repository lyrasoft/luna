<?php

namespace Lyrasoft\Luna\Tree;

use RecursiveIterator;

/**
 * The RecursiveNodeIterator class.
 *
 * @since  1.0
 */
class RecursiveNodeIterator implements RecursiveIterator
{
    /**
     * Property children.
     *
     * @var  NodeInterface[]
     */
    protected array $nodes = [];

    /**
     * RecursiveNodeIterator constructor.
     *
     * @param  NodeInterface[]|NodeInterface  $nodes
     */
    public function __construct(array|NodeInterface $nodes)
    {
        if ($nodes instanceof Node) {
            $nodes = $nodes->getChildren();
        }

        $this->nodes = $nodes;
    }

    /**
     * Return the current element
     *
     * @return NodeInterface|null Can return any type.
     */
    public function current(): ?NodeInterface
    {
        return $this->nodes[$this->key()];
    }

    /**
     * Move forward to next element
     *
     * @return void Any returned value is ignored.
     */
    public function next(): void
    {
        next($this->nodes);
    }

    /**
     * Return the key of the current element
     *
     * @return mixed scalar on success, or null on failure.
     */
    public function key(): mixed
    {
        return key($this->nodes);
    }

    /**
     * Checks if current position is valid
     *
     * @return boolean The return value will be casted to boolean and then evaluated.
     *                 Returns true on success or false on failure.
     */
    public function valid(): bool
    {
        return key($this->nodes) !== null;
    }

    /**
     * Rewind the Iterator to the first element
     *
     * @return void Any returned value is ignored.
     */
    public function rewind(): void
    {
        reset($this->nodes);
    }

    /**
     * Returns if an iterator can be created for the current entry.
     *
     * @return bool true if the current entry can be iterated over, otherwise returns false.
     */
    public function hasChildren(): bool
    {
        return !$this->current()?->isLeaf();
    }

    /**
     * Returns an iterator for the current entry.
     *
     * @return RecursiveIterator An iterator for the current entry.
     */
    public function getChildren(): RecursiveIterator
    {
        return new static($this->current());
    }
}
