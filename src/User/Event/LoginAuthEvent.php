<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

/**
 * The LoginAuthEvent class.
 */
class LoginAuthEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;
}
