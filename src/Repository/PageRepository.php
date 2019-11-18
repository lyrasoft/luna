<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Phoenix\Repository\ItemRepository;
use Windwalker\Data\DataInterface;
use Windwalker\Database\Driver\AbstractDatabaseDriver;
use Windwalker\Structure\Structure;

/**
 * The PageRepository class.
 *
 * @since  1.0
 */
class PageRepository extends ItemRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Page';

    /**
     * Instantiate the model.
     *
     * @param   Structure|array        $config The model config.
     * @param   AbstractDatabaseDriver $db     The database driver.
     *
     * @since   1.0
     */
    public function __construct($config = null, AbstractDatabaseDriver $db = null)
    {
        parent::__construct($config, $db);
    }

    /**
     * postGetItem
     *
     * @param DataInterface $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
    }
}
