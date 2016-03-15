<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Model;

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

		$tagsModel = new TagsModel;

		$tagsModel->addFilter('tag.state', 1);
		$tagsModel->addFilter('map.type', 'article');
		$tagsModel->addFilter('map.target_id', $item->id);
		$tagsModel['list.ordering'] = 'tag.title';

		$item->tags = $tagsModel->getItems();
	}
}
