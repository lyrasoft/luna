<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Config;

use Lyrasoft\Luna\Admin\Table\Table;
use Phoenix\Field\ItemListField;

/**
 * The ConfigField class.
 *
 * @since  1.0
 */
class ConfigListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = Table::CONFIGS;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;
}
