<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tree;

use RecursiveIterator;

/**
 * The RecursiveNodeIterator class.
 *
 * @since  1.0
 */
class RecursiveNodeIterator implements \RecursiveIterator
{
    /**
     * Property children.
     *
     * @var  NodeInterface[]
     */
    protected $nodes = [];

    /**
     * RecursiveNodeIterator constructor.
     *
     * @param NodeInterface[]|NodeInterface $nodes
     */
    public function __construct($nodes)
    {
        if ($nodes instanceof Node) {
            $nodes = $nodes->getChildren();
        }

        $this->nodes = $nodes;
    }

    /**
     * Return the current element
     *
     * @return mixed Can return any type.
     */
    #[\ReturnTypeWillChange]
    public function current()
    {
        return $this->nodes[$this->key()];
    }

    /**
     * Move forward to next element
     *
     * @return void Any returned value is ignored.
     */
    #[\ReturnTypeWillChange]
    public function next()
    {
        next($this->nodes);
    }

    /**
     * Return the key of the current element
     *
     * @return mixed scalar on success, or null on failure.
     */
    #[\ReturnTypeWillChange]
    public function key()
    {
        return key($this->nodes);
    }

    /**
     * Checks if current position is valid
     *
     * @return boolean The return value will be casted to boolean and then evaluated.
     *                 Returns true on success or false on failure.
     */
    #[\ReturnTypeWillChange]
    public function valid()
    {
        return key($this->nodes) !== null;
    }

    /**
     * Rewind the Iterator to the first element
     *
     * @return void Any returned value is ignored.
     */
    #[\ReturnTypeWillChange]
    public function rewind()
    {
        reset($this->nodes);
    }

    /**
     * Returns if an iterator can be created for the current entry.
     *
     * @return bool true if the current entry can be iterated over, otherwise returns false.
     */
    #[\ReturnTypeWillChange]
    public function hasChildren()
    {
        return !$this->current()->isLeaf();
    }

    /**
     * Returns an iterator for the current entry.
     *
     * @return RecursiveIterator An iterator for the current entry.
     */
    #[\ReturnTypeWillChange]
    public function getChildren()
    {
        return new static($this->current());
    }
}
