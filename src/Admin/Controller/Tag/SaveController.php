<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Tag;

use Lyrasoft\Luna\Admin\Repository\TagRepository;
use Lyrasoft\Luna\Admin\View\Tag\TagHtmlView;
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
     * Property name.
     *
     * @var  string
     */
    protected $name = 'tag';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'tag';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'tags';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * Property model.
     *
     * @var  TagRepository
     */
    protected $model;

    /**
     * Property view.
     *
     * @var  TagHtmlView
     */
    protected $view;

    /**
     * prepareExecute
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareExecute()
    {
        parent::prepareExecute();
    }

    /**
     * preSave
     *
     * @param DataInterface $data
     *
     * @return void
     */
    protected function preSave(DataInterface $data)
    {
        parent::preSave($data);
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
