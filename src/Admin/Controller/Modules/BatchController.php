<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Modules;

use Phoenix\Controller\Batch\BatchDelegatingController;

/**
 * The UpdateController class.
 *
 * @since  1.0
 */
class BatchController extends BatchDelegatingController
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'modules';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'module';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'modules';
}
