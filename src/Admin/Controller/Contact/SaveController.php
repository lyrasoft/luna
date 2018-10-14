<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Contact;

use Lyrasoft\Luna\Admin\Repository\ContactRepository;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Data\DataInterface;

/**
 * The SaveController class.
 *
 * @since  1.0
 */
class SaveController extends AbstractSaveController
{
    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * The default Model.
     *
     * If set model name here, controller will get model object by this name.
     *
     * @var  ContactRepository
     */
    protected $repository = 'Contact';

    /**
     * A hook before main process executing.
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();
    }

    /**
     * A hook before save.
     *
     * @param DataInterface $data Data to save.
     *
     * @return void
     */
    protected function preSave(DataInterface $data)
    {
        parent::preSave($data);
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
