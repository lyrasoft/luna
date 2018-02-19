<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Module;

use Lyrasoft\Luna\Admin\Model\ModuleModel;
use Lyrasoft\Luna\Admin\View\Module\ModuleHtmlView;
use Phoenix\Controller\Display\EditDisplayController;
use Windwalker\Core\Model\ModelRepository;
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
     * @var  ModuleModel
     */
    protected $model;

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
     * @param ModelRepository $model The default mode.
     *
     * @return  void
     */
    protected function prepareViewModel(AbstractView $view, ModelRepository $model)
    {
        parent::prepareViewModel($view, $model);

        $model['module.type'] = $this->input->get('type');
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
