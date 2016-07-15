<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Article;

use Lyrasoft\Luna\Admin\Model\ArticleModel;
use Lyrasoft\Luna\Admin\View\Article\ArticleHtmlView;
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
	protected $name = 'article';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'article';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'articles';

	/**
	 * Property model.
	 *
	 * @var  ArticleModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  ArticleHtmlView
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
