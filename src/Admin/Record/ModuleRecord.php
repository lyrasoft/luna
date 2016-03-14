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
 * The ModuleRecord class.
 * 
 * @since  1.0
 */
class ModuleRecord extends Record
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::MODULES;

	/**
	 * onAfterLoad
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onAfterLoad(Event $event)
	{
		if ($this->params && is_string($this->params))
		{
			$this->params = json_decode($this->params);
		}
	}

	/**
	 * onBeforeStore
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onBeforeStore(Event $event)
	{
		if ($this->params && !is_string($this->params))
		{
			$this->params = json_encode($this->params);
		}
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