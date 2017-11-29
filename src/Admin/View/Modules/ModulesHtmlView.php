<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Modules;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\JQueryScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\GridView;
use Windwalker\Core\Asset\Asset;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\Data;

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
	 * Property renderer.
	 *
	 * @var  string
	 */
	protected $renderer = RendererHelper::EDGE;

	/**
	 * The fields mapper.
	 *
	 * @var  array
	 */
	protected $fields = [
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
	];

	/**
	 * The grid config.
	 *
	 * @var  array
	 */
	protected $gridConfig = [
		'order_column' => 'module.position, module.ordering'
	];

	/**
	 * init
	 *
	 * @return  void
	 */
	protected function init()
	{
		$this->langPrefix = LunaHelper::getLangPrefix();
	}

	/**
	 * Property labels.
	 *
	 * @var  array
	 */
	protected $labels = [
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
	];

	/**
	 * Property colors.
	 *
	 * @var  array
	 */
	protected $colors = [
		'#00acac', '#3e2723', '#3f51b5', '#3f51b5', '#4a148c', '#004d40', '#4db6ac', '#4e342e', '#5d4037', '#6a1b9a',
		'#7e57c2', '#8d6e63', '#8e24aa', '#9c27b0', '#9fa8da', '#348fe2', '#454b6d', '#455a64', '#512da8', '#607d8b',
		'#673ab7', '#00695c', '#880e4f', '#00897b', '#2196f3', '#006767', '#7266ba', '#009688', '#15395a', '#37474f',
		'#78909c', '#263238', '#283593', '#795548', '#993734', '#ad1457', '#b71c1c', '#ba68c8', '#e08f18', '#e91e63',
		'#e65100', '#f44336', '#fb6d9d', '#ff5252', '#ff9800', '#ff9800', '#ffcc80',
	];

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
		parent::prepareData($data);
		
		$this->prepareScripts();

		// Process module position colors
		$this->preparePositionsColor($data);

		// Find Classes
		$data->modules = ModuleHelper::getModuleTypes();
	}

	/**
	 * preparePositionsColor
	 *
	 * @param   Data $data
	 *
	 * @return  void
	 */
	protected function preparePositionsColor($data)
	{
		$positions = array_values(array_unique($data->items->position));
		$nums = [];

		foreach ($positions as $position)
		{
			$nums[$position] = abs(crc32($position . md5($position)));
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

				$index = abs($nums[$item->position]) % count($this->colors);
				$item->labelColor = $this->colors[abs($index)];

				// B/C
				$index = abs($nums[$item->position]) % count($this->labels);
				$item->labelClass = $this->labels[abs($index)];
			}
			else
			{
				$item->positionName = Translator::translate($this->langPrefix . 'module.position.none');
				$item->labelColor = '#F5F5F5';

				// B/C
				$item->labelClass = $this->defaultLabelClass;
			}

			$item->textColor = ModuleHelper::getTextColor($item->labelColor);

			if (BootstrapScript::$currentVersion === 4)
			{
				$item->labelClass = str_replace('label', 'badge', $item->labelClass);
			}
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
		PhoenixScript::chosen('.hasChosen');
		PhoenixScript::multiSelect('#admin-form table', ['duration' => 100]);
		BootstrapScript::checkbox(BootstrapScript::FONTAWESOME);
		BootstrapScript::tooltip();

		JQueryScript::highlight('.hasHighlight', $this->data->state['input.search.content']);

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

		if (BootstrapScript::$currentVersion === 4)
		{
			$css = str_replace('label', 'badge', $css);
		}

		Asset::internalCSS($css);
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
