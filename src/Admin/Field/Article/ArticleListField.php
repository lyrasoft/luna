<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Article;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;

/**
 * The ArticleField class.
 *
 * @since  1.0
 */
class ArticleListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::ARTICLES;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;
}
