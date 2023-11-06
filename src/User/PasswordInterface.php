<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

use Windwalker\Crypt\Hasher\PasswordHasherInterface;

/**
 * Interface PasswordInterface
 *
 * @deprecated  Use PasswordHasherInterface
 */
interface PasswordInterface extends PasswordHasherInterface
{
    //
}
