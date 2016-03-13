<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Category;

use Lyrasoft\Luna\Tree\Node;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;

/**
 * The CategoryHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class CategoryHelper
{
	/**
	 * createTree
	 *
	 * @param   array|DataSet|Data[] $categories
	 *
	 * @return  Node
	 */
	public static function createTree($categories)
	{
		/** @var Node[] $tree */
		$tree = array();

		$root = new Node;

		foreach ($categories as $category)
		{
			$tree[$category->id] = new Node($category);
		}

		foreach ($tree as $node)
		{
			$category = $node->getValue();

			if (isset($tree[$category->parent_id]))
			{
				$tree[$category->parent_id]->addChild($node);
			}
			else
			{
				$root->addChild($node);
			}
		}

		return $root;
	}
}
