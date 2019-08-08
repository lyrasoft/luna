<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tree;

use RecursiveIteratorIterator;

/**
 * The Node class.
 *
 * @since  1.0
 */
class Node implements NodeInterface, \IteratorAggregate, \JsonSerializable
{
    /**
     * @var mixed
     */
    protected $value;

    /**
     * parent
     *
     * @var NodeInterface
     * @access private
     */
    protected $parent;

    /**
     * @var NodeInterface[]
     */
    protected $children = [];

    /**
     * Property key.
     *
     * @var  integer
     */
    protected $key = 0;

    /**
     * @param mixed           $value
     * @param NodeInterface[] $children
     */
    public function __construct($value = null, array $children = [])
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
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get the current node value
     *
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Add a child
     *
     * @param NodeInterface $child
     *
     * @return mixed
     */
    public function addChild(NodeInterface $child)
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
    public function removeChild(NodeInterface $child)
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
     * @param   string|int $key
     *
     * @return  static
     */
    public function getChild($key)
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
    public function removeAllChildren()
    {
        $this->setChildren([]);

        return $this;
    }

    /**
     * Return the array of children
     *
     * @return static[]
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Replace the children set with the given one
     *
     * @param static[] $children
     *
     * @return mixed
     */
    public function setChildren(array $children)
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
     * @param NodeInterface $parent
     *
     * @return void
     */
    public function setParent(NodeInterface $parent = null)
    {
        $this->parent = $parent;
    }

    /**
     * getParent
     *
     * @return static
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * getTopParent
     *
     * @param bool $selfAsDefault Return self if already top node.
     *
     * @return  Node|mixed
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getTopParent(bool $selfAsDefault = true)
    {
        $parents = $this->getAncestors();

        array_shift($parents);

        return $parents[array_key_first($parents)] ?? ($selfAsDefault ? $this : null);
    }

    /**
     * Retrieves all ancestors of node excluding current node.
     *
     * @return array
     */
    public function getAncestors()
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
    public function getAncestorsAndSelf()
    {
        return array_merge($this->getAncestors(), [$this]);
    }

    /**
     * Retrieves all neighboring nodes, excluding the current node.
     *
     * @return array
     */
    public function getNeighbors()
    {
        $neighbors = $this->getParent()->getChildren();
        $current   = $this;

        // Uses array_values to reset indexes after filter.
        return array_values(
            array_filter(
                $neighbors,
                function ($item) use ($current) {
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
    public function getNeighborsAndSelf()
    {
        return $this->getParent()->getChildren();
    }

    /**
     * Return true if the node is the root, false otherwise
     *
     * @return bool
     */
    public function isRoot()
    {
        return $this->getParent() === null;
    }

    /**
     * Return true if the node is a child, false otherwise.
     *
     * @return bool
     */
    public function isChild()
    {
        return $this->getParent() !== null;
    }

    /**
     * Return true if the node has no children, false otherwise
     *
     * @return bool
     */
    public function isLeaf()
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
    public function getDepth()
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
    public function getHeight()
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
    public function root()
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
    public function getSize()
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
    protected function removeParentFromChildren()
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
    public function getIterator()
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
    public function dump($recursive = true, $withoutParent = false)
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
    public function jsonSerialize()
    {
        return $this->dump(true, true);
    }
}
