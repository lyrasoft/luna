<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Category;

use Lyrasoft\Luna\Admin\Model\CategoryModel;
use Lyrasoft\Luna\Admin\View\Category\CategoryHtmlView;
use Phoenix\Controller\Display\EditDisplayController;
use Windwalker\Core\Model\ModelRepository;

/**
 * The GetController class.
 * 
 * @since  1.0
 */
class GetController extends EditDisplayController
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'category';

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
	 * @var  CategoryModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  CategoryHtmlView
	 */
	protected $view;

	/**
	 * prepareExecute
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		parent::prepareExecute();
	}

	/**
	 * prepareExecute
	 *
	 * @param ModelRepository $model
	 *
	 * @return void
	 */
	protected function prepareModelState(ModelRepository $model)
	{
		parent::prepareModelState($model);

		$type = $this->input->get('type');

		$model['category.type'] = $type;

		$this->view['type'] = $type;
	}

	/**
	 * postExecute
	 *
	 * @param mixed $result
	 *
	 * @return  mixed
	 */
	protected function postExecute($result = null)
	{
		return parent::postExecute($result);
	}
}
