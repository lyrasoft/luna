<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\User\Event;

use Lyrasoft\Luna\User\UserEntityInterface;
use Windwalker\Authentication\AuthResult;
use Windwalker\Authentication\ResultSet;

/**
 * Trait AfterLoginEventTrait
 */
trait AfterLoginEventTrait
{
    public ?UserEntityInterface $user = null;

    public AuthResult|false $result;

    public ResultSet $resultSet;
}
