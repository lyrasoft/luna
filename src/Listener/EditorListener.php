<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Event\Event;

/**
 * The EditorListener class.
 *
 * @since  1.0
 */
class EditorListener extends AbstractEditorButtonListener
{
	/**
	 * onLunaEditorGetButtons
	 *
	 * @param Event $event
	 *
	 * @return  void
	 */
	public function onLunaEditorGetButtons(Event $event)
	{
		$buttons = $event['buttons'];

		if ($this->isEnabled('readmore', $event))
		{
			$buttons['readmore'] = $this->readmore($event);
		}
	}

	/**
	 * readmore
	 *
	 * @param Event $event
	 *
	 * @return  string
	 */
	protected function readmore(Event $event)
	{
		$html = WidgetHelper::render('luna.editor.button.readmore', array(
			'id' => $event['field']->getId()
		), WidgetHelper::EDGE);

		return $html;
	}
}
