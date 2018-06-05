<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Luna\Ajax;

use Lyrasoft\Luna\Admin\Repository\TagRepository;
use Lyrasoft\Unidev\Controller\AbstractAjaxController;
use Windwalker\Data\Data;

/**
 * The TagSaveController class.
 *
 * @since  1.0
 */
class TagSaveController extends AbstractAjaxController
{
    /**
     * doAjax
     *
     * @return  mixed
     */
    protected function doAjax()
    {
        $title = $this->input->getString('title');

        $data = new Data;

        $data->title = $title;
        $data->state = 1;

        /** @var TagRepository $model */
        $model = $this->getModel('Tag');

        $model->save($data);

        return $this->responseSuccess('Save success', $data->dump());
    }
}
