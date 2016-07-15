<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Tag;

use Lyrasoft\Luna\Admin\Model\TagModel;
use Lyrasoft\Luna\Admin\View\Tag\TagHtmlView;
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
	protected $name = 'tag';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'tag';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'tags';

	/**
	 * Property model.
	 *
	 * @var  TagModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  TagHtmlView
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
