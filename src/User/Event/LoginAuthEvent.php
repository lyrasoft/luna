<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Lyrasoft\Luna\User\UserEntityInterface;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;

/**
 * This class is to check user can login or not.
 *
 * If a user passed authentication, then we can check this user is verified or disabled.
 * Just set result as FALSE, then user login will be blocked.
 */
class LoginAuthEvent extends AbstractLoginEvent
{
    use AfterLoginEventTrait;

    public function __construct(
        UserEntityInterface $user,
        AuthResult|false $result,
        ResultSet $resultSet,
        array $credential = [],
        array $options = []
    ) {
        $this->user = $user;
        $this->result = $result;
        $this->resultSet = $resultSet;
        $this->credential = $credential;
        $this->options = $options;
    }
}
