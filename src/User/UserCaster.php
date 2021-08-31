<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

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
