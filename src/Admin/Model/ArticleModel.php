<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Model;

use Lyrasoft\Luna\Admin\Record\ArticleRecord;
use Lyrasoft\Luna\Admin\Record\Traits\ArticleDataTrait;
use Lyrasoft\Luna\Tag\TagHelper;
use Phoenix\Model\AdminModel;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\DataMapper\Entity\Entity;
use Windwalker\Record\Record;

/**
 * The ArticleModel class.
 * 
 * @since  1.0
 */
class ArticleModel extends AdminModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'article';

	/**
	 * Property reorderConditions.
	 *
	 * @var  array
	 */
	protected $reorderConditions = array(
		'category_id'
	);

	/**
	 * postGetItem
	 *
	 * @param DataInterface|ArticleRecord $item
	 *
	 * @return  void
	 */
	protected function postGetItem(DataInterface $item)
	{
		// Readmore line
		$item->text = $item->introtext . ($item->fulltext ? '<hr id="luna-readmore">' . $item->fulltext : null);

		// tags
		$item->tags = TagHelper::getTags('article', $item->id)->id;
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
