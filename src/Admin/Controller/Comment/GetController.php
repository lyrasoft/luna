<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Comment;

use Lyrasoft\Luna\Admin\Model\CommentModel;
use Lyrasoft\Luna\Admin\View\Comment\CommentHtmlView;
use Phoenix\Controller\Display\EditDisplayController;
use Windwalker\Core\Model\ModelRepository;
use Windwalker\Core\View\AbstractView;

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
	protected $name = 'comment';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'comment';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'comments';

	/**
	 * Property model.
	 *
	 * @var  CommentModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  CommentHtmlView
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
	 * Prepare view and default model.
	 *
	 * You can configure default model state here, or add more sub models to view.
	 * Remember to call parent to make sure default model already set in view.
	 *
	 * @param AbstractView    $view  The view to render page.
	 * @param ModelRepository $model The default mode.
	 *
	 * @return  void
	 */
	protected function prepareViewModel(AbstractView $view, ModelRepository $model)
	{
		parent::prepareViewModel($view, $model);

		$type = $this->input->get('type');

		$model['comment.type'] = $type;

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
