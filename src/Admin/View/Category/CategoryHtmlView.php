<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\View\Category;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Script\BootstrapScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\View\EditView;

/**
 * The CategoryHtmlView class.
 * 
 * @since  1.0
 */
class CategoryHtmlView extends EditView
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'category';

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
		$type = $this->getPackage()->app->get('route.extra.category.type');
		$this->langPrefix = LunaHelper::getPackage()->get('admin.language.prefix', 'luna.') . $type . '.';

		return parent::setTitle($title);
	}
}
