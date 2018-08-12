<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Page;

use Lyrasoft\Luna\Table\Table;
use Phoenix\Field\ItemListField;

/**
 * The PageField class.
 *
 * @since  1.0
 */
class PageListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = Table::PAGES;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;
}
