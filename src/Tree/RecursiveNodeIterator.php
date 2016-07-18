<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
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
	protected $children = array();

	/**
	 * RecursiveNodeIterator constructor.
	 *
	 * @param NodeInterface[]|NodeInterface $children
	 */
	public function __construct($children)
	{
		if ($children instanceof Node)
		{
			$children = $children->getChildren();
		}

		$this->children = $children;
	}

	/**
	 * Return the current element
	 *
	 * @return mixed Can return any type.
	 */
	public function current()
	{
		return $this->children[$this->key()];
	}

	/**
	 * Move forward to next element
	 *
	 * @return void Any returned value is ignored.
	 */
	public function next()
	{
		next($this->children);
	}

	/**
	 * Return the key of the current element
	 *
	 * @return mixed scalar on success, or null on failure.
	 */
	public function key()
	{
		return key($this->children);
	}

	/**
	 * Checks if current position is valid
	 *
	 * @return boolean The return value will be casted to boolean and then evaluated.
	 *                 Returns true on success or false on failure.
	 */
	public function valid()
	{
		return key($this->children) !== null;
	}

	/**
	 * Rewind the Iterator to the first element
	 *
	 * @return void Any returned value is ignored.
	 */
	public function rewind()
	{
		reset($this->children);
	}

	/**
	 * Returns if an iterator can be created for the current entry.
	 *
	 * @return bool true if the current entry can be iterated over, otherwise returns false.
	 */
	public function hasChildren()
	{
		return !$this->current()->isLeaf();
	}

	/**
	 * Returns an iterator for the current entry.
	 *
	 * @return RecursiveIterator An iterator for the current entry.
	 */
	public function getChildren()
	{
		return new static($this->current());
	}
}
