<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Page;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ModalField;

/**
 * The PageModalField class.
 *
 * @since  1.0
 */
class PageModalField extends ModalField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::PAGES;

    /**
     * Property view.
     *
     * @var  string
     */
    protected $view = 'pages';

    /**
     * Property package.
     *
     * @var  string
     */
    protected $package = 'admin';

    /**
     * Property titleField.
     *
     * @var  string
     */
    protected $titleField = 'title';

    /**
     * Property keyField.
     *
     * @var  string
     */
    protected $keyField = 'id';
}
