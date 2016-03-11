<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Tag;

use Lyrasoft\Luna\Admin\Table\Table;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Phoenix\Field\ItemListField;

/**
 * The TagField class.
 *
 * @since  1.0
 */
class TagListField extends ItemListField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = Table::TAGS;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $ordering = null;

	/**
	 * buildInput
	 *
	 * @param array $attrs
	 *
	 * @return  string
	 */
	public function buildInput($attrs)
	{
		$id = $attrs['id'];

		Select2Script::tag('#' . $id);

		return parent::buildInput($attrs);
	}
}
