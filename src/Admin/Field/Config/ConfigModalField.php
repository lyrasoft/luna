<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Config;

use Lyrasoft\Luna\Admin\Table\Table;
use Phoenix\Field\ModalField;

/**
 * The ConfigModalField class.
 *
 * @since  1.0
 */
class ConfigModalField extends ModalField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = Table::CONFIGS;

    /**
     * Property view.
     *
     * @var  string
     */
    protected $view = 'configs';

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
