<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Menu;

use Lyrasoft\Luna\Admin\Repository\MenuRepository;
use Lyrasoft\Luna\Admin\View\Menu\MenuHtmlView;
use Phoenix\Controller\Display\EditDisplayController;
use Windwalker\Legacy\Core\Repository\Repository;
use Windwalker\Legacy\Core\View\AbstractView;

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
     * @var  MenuRepository
     */
    protected $repository = 'Menu';

    /**
     * Main View.
     *
     * If set view name here, controller will get model object by this name.
     *
     * @var  MenuHtmlView
     */
    protected $view = 'Menu';

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
         * @var $view       MenuHtmlView
         * @var $repository MenuRepository
         */
        parent::prepareViewRepository($view, $repository);

        $repository['menu.type'] = $view['type'] = $this->input->get('type');
    }

    /**
     * Check user has access to view this page.
     *
     * Throw exception with 4xx code to block unauthorised access.
     *
     * @return  bool Return FALSE if use has no access to view page.
     *
     * @throws \RuntimeException
     * @throws \Windwalker\Legacy\Router\Exception\RouteNotFoundException (404)
     * @throws \Windwalker\Legacy\Core\Security\Exception\UnauthorizedException (401 / 403)
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
