<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Page;

use Lyrasoft\Luna\Table\LunaTable;
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
    protected $table = LunaTable::PAGES;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;
}
