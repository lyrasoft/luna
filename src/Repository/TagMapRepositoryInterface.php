<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Repository;

/**
 * Interface TagMapRepositoryInterface
 *
 * @since  1.2
 */
interface TagMapRepositoryInterface
{
    /**
     * filterTag
     *
     * @param int $tagId
     *
     * @return  static
     */
    public function tag($tagId);
}
