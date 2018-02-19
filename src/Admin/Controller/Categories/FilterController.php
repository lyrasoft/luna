<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Categories;

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
    protected $name = 'categories';

    /**
     * Property itemName.
     *
     * @var  string
     */
    protected $itemName = 'category';

    /**
     * Property listName.
     *
     * @var  string
     */
    protected $listName = 'categories';

    /**
     * getContext
     *
     * @param   string $task
     *
     * @return  string
     */
    public function getContext($task = null)
    {
        $type = $this->input->get('type');

        return parent::getContext($task) . '.' . $type;
    }
}
