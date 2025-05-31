<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Lyrasoft\Luna\User\UserEntityInterface;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;

/**
 * The AfterLoginEvent class.
 */
class AfterLoginEvent extends AbstractLoginEvent
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
