<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Contacts;

use Lyrasoft\Luna\Admin\Repository\ContactsRepository;
use Lyrasoft\Luna\Admin\View\Contacts\ContactsHtmlView;
use Phoenix\Controller\Display\ListDisplayController;
use Windwalker\Core\Repository\Repository;
use Windwalker\Core\View\AbstractView;

/**
 * The GetController class.
 *
 * @since  1.0
 */
class GetController extends ListDisplayController
{
    /**
     * The default Model.
     *
     * If set model name here, controller will get model object by this name.
     *
     * @var  ContactsRepository
     */
    protected $model = 'Contacts';

    /**
     * Main View.
     *
     * If set view name here, controller will get model object by this name.
     *
     * @var  ContactsHtmlView
     */
    protected $view = 'Contacts';

    /**
     * Property ordering.
     *
     * Please remember add table alias.
     *
     * @var  string
     */
    protected $defaultOrdering = 'contact.id';

    /**
     * Property direction.
     *
     * @var  string
     */
    protected $defaultDirection = 'DESC';

    /**
     * The list limit per page..
     *
     * Use 0 to set unlimited.
     *
     * @var integer
     */
    protected $limit;

    /**
     * A hook before main process executing.
     *
     * @return  void
     * @throws \Exception
     */
    protected function prepareExecute()
    {
        $this->layout = $this->input->get('layout');
        $this->format = $this->input->get('format', 'html');

        parent::prepareExecute();
    }

    /**
     * Prepare view and default model.
     *
     * You can configure default model state here, or add more sub models to view.
     * Remember to call parent to make sure default model already set in view.
     *
     * @param AbstractView    $view  The view to render page.
     * @param Repository $model The default mode.
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareViewModel(AbstractView $view, Repository $model)
    {
        /**
         * @var $view  ContactsHtmlView
         * @var $model ContactsRepository
         */
        parent::prepareViewModel($view, $model);

        // Configure view and model here...
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
