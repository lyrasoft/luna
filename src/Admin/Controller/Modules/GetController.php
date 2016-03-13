<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Modules;

use Lyrasoft\Luna\Admin\Model\ModulesModel;
use Lyrasoft\Luna\Admin\View\Modules\ModulesHtmlView;
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
	protected $name = 'modules';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'module';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'modules';

	/**
	 * Property model.
	 *
	 * @var  ModulesModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  ModulesHtmlView
	 */
	protected $view;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $defaultOrdering = 'module.position, module.ordering';

	/**
	 * Property direction.
	 *
	 * @var  string
	 */
	protected $defaultDirection = 'ASC';

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
