<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Modules;

use Lyrasoft\Luna\Module\AbstractModule;
use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Windwalker\Core\Language\Translator;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
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
		'label label-info',
		'label label-success',
	);

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
			$nums[$position] = $filter->clean(md5($position), InputFilter::UINT) + 1;
		}

		foreach ($data->items as $item)
		{
			/** @var AbstractModule $class */
			$class = $item->class;

			if (class_exists($class))
			{
				$item->name = Translator::translate($class::getName());
				$item->description = Translator::translate($class::getDescription());
			}
			else
			{
				$item->name = Translator::translate($this->langPrefix . 'module.not.found');
				$item->description = '-';
			}

			// Label Color
			$index = $nums[$item->position] % count($this->labels);
			$item->labelClass = $this->labels[$index];
		}

		// Find Classes
		$data->modules = new DataSet;

		/** @var AbstractModule $moduleClass */
		foreach (ModuleHelper::findModuleClasses() as $moduleClass)
		{
			$module = new Data;
			$module->class       = $moduleClass;
			$module->name        = $moduleClass::getName();
			$module->description = $moduleClass::getDescription();
			$module->icon        = $moduleClass::getIcon();

			$data->modules[] = $module;
		}
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
