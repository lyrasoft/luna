<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Article;

use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ItemView;
use Windwalker\Data\Data;
use Windwalker\String\Utf8String;

/**
 * The ArticleHtmlView class.
 * 
 * @since  1.0
 */
class ArticleHtmlView extends ItemView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'article';

	/**
	 * prepareData
	 *
	 * @param \Windwalker\Data\Data $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		$data->item->text = $data->item->introtext . $data->item->fulltext;

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
		$this->setTitle($data->item->title);

		$desc = Utf8String::substr(strip_tags($data->item->introtext), 0, 150);

		HtmlHeader::addOpenGraph('og:image', $data->item->image);
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
