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
class CaptchaManager extends AbstractManager
{
    public function getConfigPrefix(): string
    {
        return 'captcha';
    }

    public static function recaptcha(string $key, string $secret, string $type = 'checkbox'): ObjectBuilderDefinition
    {
        return create(function (Container $container) use ($type, $secret, $key) {
            $args['key'] = $key;
            $args['secret'] = $secret;
            $args['type'] = $type;

            return $container->newInstance(RecaptchaDriver::class, $args);
        });
    }

    public static function gregwar(array $options = []): ObjectBuilderDefinition
    {
        return create(function (Container $container) use ($options) {
            return $container->newInstance(GregwarDriver::class, compact('options'));
        });
    }
}
