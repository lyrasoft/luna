<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
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
