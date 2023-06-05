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
 * The AfterLoginEvent class.
 */
class AfterLoginEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;
}
