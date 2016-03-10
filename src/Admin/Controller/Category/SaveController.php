<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Category;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Admin\Model\CategoryModel;
use Lyrasoft\Luna\Admin\View\Category\CategoryHtmlView;
use Lyrasoft\Luna\Image\CategoryImageHelper;
use Lyrasoft\Unidev\Image\Base64Image;
use Lyrasoft\Unidev\Image\ImageUploader;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\Data;
use Windwalker\Filesystem\File;

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
	 * prepareExecute
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		parent::prepareExecute();
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
		$image = $this->input->post->getRaw('input-item-image-data');
		$delete = $this->input->post->getRaw('input-item-image-delete-image');

		if ($image)
		{
			$type = Base64Image::getTypeFromBase64($image);

			if ($type)
			{
				$tempFile = CategoryImageHelper::getTempFile($data->id);

				Base64Image::toFile($image, $tempFile);

				// Upload to S3
				$url = ImageUploader::upload($tempFile, CategoryImageHelper::getPath($data->id));

				if (is_file($tempFile))
				{
					File::delete($tempFile);
				}

				$data->image = $url;

				$this->model->save($data);
			}
		}
		elseif ($delete)
		{
			$data->image = '';

			$mapper = new CategoryMapper;
			$user = $mapper->findOne($data->id);
			$user->image = '';
			$mapper->updateOne($user, 'id', true);
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
