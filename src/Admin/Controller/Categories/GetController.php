<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Categories;

use Lyrasoft\Luna\Admin\Repository\CategoriesRepository;
use Lyrasoft\Luna\Admin\View\Categories\CategoriesHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Windwalker\Core\Repository\Repository;
use Windwalker\Core\View\AbstractView;

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
     * @var  CategoriesRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  CategoriesHtmlView
     */
    protected $view;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = 'category.lft';

    /**
     * Property direction.
     *
     * @var  string
     */
    protected $defaultDirection = 'ASC';

    /**
     * prepareExecute
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareExecute()
    {
        $this->layout = $this->input->get('layout');

        parent::prepareExecute();
    }

    /**
     * Prepare view and default model.
     *
     * You can configure default model state here, or add more sub models to view.
     * Remember to call parent to make sure default model already set in view.
     *
     * @param AbstractView    $view  The view to render page.
     * @param Repository $repository The default mode.
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareViewModel(AbstractView $view, Repository $repository)
    {
        /** @var CategoriesRepository $repository */
        parent::prepareViewModel($view, $repository);

        $type = $this->input->get('type');

        $repository['category.type'] = $type;
        $repository->addFilter('category.type', $type);

        $this->view['type'] = $type;
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
        $type = $this->input->get('type');

        return parent::getContext($task) . '.' . $type;
    }
}
