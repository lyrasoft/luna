<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\View\Article;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Phoenix\Html\HtmlHeader;
use Phoenix\View\ItemView;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\Data;
use Windwalker\Router\Exception\RouteNotFoundException;
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
	 * Property renderer.
	 *
	 * @var  string
	 */
	protected $renderer = RendererHelper::EDGE;

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
		if ($data->item->isNull())
		{
			throw new RouteNotFoundException('Article not found', 404);
		}

		if (Locale::isEnabled() && $data->item->id)
		{
			if (Locale::getLocale() != $data->item->language && $data->item->language != '*')
			{
				throw new RouteNotFoundException(sprintf('Language %s not support for this article', Locale::getLocale()), 404);
			}
		}

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
