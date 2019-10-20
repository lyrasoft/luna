<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Menus;

use Phoenix\Controller\Batch\BatchDelegatingController;

/**
 * The UpdateController class.
 *
 * @since  1.0
 */
class BatchController extends BatchDelegatingController
{
    /**
     * The default Repository.
     *
     * Keep model name here to make sure controller get singular model to handle update.
     *
     * @var  string
     */
    protected $repository = 'Menu';
}
