<?php

/**
 * Part of luna project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\User;

/**
 * Interface UserEntityInterface
 *
 * @since  __DEPLOY_VERSION__
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
