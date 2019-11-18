<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Config;

use Lyrasoft\Luna\Admin\Repository\ConfigRepository;
use Lyrasoft\Luna\Admin\View\Config\ConfigHtmlView;
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
     * The default Repository.
     *
     * If set model name here, controller will get model object by this name.
     *
     * @var  ConfigRepository
     */
    protected $repository = 'Config';

    /**
     * Main View.
     *
     * If set view name here, controller will get model object by this name.
     *
     * @var  ConfigHtmlView
     */
    protected $view = 'Config';

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
     * @throws \Exception
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();
    }

    /**
     * Prepare view and default repository.
     *
     * You can configure default model state here, or add more sub models to view.
     * Remember to call parent to make sure default model already set in view.
     *
     * @param AbstractView $view       The view to render page.
     * @param Repository   $repository The default repository.
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareViewRepository(AbstractView $view, Repository $repository)
    {
        /**
         * @var $view       ConfigHtmlView
         * @var $repository ConfigRepository
         */
        parent::prepareViewRepository($view, $repository);

        $type = (string) $this->input->get('type');
        $subtype = $this->input->get('subtype');

        if ($type === '') {
            throw new \RuntimeException('Variable `type` missing.');
        }

        $repository['config.type'] = $type;
        $repository['config.subtype'] = $subtype;

        $conditions = ['type' => $type];

        if ($subtype) {
            $conditions['subtype'] = $subtype;
        }

        $repository['load.conditions'] = $conditions;

        $this->view['type'] = $type;
        $this->view['subtype'] = $subtype;
    }

    /**
     * Check user has access to view this page.
     *
     * Throw exception with 4xx code to block unauthorised access.
     *
     * @return  bool Return FALSE if use has no access to view page.
     *
     * @throws \RuntimeException
     * @throws \Windwalker\Router\Exception\RouteNotFoundException (404)
     * @throws \Windwalker\Core\Security\Exception\UnauthorizedException (401 / 403)
     */
    public function authorise()
    {
        return parent::authorise();
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
