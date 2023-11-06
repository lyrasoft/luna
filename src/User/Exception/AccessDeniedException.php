<?php

namespace Lyrasoft\Luna\User\Exception;

use RuntimeException;
use Windwalker\Utilities\Exception\MultiMessagesExceptionTrait;

/**
 * The AccessDenyException class.
 *
 * @since  3.0
 */
class AccessDeniedException extends RuntimeException
{
    use MultiMessagesExceptionTrait;
}
