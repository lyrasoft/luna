<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Admin\View\Contact;

use Lyrasoft\Luna\Admin\Repository\ContactRepository;
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
        $data['item'] = $this->pipe(function (ContactRepository $repository) {
            $item = $repository->getItem();

            if ($item->created_by) {
                $item->user = User::get($item->created_by);
            }

            return $item->toArray(true);
        });
    }
}
