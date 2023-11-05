<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

/**
 * This class is to check user can login or not.
 *
 * If a user passed authentication, then we can check this user is verified or disabled.
 * Just set result as FALSE, then user login will be blocked.
 */
class LoginAuthEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;
}
