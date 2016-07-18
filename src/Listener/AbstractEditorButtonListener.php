<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Windwalker\Event\Event;

/**
 * The AbstractEditorButtonListener class.
 *
 * @since  1.0
 */
abstract class AbstractEditorButtonListener
{
	/**
	 * isEnabled
	 *
	 * @param string $name
	 * @param Event  $event
	 *
	 * @return  boolean
	 */
	protected function isEnabled($name, Event $event)
	{
		$includes = (array) $event['includes'];
		$excludes = (array) $event['excludes'];

		$bool = false;

		if ($includes && in_array($name, $includes))
		{
			$bool = true;
		}

		if ($excludes && (in_array($name, $excludes) || in_array('*', $excludes)))
		{
			$bool = false;
		}

		return $bool;
	}
}
