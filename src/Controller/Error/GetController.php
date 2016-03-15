<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Error;

use Lyrasoft\Luna\Model\ErrorModel;
use Lyrasoft\Luna\View\Error\ErrorHtmlView;
use Phoenix\Controller\Display\ItemDisplayController;
use Windwalker\Core\Model\Model;

/**
 * The GetController class.
 * 
 * @since  1.0
 */
class GetController extends ItemDisplayController
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'error';

	/**
	 * Property itemName.
	 *
	 * @var  string
	 */
	protected $itemName = 'error';

	/**
	 * Property listName.
	 *
	 * @var  string
	 */
	protected $listName = 'error';

	/**
	 * prepareExecute
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		parent::prepareExecute();

		$this->view['exception'] = $this->input->getRaw('exception');
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
