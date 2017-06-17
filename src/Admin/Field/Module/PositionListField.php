<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Module;

use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Luna\Module\ModuleHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Phoenix\Field\ItemListField;
use Windwalker\Core\Language\Translator;
use Windwalker\Html\Option;
use Windwalker\Ioc;

/**
 * The ModuleField class.
 *
 * @since  1.0
 */
class PositionListField extends ItemListField
{
	/**
	 * Property table.
	 *
	 * @var  string
	 */
	protected $table = LunaTable::MODULES;

	/**
	 * Property valueField.
	 *
	 * @var  string
	 */
	protected $valueField = 'position';

	/**
	 * Property textField.
	 *
	 * @var  string
	 */
	protected $textField = 'position';

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
	 * @return  mixed|void
	 */
	public function buildInput($attrs)
	{
		$this->prepareScript();

		return parent::buildInput($attrs);
	}

	/**
	 * getItems
	 *
	 * @return  \stdClass[]
	 */
	protected function getItems()
	{
		$db = Ioc::getDatabase();

		$query = $db->getQuery(true);
		$table = $this->get('table', $this->table);

		if (!$table)
		{
			return [];
		}

		$select = $this->get('select', 'DISTINCT position');

		$query->select($select)
			->from($table)
			->where('position != ""')
			->order('position');

		$this->postQuery($query);

		$postQuery = $this->get('postQuery');

		if (is_callable($postQuery))
		{
			call_user_func($postQuery, $query, $this);
		}

		return (array) $db->setQuery($query)->loadAll();
	}

	/**
	 * prepareScript
	 *
	 * @return  void
	 */
	protected function prepareScript()
	{
		$options = (array) $this->get('options');

		if ($this->get('allow_add', false))
		{
			$options['tags'] = true;

			Select2Script::select2('#' . $this->getId(), ['tags' => true]);
		}
	}
}
