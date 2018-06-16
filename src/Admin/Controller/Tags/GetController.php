<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Tags;

use Lyrasoft\Luna\Admin\Repository\TagsRepository;
use Lyrasoft\Luna\Admin\View\Tags\TagsHtmlView;
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
     * @var  TagsRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  TagsHtmlView
     */
    protected $view;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = 'tag.id';

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
