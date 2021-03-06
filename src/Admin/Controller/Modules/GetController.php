<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Modules;

use Lyrasoft\Luna\Admin\Repository\ModulesRepository;
use Lyrasoft\Luna\Admin\View\Modules\ModulesHtmlView;
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
     * @var  ModulesRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  ModulesHtmlView
     */
    protected $view;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $defaultOrdering = 'module.position, module.ordering';

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
}
