<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Captcha;

use Windwalker\Core\DI\ServiceFactoryInterface;
use Windwalker\Core\DI\ServiceFactoryTrait;
use Windwalker\DI\Attributes\Factory;
use Windwalker\DI\Attributes\Isolation;
use Windwalker\DI\Container;

/**
 * The CaptchaManager class.
 *
 * @method CaptchaDriverInterface create(?string $name = null, ...$args)
 * @method CaptchaDriverInterface get(?string $name = null, ...$args)
 */
#[Isolation]
class CaptchaFactory implements ServiceFactoryInterface
{
    use ServiceFactoryTrait;

    public function getClassName(): ?string
    {
        return CaptchaDriverInterface::class;
    }
    public function getConfigPrefix(): string
    {
        return 'captcha';
    }
    public static function recaptcha(string $key, string $secret, string $type = 'checkbox'): \Closure
    {
        return #[Factory]
        function (Container $container) use ($type, $secret, $key) {
            $args['key'] = $key;
            $args['secret'] = $secret;
            $args['type'] = $type;

            return $container->newInstance(RecaptchaDriver::class, $args);
        };
    }

    public static function gregwar(array $options = []): \Closure
    {
        return #[Factory]
        function (Container $container) use ($options) {
            return $container->newInstance(GregwarDriver::class, compact('options'));
        };
    }
}
