<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Modules;

use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Asset\Asset;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Windwalker\Core\Language\Translator;
use Windwalker\Filter\InputFilter;

/**
 * The ModulesHtmlView class.
 * 
 * @since  1.0
 */
class ModulesHtmlView extends GridView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'modules';

	/**
	 * The fields mapper.
	 *
	 * @var  array
	 */
	protected $fields = array(
		'pk'          => 'id',
		'title'       => 'title',
		'alias'       => 'alias',
		'state'       => 'state',
		'ordering'    => 'ordering',
		'author'      => 'created_by',
		'author_name' => 'user_name',
		'created'     => 'created',
		'language'    => 'language',
		'lang_title'  => 'lang_title'
	);

	/**
	 * The grid config.
	 *
	 * @var  array
	 */
	protected $gridConfig = array(
		'order_column' => 'module.position, module.ordering'
	);

	/**
	 * Property langPrefix.
	 *
	 * @var  string
	 */
	protected $langPrefix = 'luna.';

	/**
	 * Property labels.
	 *
	 * @var  array
	 */
	protected $labels = array(
		'label label-primary',
		'label label-warning',
		'label label-success',
		'label label-danger',
		'label label-extend-primary',
		'label label-extend-success',
		'label label-extend-info',
		'label label-extend-warning',
		'label label-extend-danger',
		'label label-purple',
		'label label-dark-purple',
		'label label-green',
		'label label-pink',
	);

	/**
	 * Property defaultLabelClass.
	 *
	 * @var  string
	 */
	protected $defaultLabelClass = 'label label-default';

	/**
	 * prepareData
	 *
	 * @param \Windwalker\Data\Data $data
	 *
	 * @return  void
	 */
	protected function prepareData($data)
	{
		$this->prepareScripts();

		$positions = array_values(array_unique($data->items->position));

		$nums = array();

		$filter = new InputFilter;

		foreach ($positions as $position)
		{
			$nums[$position] = abs($filter->clean(md5($position . '-Luna-Label'), InputFilter::UINT) - 32767);
		}

		foreach ($data->items as $item)
		{
			$item->module = ModuleHelper::getModuleType($item->type);

			if ($item->module)
			{
				$item->bind($item->module);
			}
			else
			{
				$item->name = Translator::translate($this->langPrefix . 'module.not.found');
				$item->description = '-';
			}

			// Label Color
			if ($item->position)
			{
				$item->positionName = $item->position;
				$index = $nums[$item->position] % count($this->labels);
				$item->labelClass = $this->labels[$index];
			}
			else
			{
				$item->positionName = Translator::translate($this->langPrefix . 'module.position.none');
				$item->labelClass = $this->defaultLabelClass;
			}
		}

		// Find Classes
		$data->modules = ModuleHelper::getModuleTypes();
	}

	/**
	 * prepareDocument
	 *
	 * @return  void
	 */
	protected function prepareScripts()
	{
		PhoenixScript::core();
		PhoenixScript::grid();
		PhoenixScript::chosen();
		PhoenixScript::multiSelect('#admin-form table', array('duration' => 100));
		BootstrapScript::checkbox(BootstrapScript::GLYPHICONS);
		BootstrapScript::tooltip();

		$css = <<<CSS
/* Color from Ubold */
.label-extend-primary {
	background-color: #15395A;
}
.label-extend-success {
	background-color: #006767;
}
.label-extend-info {
	background-color: #348FE2;
}
.label-extend-warning {
	background-color: #e08f18;
}
.label-extend-danger {
	background-color: #993734;
}
.label-purple {
	background-color: #7266ba;
}
.label-dark-purple {
	background-color: #454B6D;
}
.label-green {
	background-color: #00ACAC;
}
.label-pink {
	background-color: #fb6d9d;
}
CSS;

		Asset::internalStyle($css);
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
