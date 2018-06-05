<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Languages;

use Lyrasoft\Luna\Admin\Repository\LanguagesRepository;
use Lyrasoft\Luna\Admin\View\Languages\LanguagesHtmlView;
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
     * @var  LanguagesRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  LanguagesHtmlView
     */
    protected $view;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = 'language.ordering';

    /**
     * Property direction.
     *
     * @var  string
     */
    protected $defaultDirection = 'ASC';

    /**
     * Property limit.
     *
     * @var  int
     */
    protected $limit = 100;

    /**
     * prepareExecute
     *
     * @return  void
     */
    protected function prepareExecute()
    {
        $this->layout = $this->input->get('layout');

        parent::prepareExecute();
    }
}
