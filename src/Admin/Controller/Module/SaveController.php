<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Module;

use Lyrasoft\Luna\Admin\Model\ModuleModel;
use Lyrasoft\Luna\Admin\View\Module\ModuleHtmlView;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\DataInterface;
use Windwalker\DataMapper\Entity\Entity;

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
	protected $name = 'module';

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
	 * Property formControl.
	 *
	 * @var  string
	 */
	protected $formControl = 'item';

	/**
	 * Property model.
	 *
	 * @var  ModuleModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  ModuleHtmlView
	 */
	protected $view;

	/**
	 * Property params.
	 *
	 * @var  array
	 */
	protected $params;

	/**
	 * Property redirectQueryFields.
	 *
	 * @var  array
	 */
	protected $redirectQueryFields = [
		'type'
	];

	/**
	 * prepareExecute
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		parent::prepareExecute();
		
		$this->params = $this->input->getRaw('params');
		$this->data['params'] = $this->params;
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
	 * getSuccessRedirect
	 *
	 * @param  DataInterface|Entity $data
	 *
	 * @return  string
	 */
	protected function getSuccessRedirect(DataInterface $data = null)
	{
		if ($this->task === 'save2new')
		{
			$this->input->set('type', $data->type);
		}

		if ($this->task === 'save2copy')
		{
			$data->state = 0;
		}

		return parent::getSuccessRedirect($data);
	}
}
