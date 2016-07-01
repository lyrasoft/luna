<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Traits\ArticleDataTrait;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Event\Event;
use Windwalker\Record\Record;

/**
 * The ArticleRecord class.
 * 
 * @since  1.0
 */
class ArticleRecord extends Record
{
	use ArticleDataTrait;
	
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = LunaTable::ARTICLES;

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
	 * bind
	 *
	 * @param array $src
	 * @param array $ignore
	 *
	 * @return  static
	 */
	public function bind($src, $ignore = array())
	{
		$result = parent::bind($src, $ignore);

		if (is_object($src))
		{
			$src = get_object_vars($src);
		}

		if (isset($src['text']) && $src['text'] !== '')
		{
			$pattern = '/<hr\s+id=("|\')luna-readmore("|\')\s*\/*>/i';
			$tagPos = preg_match($pattern, $src['text']);

			if ($tagPos == 0)
			{
				$this->introtext = $src['text'];
				$this->fulltext = '';
			}
			else
			{
				list ($this->introtext, $this->fulltext) = preg_split($pattern, $src['text'], 2);
			}
		}

		return $result;
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
