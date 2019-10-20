<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Repository;

/**
 * Interface ViewAccessRepositoryInterface
 *
 * @since  1.2
 */
interface ViewAccessRepositoryInterface
{
    /**
     * access
     *
     * @param mixed $access
     *
     * @return  static
     */
    public function access($access);
}
