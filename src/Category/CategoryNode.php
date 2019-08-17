<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Category;

use Lyrasoft\Luna\Admin\Record\CategoryRecord;
use Lyrasoft\Luna\Admin\Record\Columns\CategoryDataInterface;
use Lyrasoft\Luna\Tree\Node;

/**
 * The CategoryNode class.
 *
 * @method CategoryRecord getValue()
 *
 * @since  __DEPLOY_VERSION__
 */
class CategoryNode extends Node implements CategoryDataInterface
{
    /**
     * Property value.
     *
     * @var CategoryRecord
     */
    protected $value;
}
