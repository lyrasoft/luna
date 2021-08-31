<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

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
    protected UserEntityInterface $user;

    protected AuthResult|false $result;

    protected ResultSet $resultSet;

    /**
     * @return ResultSet
     */
    public function getResultSet(): ResultSet
    {
        return $this->resultSet;
    }

    /**
     * @param  ResultSet  $resultSet
     *
     * @return  static  Return self to support chaining.
     */
    public function setResultSet(ResultSet $resultSet): static
    {
        $this->resultSet = $resultSet;

        return $this;
    }

    /**
     * @return UserEntityInterface
     */
    public function getUser(): UserEntityInterface
    {
        return $this->user;
    }

    /**
     * @param  UserEntityInterface  $user
     *
     * @return  static  Return self to support chaining.
     */
    public function setUser(UserEntityInterface $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return false|AuthResult
     */
    public function getResult(): bool|AuthResult
    {
        return $this->result;
    }

    /**
     * @param  false|AuthResult  $result
     *
     * @return  static  Return self to support chaining.
     */
    public function setResult(bool|AuthResult $result): static
    {
        $this->result = $result;

        return $this;
    }
}
