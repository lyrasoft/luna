<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

/**
 * The CommentsModel class.
 *
 * @since  1.0
 */
class CommentsRepository extends \Lyrasoft\Luna\Admin\Repository\CommentsRepository
{
    /**
     * published
     *
     * @param bool|int $state
     *
     * @return  static
     */
    public function published($state = true)
    {
        return $this->addFilter('comment.state', (int) $state);
    }

    /**
     * target
     *
     * @param string $type
     * @param int    $id
     *
     * @return  static
     */
    public function target($type, $id)
    {
        return $this->addFilter('comment.type', $type)
            ->addFilter('comment.target_id', $id);
    }
}
