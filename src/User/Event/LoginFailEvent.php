<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

/**
 * The LoginFailEvent class.
 */
class LoginFailEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;
}
