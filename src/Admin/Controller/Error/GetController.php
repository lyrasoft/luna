<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Error;

use Phoenix\Controller\Display\ItemDisplayController;
use Windwalker\Core\Model\ModelRepository;

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
	 * @param   ModelRepository $model
	 *
	 * @return  void
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
