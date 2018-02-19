<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Comment;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;

/**
 * The CommentField class.
 *
 * @since  1.0
 */
class CommentListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::COMMENTS;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;
}
