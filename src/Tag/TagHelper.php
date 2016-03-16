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
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Data\Data;
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

		$model->saeTagMaps($type, $targetId, $tags);
	}

	/**
	 * getTags
	 *
	 * @param string  $type
	 * @param integer $targetId
	 * @param array   $conditions
	 * @param array   $fields
	 *
	 * @return DataSet|Data[]
	 */
	public static function getTags($type = null, $targetId = null, $conditions = array(), $fields = array('id', 'title', 'alias'))
	{
		if (!$type && !$targetId)
		{
			$tagMapper = new TagMapper;

			return $tagMapper->find($conditions);
		}

		$conditions = static::addPrefix($conditions);

		$conditions['map.type'] = $type;

		if ($targetId)
		{
			$conditions['map.target_id'] = $targetId;
		}

		return RelationDataMapper::getInstance('tag', LunaTable::TAGS)
			->addTable('map', LunaTable::TAG_MAPS, 'map.tag_id = tag.id')
			->group('tag.id')
			->setSelectFields($fields)
			->find($conditions, 'tag.title');
	}

	/**
	 * getTags
	 *
	 * @param string  $type
	 * @param integer $targetId
	 * @param array   $conditions
	 * @param array   $fields
	 *
	 * @return DataSet|Data[]
	 */
	public static function getAvailableTags($type = null, $targetId = null, $conditions = array(), $fields = array('id', 'title', 'alias'))
	{
		$conditions['state'] = 1;

		return static::getTags($type, $targetId, $conditions, $fields);
	}

	/**
	 * addPrefix
	 *
	 * @param   array  &$conditions
	 *
	 * @return  array
	 */
	public static function addPrefix($conditions)
	{
		foreach ($conditions as $condition => $value)
		{
			if (is_array($condition))
			{
				$conditions[$condition] = static::addPrefix($condition);

				continue;
			}

			if (strpos($condition, '.') === false)
			{
				unset($conditions[$condition]);

				$conditions['tag.' . $condition] = $value;
			}
		}

		return $conditions;
	}
}
