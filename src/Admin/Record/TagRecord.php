<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Table\Table;
use Windwalker\Event\Event;
use Windwalker\Record\Record;

/**
 * The TagRecord class.
 * 
 * @since  1.0
 */
class TagRecord extends Record
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::TAGS;

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
	 * onAfterStore
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterStore(Event $event)
	{
		// Add your logic
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
