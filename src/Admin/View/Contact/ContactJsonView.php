<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Admin\View\Contact;

use Lyrasoft\Luna\Admin\Model\ContactModel;
use Windwalker\Core\User\User;
use Windwalker\Core\View\StructureView;
use Windwalker\Structure\Structure;

/**
 * The ContactJsonView class.
 *
 * @since  1.2
 */
class ContactJsonView extends StructureView
{
    /**
     * prepareData
     *
     * @param Structure $data
     *
     * @return  void
     */
    protected function prepareData($data)
    {
        $data['item'] = $this->pipe(function (ContactModel $model) {
            $item = $model->getItem();

            if ($item->created_by) {
                $item->user = User::get($item->created_by);
            }

            return $item->toArray(true);
        });
    }
}
