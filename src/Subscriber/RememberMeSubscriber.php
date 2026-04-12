<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Services\RememberMeService;
use Lyrasoft\Luna\User\Event\AfterLoginEvent;
use Lyrasoft\Luna\User\Event\AfterLoginSessionEvent;
use Windwalker\Core\Application\AppContext;
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
        protected AppContext $app,
        protected Session $session,
        protected RememberMeService $rememberMeService,
        protected ?\Closure $conditions = null,
    ) {
    }

    #[ListenTo(AfterLoginSessionEvent::class)]
    public function afterLoginSession(AfterLoginSessionEvent $event): void
    {
        $options = $event->options;

        $enabled = $options['remember'] ?? false;

        if ($this->conditions) {
            $enabled = $this->app->call($this->conditions, compact('event', 'options'));
        }

        if ($enabled) {
            $this->rememberMeService->startNewRemember($event->user->id);
        }
    }
}
