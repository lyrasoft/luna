<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Category;

use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Model\ArticlesModel;
use Lyrasoft\Luna\View\Category\CategoryHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Windwalker\Core\Model\Model;
use Windwalker\Core\View\BladeHtmlView;
use Windwalker\Data\Data;
use Windwalker\Filter\InputFilter;

/**
 * The GetController class.
 * 
 * @since  1.0
 */
class GetController extends ListDisplayController
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
	protected $listName = 'category';

	/**
	 * Property model.
	 *
	 * @var  ArticlesModel
	 */
	protected $model;

	/**
	 * Property view.
	 *
	 * @var  CategoryHtmlView
	 */
	protected $view;

	/**
	 * Property ordering.
	 *
	 * @var  string
	 */
	protected $defaultOrdering = 'article.created';

	/**
	 * Property direction.
	 *
	 * @var  string
	 */
	protected $defaultDirection = 'DESC';

	/**
	 * Property deep.
	 *
	 * @var  boolean
	 */
	protected $deep = true;

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
	 * prepareUserState
	 *
	 * @param   Model $model
	 *
	 * @return  void
	 */
	protected function prepareUserState(Model $model)
	{
		parent::prepareUserState($model);

		$path = (array) $this->input->getVar('path');
		
		$tagAlias = $this->input->get('tag');

		if ($path)
		{
			$page = null;

			if (is_numeric($path[count($path) - 1]))
			{
				$page = array_pop($path);
			}
			
			if (!count($path))
			{
				throw new \RuntimeException('Page not found.', 404);
			}

			if ($page)
			{
				$this->input->set('page', $page);
			}
			
			$path = implode('/', $path);

			$catModel = $this->getModel('Category');

			$type = $this->app->get('route.extra.category.type');

			/** @var Data $category */
			$category = $catModel->getItem(['path' => $path, 'state' => 1, 'type' => $type]);

			if ($category->isNull())
			{
				throw new \RuntimeException('Page not found', 404);
			}

			$this->view['category'] = $category;

			$this->checkAccess($category);

			// Set article filters
			if ($this->deep)
			{
				$this->model->addFilter('category_keys', $category->lft . ',' . $category->rgt);
			}
			else
			{
				$this->model->addFilter('article.category_id', $category->id);
			}
		}
		else
		{
			$this->view['category'] = new Data;
		}

		if ($tagAlias)
		{
			$tagModel = $this->getModel('Tag');

			/** @var Data $tag */
			$tag = $tagModel->getItem(array('alias' => $tagAlias, 'state' => 1));

			if ($tag->isNull())
			{
				throw new \RuntimeException('Page not found', 404);
			}

			$this->view['tag'] = $tag;

			$this->checkAccess($tag);

			// Set article filters
			$this->model->addFilter('mapping.tag_id', $tag->id);
		}
		else
		{
			$this->view['tag'] = new Data;
		}

		if (Locale::isEnabled(Locale::CLIENT_FRONTEND))
		{
			$this->model->addFilter('locale', Locale::getLocale());
		}

		$this->model->addFilter('article.state', 1);
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
	 * getModel
	 *
	 * @param string $name
	 * @param bool   $forceNew
	 *
	 * @return  mixed
	 */
	public function getModel($name = 'Articles', $forceNew = false)
	{
		return parent::getModel($name, $forceNew);
	}

	/**
	 * getView
	 *
	 * @param string $name
	 * @param string $type
	 * @param bool   $forceNew
	 *
	 * @return  BladeHtmlView
	 */
	public function getView($name = 'Category', $type = 'html', $forceNew = false)
	{
		return parent::getView($name, $type, $forceNew);
	}

	/**
	 * getUserStateFromInput
	 *
	 * @param string $name
	 * @param string $inputName
	 * @param mixed  $default
	 * @param string $filter
	 * @param string $namespace
	 *
	 * @return  mixed
	 */
	public function getUserStateFromInput($name, $inputName, $default = null, $filter = InputFilter::STRING, $namespace = 'default')
	{
		return $this->input->get($inputName, $default, $filter);
	}
}
