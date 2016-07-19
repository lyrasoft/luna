<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Categories;

use Lyrasoft\Luna\Admin\Model\CategoriesModel;
use Lyrasoft\Luna\Admin\View\Categories\CategoriesHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Phoenix\Model\ListModel;
use Windwalker\Core\Model\ModelRepository;

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
	protected $name = 'categories';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'category';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'categories';

	/**
	 * Property model.
	 *
	 * @var  CategoriesModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  CategoriesHtmlView
	 */
	protected $view;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $defaultOrdering = 'category.lft';

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
	 * prepareModelState
	 *
	 * @param   ModelRepository $model
	 *
	 * @return  void
	 */
	protected function prepareModelState(ModelRepository $model)
	{
		/** @var ListModel $model */
		parent::prepareModelState($model);

		$type = $this->input->get('type');

		$model['category.type'] = $type;
		$model->addFilter('category.type', $type);

		$this->view['type'] = $type;
	}
}
