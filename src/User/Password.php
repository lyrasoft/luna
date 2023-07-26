<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

use Windwalker\Crypt\Hasher\PasswordHasher;

/**
 * The Password class.
 *
 * @deprecated  Use PasswordHasher
 */
class Password extends PasswordHasher implements PasswordInterface
{
    //
}
