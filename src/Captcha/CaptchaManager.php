<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Captcha;

use Windwalker\Core\Manager\AbstractManager;
use Windwalker\DI\Attributes\Isolation;
use Windwalker\DI\Container;
use Windwalker\DI\Definition\ObjectBuilderDefinition;

use function Windwalker\DI\create;

/**
 * The CaptchaManager class.
 *
 * @method CaptchaDriverInterface create(?string $name = null, ...$args)
 * @method CaptchaDriverInterface get(?string $name = null, ...$args)
 *
 * @deprecated  Use container tags instead.
 */
#[Isolation]
class CaptchaManager extends CaptchaFactory
{
    //
}
