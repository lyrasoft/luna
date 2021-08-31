<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

/**
 * Interface PasswordInterface
 */
interface PasswordInterface
{
    public function hash(string $password): string;

    public function verify(string $password, string $hash): bool;

    public function needsRehash(string $password): bool;
}
