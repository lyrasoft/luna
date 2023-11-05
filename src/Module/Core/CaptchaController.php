<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Module\Core;

use InvalidArgumentException;
use Lyrasoft\Luna\Captcha\CaptchaImageInterface;
use Lyrasoft\Luna\Captcha\CaptchaManager;
use Psr\Http\Message\ResponseInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\Controller;
use Windwalker\Stream\Stream;

use function Windwalker\response;

/**
 * The CaptchaController class.
 */
#[Controller]
class CaptchaController
{
    public function image(CaptchaManager $captchaManager, AppContext $app): ResponseInterface
    {
        $profile = $app->input('profile');
        $captcha = $captchaManager->get($profile);

        if (!$captcha instanceof CaptchaImageInterface) {
            throw new InvalidArgumentException(
                sprintf(
                    'Captcha driver: %s should implements %s',
                    get_class($captcha),
                    CaptchaImageInterface::class
                )
            );
        }

        $res = response()->withAddedHeader('Content-Type', $captcha->contentType());

        return $res->withBody(Stream::fromString($captcha->image()));
    }
}
