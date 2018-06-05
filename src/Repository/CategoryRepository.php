<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Phoenix\Repository\ItemRepository;
use Windwalker\Data\DataInterface;

/**
 * The CategoryModel class.
 *
 * @since  1.0
 */
class CategoryRepository extends ItemRepository
{
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
