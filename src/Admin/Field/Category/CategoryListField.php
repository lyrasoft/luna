<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Category;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;
use Windwalker\Query\Query;

/**
 * The CategoryField class.
 *
 * @since  1.0
 */
class CategoryListField extends ItemListField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = LunaTable::CATEGORIES;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $ordering = 'lft';

	/**
	 * postQuery
	 *
	 * @param Query $query
	 *
	 * @return  void
	 */
	protected function postQuery(Query $query)
	{
		$type = $this->get('type');

		if ($type)
		{
			$query->where('type = ' . $query->quote($type));
		}

		if (!$this->get('show_root', false))
		{
			$query->where('parent_id != 0');
		}

		if ($level = $this->get('max_level'))
		{
			$query->where('level <= ' . $level);
		}

		if ($level = $this->get('min_level'))
		{
			$query->where('level >= ' . $level);
		}
	}
}
