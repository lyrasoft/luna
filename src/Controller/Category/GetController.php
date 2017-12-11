<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Category;

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Admin\Record\TagRecord;
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
use Windwalker\Router\Exception\RouteNotFoundException;
use Windwalker\Utilities\Arr;

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
	 * Property type.
	 *
	 * @var  string
	 */
	protected $type = 'article';

	/**
	 * Property joinPrefix.
	 *
	 * @var  string
	 */
	protected $joinPrefix = 'article';

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
	 * A hook before main process executing.
	 *
	 * @return  void
	 */
	protected function prepareExecute()
	{
		$params = $this->router->getMatched()->getExtra('category');

		$this->type  = Arr::get($params, 'type', 'article');
		$this->model = Arr::get($params, 'model', 'Articles');
		$this->view  = Arr::get($params, 'view', 'Category');
		$this->deep  = Arr::get($params, 'deep', true);
		$this->defaultOrdering = Arr::get($params, 'ordering', 'article.created');
		$this->defaultDirection = Arr::get($params, 'direction', 'DESC');

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
	 *
	 * @throws \Windwalker\Router\Exception\RouteNotFoundException
	 * @throws \Windwalker\Core\Security\Exception\UnauthorizedException
	 * @throws \InvalidArgumentException
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

			/** @var Data $category */
			$category = $catModel->getItem(['path' => $path, 'state' => 1, 'type' => $this->type]);

			if ($category->isNull())
			{
				throw new RouteNotFoundException('Page not found', 404);
			}

			$view['category'] = $category;

			// Set article filters
			if ($this->deep)
			{
				$model->categoryKeys($category->lft, $category->rgt);
			}
			else
			{
				$model->category($category->id);
			}
		}
		else
		{
			$view['category'] = new CategoryRecord;
		}

		if ($tagAlias)
		{
			/** @var TagModel $tagModel */
			$tagModel = $this->getModel('Tag');

			/** @var Data $tag */
			$tag = $tagModel->getItem(['alias' => $tagAlias, 'state' => 1]);

			if ($tag->isNull())
			{
				throw new RouteNotFoundException('Page not found', 404);
			}

			$view['tag'] = $tag;

			// Set article filters
			$model->tag($tag->id);
		}
		else
		{
			$view['tag'] = new TagRecord;
		}

		if (Locale::isEnabled(Locale::CLIENT_FRONTEND))
		{
			$model->locale(Locale::getLocale());
		}

		$model->published(1);
		$model->addFilter('category.state', 1);
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

    /**
     * getContext
     *
     * @param   string $task
     *
     * @return  string
     */
    public function getContext($task = null)
    {
        return parent::getContext($task);
    }
}
