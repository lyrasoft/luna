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
use Lyrasoft\Unidev\Field\SingleImageDragField;
use Lyrasoft\Luna\Image\CategoryImageHelper;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\Data;

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
	 * Property formControl.
	 *
	 * @var  string
	 */
	protected $formControl = 'item';

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

		$this->model['category.type'] = $type;
	}

	/**
	 * preSave
	 *
	 * @param Data $data
	 *
	 * @return void
	 */
	protected function preSave(Data $data)
	{
		parent::preSave($data);
	}

	/**
	 * postSave
	 *
	 * @param Data $data
	 *
	 * @return  void
	 */
	protected function postSave(Data $data)
	{
		// Save base64 from single upload field
		if (false !== SingleImageDragField::uploadFromController($this, 'image', $data, CategoryImageHelper::getPath($data->id)));
		{
			$this->model->save($data);
		}
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
