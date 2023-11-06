<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User;

/**
 * The UserCaster class.
 */
class UserCaster
{
    public static function created(...$args)
    {
        show($args);
        exit(' @Checkpoint');
    }
}
