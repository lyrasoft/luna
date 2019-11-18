<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Comments;

use Phoenix\Controller\Grid\AbstractFilterController;

/**
 * The FilterController class.
 *
 * @since  1.0
 */
class FilterController extends AbstractFilterController
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'comments';

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
}
