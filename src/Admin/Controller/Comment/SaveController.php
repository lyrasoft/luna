<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Comment;

use Lyrasoft\Luna\Admin\Repository\CommentRepository;
use Lyrasoft\Luna\Admin\View\Comment\CommentHtmlView;
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
    protected $name = 'comment';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'comment';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'comments';

    /**
     * Property formControl.
     *
     * @var  string
     */
    protected $formControl = 'item';

    /**
     * Property model.
     *
     * @var  CommentRepository
     */
    protected $repository;

    /**
     * Property view.
     *
     * @var  CommentHtmlView
     */
    protected $view;

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

        $type = $this->input->get('type');

        $this->repository['comment.type'] = $type;
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

    /**
     * getFailRedirect
     *
     * @param  DataInterface $data
     *
     * @return  string
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function getFailRedirect(DataInterface $data = null)
    {
        $pk = $this->record->{$this->keyName};

        return $this->router->route($this->getName(), [$this->keyName => $pk]);
    }
}
