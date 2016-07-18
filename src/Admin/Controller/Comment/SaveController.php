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
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;

/**
 * The SaveController class.
 * 
 * @since  1.0
 */
class SaveController extends AbstractSaveController
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
	 * Property formControl.
	 *
	 * @var  string
	 */
	protected $formControl = 'item';

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
	 * Property redirectQueryFields.
	 *
	 * @var  array
	 */
	protected $redirectQueryFields = array(
		'type'
	);

	/**
	 * prepareExecute
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		parent::prepareExecute();

		$type = $this->input->get('type');

		$this->model['comment.type'] = $type;
	}

	/**
	 * preSave
	 *
	 * @param DataInterface $data
	 *
	 * @return void
	 */
	protected function preSave(DataInterface $data)
	{
		parent::preSave($data);
	}

	/**
	 * postSave
	 *
	 * @param DataInterface $data
	 *
	 * @return  void
	 */
	protected function postSave(DataInterface $data)
	{
		parent::postSave($data);
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

	/**
	 * getFailRedirect
	 *
	 * @param  DataInterface $data
	 *
	 * @return  string
	 */
	protected function getFailRedirect(DataInterface $data = null)
	{
		$pk = $this->record->{$this->keyName};

		return $this->router->route($this->getName(), array($this->keyName => $pk));
	}
}
