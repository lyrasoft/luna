<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tree;

use Windwalker\Utilities\ArrayHelper;

/**
 * The TreeBuilder class.
 *
 * @since  1.0
 */
class TreeBuilder
{
	/**
	 * fromObjects
	 *
	 * @param object[]|\Traversable $dataSet
	 * @param string                $keyName
	 * @param string                $parentIdName
	 * @param string                $levelName
	 *
	 * @return Node|Node[]
	 */
	public static function create($dataSet, $keyName = 'id', $parentIdName = 'parent_id', $levelName = 'level')
	{
		/** @var Node[] $tree */
		$tree = [];
		$levels = [];

		$root = new Node;

		foreach ($dataSet as $data)
		{
			$pk = ArrayHelper::getValue($data, $keyName);

			if ($pk === null)
			{
				continue;
			}

			$levels[] = ArrayHelper::getValue($data, $levelName);
			$tree[$pk] = new Node($data);
		}

		$minLevel = min($levels);

		foreach ($tree as $node)
		{
			$data = $node->getValue();

			$parentId = ArrayHelper::getValue($data, $parentIdName);
			$level    = (int) ArrayHelper::getValue($data, $levelName);

			if (isset($tree[$parentId]))
			{
				$tree[$parentId]->addChild($node);
			}
			elseif ($level == $minLevel)
			{
				$root->addChild($node);
			}
		}

		return $root;
	}
}
