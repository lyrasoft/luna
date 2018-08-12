<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Page;

use Lyrasoft\Luna\Table\Table;
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
    protected $table = Table::PAGES;

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
    protected $package = 'luna';

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
