<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Controller\Contact;

use Lyrasoft\Luna\Repository\ContactRepository;
use Lyrasoft\Luna\View\Contact\ContactHtmlView;
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
     * The default Model.
     *
     * If set model name here, controller will get model object by this name.
     *
     * @var  ContactRepository
     */
    protected $repository = 'Contact';

    /**
     * Main View.
     *
     * If set view name here, controller will get model object by this name.
     *
     * @var  ContactHtmlView
     */
    protected $view = 'Contact';

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
        /**
         * @var $view  ContactHtmlView
         * @var $repository ContactRepository
         */
        parent::prepareViewModel($view, $repository);

        $repository['load.conditions'] = null;
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
