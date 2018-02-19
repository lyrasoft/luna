<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Tags;

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
    protected $name = 'tags';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'tag';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'tags';
}
