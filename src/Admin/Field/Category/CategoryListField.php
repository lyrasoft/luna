<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin\Admin\Field\Category;

use Lyrasoft\Merlin\Admin\Table\Table;
use Phoenix\Field\ItemListField;

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
	protected $table = Table::CATEGORIES;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $ordering = null;
}
