<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Menu;

use Lyrasoft\Luna\Admin\Repository\MenuRepository;
use Lyrasoft\Luna\Menu\MenuService;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\DataInterface;
use Windwalker\DI\Annotation\Inject;

/**
 * The SaveController class.
 *
 * @since  1.0
 */
class SaveController extends AbstractSaveController
{
    /**
     * Keep this property so save & close can find routing.
     *
     * @var  string
     */
    protected $listName = 'Menus';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * The default Repository.
     *
     * If set model name here, controller will get model object by this name.
     *
     * @var  MenuRepository
     */
    protected $repository = 'Menu';

    /**
     * Property menuService.
     *
     * @Inject()
     *
     * @var MenuService
     */
    protected $menuService;

    /**
     * Class init.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * A hook before main process executing.
     *
     * @return  void
     * @throws \ReflectionException
     * @throws \Exception
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();

        switch ($this->task) {
            case 'switch_type':
                $this->setUserState($this->getContext('edit.data'), $this->data);
                
                $this->redirect(
                    $this->router->to('menu')
                        ->id($this->data['id'])
                        ->var('type', $this->data['type'])
                );
                break;

            case 'switch_view':
                $this->setUserState($this->getContext('edit.data'), $this->data);

                $this->redirect(
                    $this->router->to('menu')
                        ->id($this->data['id'])
                );
                break;
        }
    }

    /**
     * Check user has access to modify this resource or not.
     *
     * Throw exception with 4xx code or return false to block unauthorised access.
     *
     * @param   array|DataInterface $data
     *
     * @return  boolean
     *
     * @throws \RuntimeException
     * @throws \Windwalker\Core\Security\Exception\UnauthorizedException (401 / 403)
     */
    public function checkAccess($data)
    {
        return parent::checkAccess($data);
    }

    /**
     * A hook before save.
     *
     * @param DataInterface $data Data to save.
     *
     * @return void
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     */
    protected function preSave(DataInterface $data)
    {
        parent::preSave($data);

        $view = $data->view;

        if ($view) {
            $viewInstance = $this->menuService->getViewInstance($view);

            if ($viewInstance) {
                $viewInstance->prepareVariablesStore($data->variables);
            }
        }

        $data->variables = json_encode($data->variables);
        $data->params = json_encode($data->params);
    }

    /**
     * A hook after save.
     *
     * @param DataInterface $data Data saved.
     *
     * @return  void
     */
    protected function postSave(DataInterface $data)
    {
        parent::postSave($data);
    }

    /**
     * A hook after main process executing.
     *
     * @param mixed $result The result content to return, can be any value or boolean.
     *
     * @return  mixed
     */
    protected function postExecute($result = null)
    {
        return parent::postExecute($result);
    }
}
