<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    MIT
 */

namespace Lyrasoft\Luna\User;

/**
 * Interface UserEntityInterface
 *
 * @since  2.0.0-beta1
 */
interface UserEntityInterface
{
    /**
     * isMember
     *
     * @return  bool
     */
    public function isLogin(): bool;
}
