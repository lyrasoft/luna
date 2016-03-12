<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Module;

use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;

/**
 * The ModuleHtmlView class.
 * 
 * @since  1.0
 */
class ModuleHtmlView extends EditView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'module';

	/**
	 * Property formDefinition.
	 *
	 * @var  string
	 */
	protected $formDefinition = 'edit';

	/**
	 * Property formControl.
	 *
	 * @var  string
	 */
	protected $formControl = 'item';

	/**
	 * Property formLoadData.
	 *
	 * @var  boolean
	 */
	protected $formLoadData = true;

	/**
	 * Property langPrefix.
	 *
	 * @var  string
	 */
	protected $langPrefix = 'luna.';

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

		$data->type       = $data->item->type ? : $data->state->get('module.type');
		$data->moduleType = ModuleHelper::getModuleType($data->type);;
		$data->module     = $data->moduleType->createInstance($data->item);
	}

	/**
	 * prepareDocument
	 *
	 * @return  void
	 */
	protected function prepareScripts()
	{
		PhoenixScript::core();
		PhoenixScript::chosen();
		PhoenixScript::formValidation();
		BootstrapScript::checkbox(BootstrapScript::GLYPHICONS);
		BootstrapScript::buttonRadio();
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
