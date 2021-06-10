<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Controller;

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Admin\Record\TagRecord;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Repository\CategorizedRepositoryInterface;
use Lyrasoft\Luna\Repository\CategoryRepository;
use Lyrasoft\Luna\Repository\LocaleRepositoryInterface;
use Lyrasoft\Luna\Repository\StateRepositoryInterface;
use Lyrasoft\Luna\Repository\TagMapRepositoryInterface;
use Lyrasoft\Luna\Repository\TagRepository;
use Lyrasoft\Luna\View\Category\CategoryHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Phoenix\Controller\Traits\FilterWithoutStateTrait;
use Phoenix\Repository\ListRepository;
use Phoenix\View\AbstractPhoenixHtmView;
use Windwalker\Legacy\Core\Repository\Repository;
use Windwalker\Legacy\Core\View\AbstractView;
use Windwalker\Legacy\Data\Data;
use Windwalker\Legacy\Router\Exception\RouteNotFoundException;
use Windwalker\Legacy\Utilities\Arr;

/**
 * The AbstractCategoryListController class.
 *
 * @since  1.7.12
 */
abstract class AbstractCategoryController extends ListDisplayController
{
    use FilterWithoutStateTrait;

    /**
     * Property type.
     *
     * @var  string
     */
    protected $type;

    /**
     * Property joinPrefix.
     *
     * @var  string
     */
    protected $joinPrefix;

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
     * @throws \Exception
     */
    protected function prepareExecute()
    {
        $params = $this->router->getMatched()->getExtra('category');

        $this->type             = Arr::get($params, 'type', 'article');
        $this->repository       = Arr::get($params, 'repository', Arr::get($params, 'model', 'Articles'));
        $this->view             = Arr::get($params, 'view', 'Category');
        $this->limit            = Arr::get($params, 'limit', $this->limit);
        $this->deep             = Arr::get($params, 'deep', true);
        $this->defaultOrdering  = Arr::get($params, 'ordering', 'article.created');
        $this->defaultDirection = Arr::get($params, 'direction', 'DESC');

        parent::prepareExecute();
    }

    /**
     * Prepare view and default repository.
     *
     * You can configure default repository state here, or add more sub repositories to view.
     * Remember to call parent to make sure default repository already set in view.
     *
     * @param AbstractView $view       The view to render page.
     * @param Repository   $repository The default repository.
     *
     * @return  void
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Exception
     */
    protected function prepareViewRepository(AbstractView $view, Repository $repository)
    {
        /**
         * @var ListRepository   $repository
         * @var CategoryHtmlView $view
         */
        parent::prepareViewRepository($view, $repository);

        $path = (array) $this->input->getVar('path');

        $tagAlias = $this->input->get('tag');

        if ($path) {
            $page = null;

            if (!$repository instanceof CategorizedRepositoryInterface) {
                throw new \LogicException(sprintf(
                    '%s must implement %s',
                    get_class($repository),
                    CategorizedRepositoryInterface::class
                ));
            }

            if (is_numeric($path[count($path) - 1])) {
                $page = array_pop($path);
            }

            if (!count($path)) {
                throw new \RuntimeException('Page not found.', 404);
            }

            if ($page) {
                $this->input->set('page', $page);
            }

            $path = implode('/', $path);

            /** @var CategoryRepository $catRepo */
            $catRepo = $this->getRepository('Category');

            /** @var Data $category */
            $category = $catRepo->getItem(['path' => $path, 'state' => 1, 'type' => $this->type]);

            if ($category->isNull()) {
                throw new RouteNotFoundException('Page not found', 404);
            }

            $view['category'] = $category;

            // Set article filters
            if ($this->deep) {
                $repository->categoryKeys($category->lft, $category->rgt);
            } else {
                $repository->category($category->id);
            }
        } else {
            $view['category'] = new CategoryRecord();
        }

        if ($tagAlias) {
            if (!$repository instanceof TagMapRepositoryInterface) {
                throw new \LogicException(sprintf(
                    '%s must implement %s',
                    get_class($repository),
                    TagMapRepositoryInterface::class
                ));
            }

            /** @var TagRepository $tagRepo */
            $tagRepo = $this->getRepository('Tag');

            /** @var Data $tag */
            $tag = $tagRepo->getItem(['alias' => $tagAlias, 'state' => 1]);

            if ($tag->isNull()) {
                throw new RouteNotFoundException('Page not found', 404);
            }

            $view['tag'] = $tag;

            // Set article filters
            $repository->tag($tag->id);
        } else {
            $view['tag'] = new TagRecord();
        }

        if (Locale::isEnabled(Locale::CLIENT_FRONTEND)) {
            if (!$repository instanceof LocaleRepositoryInterface) {
                throw new \LogicException(sprintf(
                    '%s must implement %s',
                    get_class($repository),
                    LocaleRepositoryInterface::class
                ));
            }

            $repository->locale(Locale::getLocale());
        }

        if ($repository instanceof StateRepositoryInterface) {
            $repository->published(1);
        } else {
            $repository->addFilter($this->joinPrefix . '.state', 1);
        }

        $repository->addFilter('category.state', 1);
    }

    /**
     * getContext
     *
     * @param string $task
     *
     * @return  string
     */
    public function getContext($task = null)
    {
        return parent::getContext($task);
    }
}
