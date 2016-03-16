<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Model;

use Lyrasoft\Luna\Tag\TagHelper;
use Phoenix\Model\ItemModel;
use Windwalker\Data\Data;

/**
 * The ArticleModel class.
 *
 * @since  1.0
 */
class ArticleModel extends ItemModel
{
	/**
	 * postGetItem
	 *
	 * @param Data $item
	 *
	 * @return  void
	 */
	protected function postGetItem(Data $item)
	{
		$item->category = $this->getDataMapper('Category')->findOne($item->category_id);

		$item->tags = TagHelper::getAllTags('article', $item->id);
	}
}
