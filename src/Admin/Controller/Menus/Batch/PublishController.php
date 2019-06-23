<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Controller\Menus\Batch;

use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Phoenix\Controller\Batch\AbstractPublishController;
use Windwalker\Data\DataInterface;

/**
 * The PublishController class.
 *
 * @since  1.0
 */
class PublishController extends AbstractPublishController
{
    /**
     * save
     *
     * @param int|string    $pk
     * @param DataInterface $data
     *
     * @return  void
     * @throws \Exception
     */
    protected function save($pk, DataInterface $data)
    {
        parent::save($pk, clone $data);

        // Find Children
        $parent = MenuMapper::findOne($pk);

        MenuMapper::updateBatch($data, [
            'lft > ' . $parent->lft,
            'rgt < ' . $parent->rgt,
        ]);
    }
}
