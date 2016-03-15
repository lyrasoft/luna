<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Module;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;
use Windwalker\Core\Frontend\Bootstrap;
use Windwalker\Core\Language\Translator;
use Windwalker\Utilities\Queue\Priority;

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
	 * initialise
	 *
	 * @return  void
	 */
	protected function initialise()
	{
		$this->langPrefix = LunaHelper::getLangPrefix();
	}

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

		$data->type = $data->item->type ? : $data->state->get('module.type', $data->form->getField('type')->getValue());

		if ($data->type)
		{
			$data->form->getField('type')->setValue($data->type);
		}

		if (!$data->type)
		{
			$this->package->app->addFlash(Translator::translate($this->langPrefix . 'module.edit.message.no.type'), Bootstrap::MSG_WARNING)
				->redirect($this->router->http('modules'));
		}

		$data->moduleType = ModuleHelper::getModuleType($data->type);;
		$data->module     = $data->moduleType->createInstance($data->item);

		// Add layout path
		$this->addPath($data->module->getDir() . '/Templates', Priority::BELOW_NORMAL);

		$this->setTitle(
			Translator::sprintf('phoenix.title.edit', Translator::translate($this->langPrefix . $this->getName() . '.title')) .
			': ' . $data->moduleType->name
		);
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
}
