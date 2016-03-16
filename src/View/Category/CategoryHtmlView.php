<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Category;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ListView;
use Windwalker\Data\Data;
use Windwalker\String\StringHelper;
use Windwalker\String\Utf8String;

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
	 * initialise
	 *
	 * @return  void
	 */
	protected function initialise()
	{
		$this->langPrefix = LunaHelper::getLangPrefix();
	}

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

			$tags = array_filter($tags, 'strlen');

			sort($tags);

			$tags = array_map(function ($value)
			{
				list($title, $alias) = StringHelper::explode(':', $value);

				return new Data(array(
					'title' => $title,
					'alias' => $alias
				));
			}, $tags);

			$item->tags = $tags;
		}

		$this->prepareHeader($data);
	}

	/**
	 * prepareHeader
	 *
	 * @param Data $data
	 *
	 * @return  void
	 */
	protected function prepareHeader(Data $data)
	{
		$this->setTitle($data->category->title);

		$desc = Utf8String::substr(strip_tags($data->category->description), 0, 150);

		HtmlHeader::addOpenGraph('og:image', $data->category->image);
		HtmlHeader::addOpenGraph('og:description', $desc);
		HtmlHeader::addMetadata('description', $desc);
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
