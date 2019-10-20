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
    public function setValue($value);

    /**
     * Get the current node value
     *
     * @return mixed
     */
    public function getValue();

    /**
     * Add a child
     *
     * @param NodeInterface $child
     *
     * @return mixed
     */
    public function addChild(NodeInterface $child);

    /**
     * Remove a node from children
     *
     * @param NodeInterface $child
     *
     * @return static the current instance
     */
    public function removeChild(NodeInterface $child);

    /**
     * Remove all children
     *
     * @return static The current instance
     */
    public function removeAllChildren();

    /**
     * Return the array of children
     *
     * @return static[]
     */
    public function getChildren();

    /**
     * Get a child by key.
     *
     * @param   string|int $key
     *
     * @return  mixed
     */
    public function getChild($key);

    /**
     * Replace the children set with the given one
     *
     * @param static[] $children
     *
     * @return mixed
     */
    public function setChildren(array $children);

    /**
     * setParent
     *
     * @param NodeInterface $parent
     *
     * @return void
     */
    public function setParent(NodeInterface $parent = null);

    /**
     * getParent
     *
     * @return static
     */
    public function getParent();

    /**
     * Retrieves all ancestors of node excluding current node.
     *
     * @return array
     */
    public function getAncestors();

    /**
     * Retrieves all ancestors of node as well as the node itself.
     *
     * @return Node[]
     */
    public function getAncestorsAndSelf();

    /**
     * Retrieves all neighboring nodes, excluding the current node.
     *
     * @return array
     */
    public function getNeighbors();

    /**
     * Returns all neighboring nodes, including the current node.
     *
     * @return Node[]
     */
    public function getNeighborsAndSelf();

    /**
     * Return true if the node is the root, false otherwise
     *
     * @return bool
     */
    public function isRoot();

    /**
     * Return true if the node is a child, false otherwise.
     *
     * @return bool
     */
    public function isChild();

    /**
     * Return true if the node has no children, false otherwise
     *
     * @return bool
     */
    public function isLeaf();

    /**
     * Return the distance from the current node to the root
     *
     * @return int
     */
    public function getDepth();

    /**
     * Return the height of the tree whose root is this node
     *
     * @return int
     */
    public function getHeight();

//	/**
//	 * Accept method for the visitor pattern (see http://en.wikipedia.org/wiki/Visitor_pattern)
//	 *
//	 * @param Visitor $visitor
//	 * @return void
//	 */
//	public function accept(Visitor $visitor);
}
