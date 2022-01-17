<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Windwalker\Core\Events\Web\AfterRoutingEvent;
use Windwalker\DI\Container;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\Session\Session;

/**
 * The AdminSessionSubscriber class.
 */
#[EventSubscriber]
class AdminSessionSubscriber
{
    /**
     * AdminSessionSubscriber constructor.
     */
    public function __construct(protected Container $container)
    {
    }

    #[ListenTo(AfterRoutingEvent::class)]
    public function afterRouting(AfterRoutingEvent $event): void
    {
        $matched = $event->getMatched();

        $ns = $matched->getExtraValue('namespace');

        if (str_starts_with($ns, 'admin')) {
            $session = $this->container->get(Session::class);
            $session->setName('WINDWALKER_ADMIN_SESSID');
        }
    }
}
