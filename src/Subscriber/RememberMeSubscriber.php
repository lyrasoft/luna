<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Services\RememberMeService;
use Lyrasoft\Luna\User\Event\AfterLoginEvent;
use Windwalker\Core\Runtime\Config;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\Session\Session;

/**
 * The RememberMeSubscriber class.
 */
#[EventSubscriber]
class RememberMeSubscriber
{
    public function __construct(
        protected RememberMeService $rememberMeService,
        protected Session $session,
        protected Config $config,
    ) {
    }

    #[ListenTo(AfterLoginEvent::class)]
    public function afterLogin(AfterLoginEvent $event): void
    {
        $options = $event->options;

        if ($options['remember'] ?? false) {
            $this->rememberMeService->startNewRemember($event->user->id);
        }
    }
}
