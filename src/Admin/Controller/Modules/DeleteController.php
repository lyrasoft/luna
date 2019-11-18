<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Modules;

use Phoenix\Controller\Batch\AbstractDeleteController;

/**
 * The DeleteController class.
 *
 * @since  1.0
 */
class DeleteController extends AbstractDeleteController
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
