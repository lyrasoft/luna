<?php

/**
 * Part of Windwalker project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

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
