<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Module;

use Lyrasoft\Luna\Admin\Table\Table;
use Lyrasoft\Luna\Module\ModuleHelper;
use Windwalker\Form\Field\ListField;
use Windwalker\Html\Option;

/**
 * The ModuleField class.
 *
 * @since  1.0
 */
class ModuleTypeListField extends ListField
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
	protected $ordering = 'type';

	/**
	 * prepareOptions
	 *
	 * @return  array|Option[]
	 */
	protected function prepareOptions()
	{
		$attribs = (array) $this->get('attribs');

		$options = array();

		$types = ModuleHelper::getModuleTypes();

		foreach ($types as $type)
		{
			$options[] = new Option($type->name, $type->type, $attribs);
		}

		return $options;
	}
}
