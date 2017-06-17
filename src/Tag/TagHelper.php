<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Tag;

use Lyrasoft\Luna\Admin\DataMapper\TagMapper;
use Lyrasoft\Luna\Admin\Model\TagModel;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\DataMapper\DataMapper;

/**
 * The TagHelper class.
 *
 * @since  1.0
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
	 * getTag
	 *
	 * @param mixed  $conditions
	 * @param string $order
	 *
	 * @return  Data
	 */
	public static function getTag($conditions, $order = null)
	{
		return TagMapper::findOne($conditions, $order);
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
	public static function getTags($type = null, $targetId = null, $conditions = [], $fields = ['id', 'title', 'alias'])
	{
		if (!LunaHelper::tableExists('tags') || !LunaHelper::tableExists('tag_maps'))
		{
			return new DataSet;
		}

		if (!$type && !$targetId)
		{
			$tagMapper = new TagMapper;

			return $tagMapper->find($conditions);
		}

		$conditions['map.type'] = $type;

		if ($targetId)
		{
			$conditions['map.target_id'] = $targetId;
		}

		return DataMapper::newRelation('tag', LunaTable::TAGS)
			->addTable('map', LunaTable::TAG_MAPS, 'map.tag_id = tag.id')
			->group('tag.id')
			->select($fields)
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
	public static function getAvailableTags($type = null, $targetId = null, $conditions = [], $fields = ['id', 'title', 'alias'])
	{
		$conditions['state'] = 1;

		return static::getTags($type, $targetId, $conditions, $fields);
	}
}
