<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Module;

use Lyrasoft\Luna\Admin\Table\Table;
use Phoenix\Field\ItemListField;

/**
 * The ModuleField class.
 *
 * @since  1.0
 */
class ModuleListField extends ItemListField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::MODULES;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $ordering = null;
}
