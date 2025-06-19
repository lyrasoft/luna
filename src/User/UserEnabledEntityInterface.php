<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

interface UserEnabledEntityInterface
{
    /**
     * Check if user is enabled.
     *
     * @return bool
     */
    public function isEnabled(): bool;
}
