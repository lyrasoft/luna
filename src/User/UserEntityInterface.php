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
 * @since  2.0.0
 */
interface UserEntityInterface
{
    public function getId(): mixed;

    /**
     * Is user logged-in as a member.
     *
     * @return  bool
     */
    public function isLogin(): bool;

    /**
     * Is user enabled, not blocked.
     *
     * @return  bool
     */
    public function isEnabled(): bool;

    /**
     * Is user verified their info.
     *
     * @return  bool
     */
    public function isVerified(): bool;
}
