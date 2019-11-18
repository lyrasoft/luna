<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Repository;

/**
 * The StateRepositoryInterface class.
 *
 * @since  1.2
 */
interface StateRepositoryInterface
{
    /**
     * published
     *
     * @param bool $published
     *
     * @return static
     */
    public function published($published = true);
}
