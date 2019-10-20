<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Lyrasoft\Luna\Admin\Controller\Contacts\Batch;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Controller\Batch\AbstractPublishController;

/**
 * The HandlingController class.
 *
 * @since  1.0
 */
class HandlingController extends AbstractPublishController
{
    /**
     * Property action.
     *
     * @var  string
     */
    protected $action = 'handling';

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
