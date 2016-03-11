<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Languages;

use Lyrasoft\Luna\Admin\Model\LanguagesModel;
use Lyrasoft\Luna\Admin\View\Languages\LanguagesHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Windwalker\Core\Model\Model;

/**
 * The GetController class.
 * 
 * @since  1.0
 */
class GetController extends ListDisplayController
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'languages';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'language';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'languages';

	/**
	 * Property model.
	 *
	 * @var  LanguagesModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  LanguagesHtmlView
	 */
	protected $view;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $defaultOrdering = null;

	/**
	 * Property direction.
	 *
	 * @var  string
	 */
	protected $defaultDirection = null;

	/**
	 * prepareExecute
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		$this->layout = $this->input->get('layout');

		parent::prepareExecute();
	}

	/**
	 * prepareUserState
	 *
	 * @param   Model $model
	 *
	 * @return  void
	 */
	protected function prepareUserState(Model $model)
	{
		parent::prepareUserState($model);
	}
}
