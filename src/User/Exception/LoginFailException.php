<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 LYRASOFT.
 * @license    MIT
 */

namespace Lyrasoft\Luna\User\Exception;

use Throwable;

/**
 * The LoginFailException class.
 *
 * @since  3.5.2
 */
class LoginFailException extends AuthenticateFailException
{
    /**
     * Class init.
     *
     * @param  string          $mainMessage
     * @param  string|array    $messages
     * @param  int             $code
     * @param  Throwable|null  $previous
     */
    public function __construct(string $mainMessage, $messages = [], int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($messages, $code, $previous);

        $this->message = $mainMessage;
    }
}
