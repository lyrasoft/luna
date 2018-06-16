<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Controller\Contacts\Batch;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Controller\Batch\AbstractUnpublishController;

/**
 * The PendingController class.
 *
 * @since  1.0
 */
class PendingController extends AbstractUnpublishController
{
    /**
     * Property action.
     *
     * @var  string
     */
    protected $action = 'pending';

    /**
     * A hook before main process executing.
     *
     * @return  void
     * @throws \ReflectionException
     */
    protected function prepareExecute()
    {
        $this->langPrefix = LunaHelper::getLangPrefix();

        parent::prepareExecute();
    }
}
