<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin\Admin\Field\Article;

use Lyrasoft\Merlin\Admin\Table\Table;
use Phoenix\Field\ItemListField;

/**
 * The ArticleField class.
 *
 * @since  1.0
 */
class ArticleListField extends ItemListField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::ARTICLES;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $ordering = null;
}
