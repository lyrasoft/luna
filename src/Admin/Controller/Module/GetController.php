<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Module;

use Lyrasoft\Luna\Admin\Repository\ModuleRepository;
use Lyrasoft\Luna\Admin\View\Module\ModuleHtmlView;
use Phoenix\Controller\Display\EditDisplayController;
use Windwalker\Core\Repository\Repository;
use Windwalker\Core\View\AbstractView;

/**
 * The GetController class.
 *
 * @since  1.0
 */
class GetController extends EditDisplayController
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'module';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'module';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'modules';

    /**
     * Property model.
     *
     * @var  ModuleRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  ModuleHtmlView
     */
    protected $view;

    /**
     * prepareExecute
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareExecute()
    {
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
        parent::prepareViewModel($view, $repository);

        $repository['module.type'] = $this->input->get('type');
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
}
