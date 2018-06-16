<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Articles;

use Lyrasoft\Luna\Admin\Repository\ArticlesRepository;
use Lyrasoft\Luna\Admin\View\Articles\ArticlesHtmlView;
use Phoenix\Controller\Display\ListDisplayController;

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
     * @var  ArticlesRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  ArticlesHtmlView
     */
    protected $view;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = 'article.id';

    /**
     * Property direction.
     *
     * @var  string
     */
    protected $defaultDirection = 'DESC';

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
}
