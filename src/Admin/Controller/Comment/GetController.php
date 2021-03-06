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
     * prepareExecute
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
        parent::prepareViewModel($view, $repository);

        $type = $this->input->get('type');

        $repository['comment.type'] = $type;

        $this->view['type'] = $type;
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
