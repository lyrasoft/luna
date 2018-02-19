<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Contact;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;

/**
 * The ContactField class.
 *
 * @since  1.0
 */
class ContactListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::CONTACTS;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;
}
