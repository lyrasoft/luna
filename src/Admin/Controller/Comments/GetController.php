<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Comments;

use Lyrasoft\Luna\Admin\Repository\CommentsRepository;
use Lyrasoft\Luna\Admin\View\Comments\CommentsHtmlView;
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
     * @var  CommentsRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  CommentsHtmlView
     */
    protected $view;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = null;

    /**
     * Property direction.
     *
     * @var  string
     */
    protected $defaultDirection = null;

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
        /** @var CommentsRepository $repository */
        parent::prepareViewModel($view, $repository);

        $type = $this->input->get('type');

        $repository['comment.type'] = $type;
        $repository->addFilter('comment.type', $type);

        $this->view['type'] = $type;
    }

}
