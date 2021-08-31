<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Windwalker\Authentication\ResultSet;

/**
 * The AfterLoginEvent class.
 */
class AfterLoginEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;
}
