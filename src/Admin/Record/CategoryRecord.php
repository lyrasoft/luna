<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Traits\CategoryDataTrait;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Event\Event;
use Windwalker\Record\NestedRecord;

/**
 * The CategoryRecord class.
 * 
 * @since  1.0
 */
class CategoryRecord extends NestedRecord
{
	use CategoryDataTrait;
	
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = LunaTable::CATEGORIES;

	/**
	 * Property keys.
	 *
	 * @var  string
	 */
	protected $keys = 'id';

	/**
	 * onAfterLoad
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterLoad(Event $event)
	{
		// Add your logic
	}

	/**
	 * Method to store a node in the database table.
	 *
	 * @param   boolean $updateNulls True to update null values as well.
	 *
	 * @return  boolean  True on success.
	 *
	 * @since   2.0
	 */
	public function store($updateNulls = false)
	{
		return parent::store($updateNulls);
	}

	/**
	 * onAfterStore
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterStore(Event $event)
	{
	}

	/**
	 * onAfterDelete
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterDelete(Event $event)
	{
		// Add your logic
	}
}
