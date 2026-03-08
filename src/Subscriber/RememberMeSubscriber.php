<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\User\Event\AfterLoginEvent;
use Windwalker\Core\Runtime\Config;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\Session\Cookie\CookiesConfigurableInterface;
use Windwalker\Session\Session;

use function Windwalker\ds;

/**
 * The RememberMeSubscriber class.
 */
#[EventSubscriber]
class RememberMeSubscriber
{
    public function __construct(protected Session $session, protected Config $config)
    {
    }

    #[ListenTo(AfterLoginEvent::class)]
    public function afterLogin(AfterLoginEvent $event): void
    {
        $options = $event->options;

        if ($options['remember'] ?? false) {
            /** @var Session $session */
            $cookies = $this->session->getCookies();

            if ($cookies instanceof CookiesConfigurableInterface) {
                $expires = $this->config->getDeep('user.remember_expires') ?? '+100days';
                $cookieName = $this->config->getDeep('user.remember_cookie_name') ?? 'WINDWALKER_REMEMBER';

                $cookies->expires($expires);

                $cookies->set(
                    $cookieName,
                    $this->session->getId(),
                );
            }
        }
    }
}
