<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Model;

use Lyrasoft\Luna\Admin\DataMapper\TagMapMapper;
use Phoenix\Model\AdminModel;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\Data\DataSet;
use Windwalker\Record\Record;

/**
 * The TagModel class.
 * 
 * @since  1.0
 */
class TagModel extends AdminModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'tag';

	/**
	 * Property reorderConditions.
	 *
	 * @var  array
	 */
	protected $reorderConditions = array();

	/**
	 * postGetItem
	 *
	 * @param DataInterface $item
	 *
	 * @return  void
	 */
	protected function postGetItem(DataInterface $item)
	{
		// Do some stuff
	}

	/**
	 * prepareRecord
	 *
	 * @param Record $record
	 *
	 * @return  void
	 */
	protected function prepareRecord(Record $record)
	{
		parent::prepareRecord($record);
	}

	/**
	 * getReorderConditions
	 *
	 * @param Record $record
	 *
	 * @return  array  An array of conditions to add to ordering queries.
	 */
	public function getReorderConditions(Record $record)
	{
		return parent::getReorderConditions($record);
	}

	/**
	 * Method to set new item ordering as first or last.
	 *
	 * @param   Record $record   Item table to save.
	 * @param   string $position `first` or other are `last`.
	 *
	 * @return  void
	 */
	public function setOrderPosition(Record $record, $position = self::ORDER_POSITION_LAST)
	{
		parent::setOrderPosition($record, $position);
	}

	/**
	 * saveTags
	 *
	 * @param   string         $type
	 * @param   integer        $targetId
	 * @param   array|DataSet  $tags
	 *
	 * @return  void
	 */
	public function saveTagMaps($type, $targetId, $tags)
	{
		if ($tags instanceof DataSet)
		{
			$tags = $tags->id;
		}

		$tags = (array) $tags;

		$tagMapMapper = $this->getDataMapper('TagMap');

		$tagMapMapper->delete(array('target_id' => $targetId, 'type' => 'article'));

		foreach ($tags as $tagId)
		{
			// If has new# prefix, create tag.
			if (strpos($tagId, 'new#') === 0)
			{
				$data = new Data;
				$data->title = substr($tagId, 4);
				$data->state = 1;

				$this->save($data);

				$tagId = $data->id;
			}

			$tagMapMapper->createOne(array('tag_id' => $tagId, 'target_id' => $targetId, 'type' => $type));
		}
	}
}
