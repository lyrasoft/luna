<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

interface UserVerifiedEntityInterface
{
    /**
     * Check if user is verified.
     *
     * @return bool
     */
    public function isVerified(): bool;
}
