<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Article;

use Lyrasoft\Luna\Admin\DataMapper\TagMapMapper;
use Lyrasoft\Luna\Admin\Model\ArticleModel;
use Lyrasoft\Luna\Admin\Model\TagModel;
use Lyrasoft\Luna\Admin\View\Article\ArticleHtmlView;
use Lyrasoft\Unidev\Field\SingleImageDragField;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Image\ArticleImageHelper;
use Lyrasoft\Luna\Tag\TagHelper;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\Filter\InputFilter;

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
	 * Property formControl.
	 *
	 * @var  string
	 */
	protected $formControl = 'item';

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
	 * preSave
	 *
	 * @param DataInterface $data
	 *
	 * @return void
	 */
	protected function preSave(DataInterface $data)
	{
		parent::preSave($data);

		$data->text = $this->input->getByPath($this->formControl . '.text', null, InputFilter::RAW);
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
		// Image
		if (false !== SingleImageDragField::uploadFromController($this, 'image', $data, ArticleImageHelper::getPath($data->id)));
		{
			$this->model->save($data);
		}
		
		// Tag
		/** @var TagModel $model */
		$model = $this->getModel('Tag');
		$model->saveTagMaps('article', $data->id, $data->tags);
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
