<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin\Admin\Model;

use Lyrasoft\Merlin\Admin\Record\CategoryRecord;
use Phoenix\Model\AdminModel;
use Windwalker\Data\Data;
use Windwalker\Record\Record;

/**
 * The CategoryModel class.
 * 
 * @since  1.0
 */
class CategoryModel extends AdminModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'category';

	/**
	 * Property reorderConditions.
	 *
	 * @var  array
	 */
	protected $reorderConditions = array();

	/**
	 * reorder
	 *
	 * @param array  $conditions
	 * @param string $orderField
	 *
	 * @return bool
	 */
	public function reorderAll($conditions = array(), $orderField = null)
	{
		/** @var CategoryRecord $record */
		$record = $this->getRecord();

		$record->rebuild();

		return true;
	}

	/**
	 * postSaveHook
	 *
	 * @param Record $record
	 *
	 * @return  void
	 */
	protected function postSaveHook(Record $record)
	{
		/** @var CategoryRecord $record */
		$record->rebuild();
		$record->rebuildPath();
	}

	/**
	 * postGetItem
	 *
	 * @param Data $item
	 *
	 * @return  void
	 */
	protected function postGetItem(Data $item)
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
}
