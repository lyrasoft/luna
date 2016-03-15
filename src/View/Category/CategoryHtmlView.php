<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Category;

use Phoenix\View\ListView;
use Windwalker\Data\Data;

/**
 * The CategoryHtmlView class.
 * 
 * @since  1.0
 */
class CategoryHtmlView extends ListView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'category';

	/**
	 * prepareData
	 *
	 * @param \Windwalker\Data\Data $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		foreach ($data->items as $item)
		{
			$tags = (array) explode('||', $item->tags);

			sort($tags);

			$tags = array_map(function ($value)
			{
				list($title, $alias) = explode(':', $value);

				return new Data(array(
					'title' => $title,
					'alias' => $alias
				));
			}, $tags);

			$item->tags = $tags;
		}
	}

	/**
	 * setTitle
	 *
	 * @param string $title
	 *
	 * @return  static
	 */
	public function setTitle($title = null)
	{
		return parent::setTitle($title);
	}
}
