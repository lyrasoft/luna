<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tag;

use Lyrasoft\Luna\Admin\DataMapper\TagMapMapper;
use Lyrasoft\Luna\Admin\DataMapper\TagMapper;
use Lyrasoft\Luna\Admin\Model\TagModel;
use Lyrasoft\Luna\Admin\Table\Table;
use Windwalker\Data\DataSet;
use Windwalker\DataMapper\RelationDataMapper;

/**
 * The TagHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class TagHelper
{
	/**
	 * saveTags
	 *
	 * @param   string         $type
	 * @param   integer        $targetId
	 * @param   array|DataSet  $tags
	 *
	 * @return  void
	 */
	public static function saveTags($type, $targetId, $tags)
	{
		$model = new TagModel;

		$model->saveTagMaps($type, $targetId, $tags);
	}

	/**
	 * getTags
	 *
	 * @param string   $type
	 * @param integer  $targetId
	 * @param array    $conditions
	 *
	 * @return DataSet
	 */
	public static function getTags($type = null, $targetId = null, $conditions = array())
	{
		if (!$type && !$targetId)
		{
			$tagMapper = new TagMapper;

			return $tagMapper->find($conditions);
		}

		foreach ($conditions as &$condition)
		{
			if (strpos($condition, '.') === false)
			{
				$condition = 'tag.' . $condition;
			}
		}

		$conditions['map.type'] = $type;

		if ($targetId)
		{
			$conditions['map.target_id'] = $targetId;
		}

		return RelationDataMapper::getInstance('tag', Table::TAGS)
			->addTable('map', Table::TAG_MAPS, 'map.tag_id = tag.id')
			->group('tag.id')
			->find($conditions);
	}
}
