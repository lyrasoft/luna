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
use Lyrasoft\Luna\Module\AbstractModule;
use Lyrasoft\Luna\Module\ModuleHelper;
use Lyrasoft\Luna\Module\ModuleSaveInterface;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\DataInterface;
use Windwalker\DataMapper\Entity\Entity;

/**
 * The SaveController class.
 *
 * @since  1.0
 */
class SaveController extends AbstractSaveController
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
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

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
     * Property params.
     *
     * @var  array
     */
    protected $params;

    /**
     * Property module.
     *
     * @var AbstractModule
     */
    protected $module;

    /**
     * Property redirectQueryFields.
     *
     * @var  array
     */
    protected $redirectQueryFields = [
        'type',
    ];

    /**
     * prepareExecute
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();

        $this->params         = $this->input->getRaw('params');
        $this->data['params'] = $this->params;
    }

    /**
     * preSave
     *
     * @param DataInterface $data
     *
     * @return void
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     */
    protected function preSave(DataInterface $data)
    {
        $this->module = ModuleHelper::getModuleInstance($data);
        
        parent::preSave($data);

        if ($this->module instanceof ModuleSaveInterface) {
            $this->module->preSave($data, $this->repository);
        }
    }

    /**
     * postSave
     *
     * @param DataInterface $data
     *
     * @return  void
     */
    protected function postSave(DataInterface $data)
    {
        parent::postSave($data);

        if ($this->module instanceof ModuleSaveInterface) {
            $this->module->postSave($data, $this->repository);
        }
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

    /**
     * getSuccessRedirect
     *
     * @param  DataInterface|Entity $data
     *
     * @return  string
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function getSuccessRedirect(DataInterface $data = null)
    {
        if ($this->task === 'save2new') {
            $this->input->set('type', $data->type);
        }

        if ($this->task === 'save2copy') {
            $data->state = 0;
        }

        return parent::getSuccessRedirect($data);
    }
}
