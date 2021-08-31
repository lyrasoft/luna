<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    LGPL-2.0-or-later
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\User\Event\AfterLoginEvent;
use Windwalker\Core\Runtime\Config;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\Session\Cookie\Cookies;
use Windwalker\Session\Session;

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
        $options = $event->getOptions();

        if ($options['remember'] ?? false) {

            /** @var Session $session */
            $cookies = $this->session->getCookies();

            if ($cookies) {
                $cookies->expires(
                    $this->config->getDeep('user.remember_expires') ?? '+100days'
                );

                $cookies->set(
                    $this->session->getName(),
                    $this->session->getId()
                );
            }
        }
    }
}
