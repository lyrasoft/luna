<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

/**
 * The LoginFailEvent class.
 */
class LoginFailEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;
}
