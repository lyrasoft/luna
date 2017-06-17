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
use Lyrasoft\Luna\Model\CategoryModel;
use Lyrasoft\Luna\Model\TagModel;
use Lyrasoft\Luna\View\Category\CategoryHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Windwalker\Core\Model\ModelRepository;
use Windwalker\Core\View\AbstractView;
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
	 * Property model.
	 *
	 * @var  ArticlesModel
	 */
	protected $model = 'Articles';

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
	 * Prepare view and default model.
	 *
	 * You can configure default model state here, or add more sub models to view.
	 * Remember to call parent to make sure default model already set in view.
	 *
	 * @param AbstractView    $view  The view to render page.
	 * @param ModelRepository $model The default mode.
	 *
	 * @return  void
	 * @throws \RuntimeException
	 */
	protected function prepareViewModel(AbstractView $view, ModelRepository $model)
	{
		/**
		 * @var ArticlesModel    $model
		 * @var CategoryHtmlView $view
		 */
		parent::prepareViewModel($view, $model);

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

			/** @var CategoryModel $catModel */
			$catModel = $this->getModel('Category');

			$type = $this->app->get('route.extra.category.type');

			/** @var Data $category */
			$category = $catModel->getItem(['path' => $path, 'state' => 1, 'type' => $type]);

			if ($category->isNull())
			{
				throw new \RuntimeException('Page not found', 404);
			}

			$view['category'] = $category;

			$this->checkAccess($category);

			// Set article filters
			if ($this->deep)
			{
				$model->addFilter('category_keys', $category->lft . ',' . $category->rgt);
			}
			else
			{
				$model->addFilter('article.category_id', $category->id);
			}
		}
		else
		{
			$view['category'] = new Data;
		}

		if ($tagAlias)
		{
			/** @var TagModel $tagModel */
			$tagModel = $this->getModel('Tag');

			/** @var Data $tag */
			$tag = $tagModel->getItem(['alias' => $tagAlias, 'state' => 1]);

			if ($tag->isNull())
			{
				throw new \RuntimeException('Page not found', 404);
			}

			$view['tag'] = $tag;


			$this->checkAccess($tag);

			// Set article filters
			$this->model->addFilter('mapping.tag_id', $tag->id);
		}
		else
		{
			$view['tag'] = new Data;
		}

		if (Locale::isEnabled(Locale::CLIENT_FRONTEND))
		{
			$this->model->addFilter('locale', Locale::getLocale());
		}

		$this->model->addFilter('article.state', 1);
		$this->model->addFilter('category.state', 1);
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
