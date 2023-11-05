<?php

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
