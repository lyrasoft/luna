<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Events\Web\AfterRoutingEvent;
use Windwalker\Core\Runtime\Config;
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
    public function __construct(
        protected Container $container,
        protected string $adminStageName = 'admin'
    ) {
    }

    #[ListenTo(AfterRoutingEvent::class)]
    public function afterRouting(AfterRoutingEvent $event): void
    {
        if (!$this->container->has(Session::class)) {
            return;
        }

        $matched = $event->matched;

        $ns = $matched->getExtraValue('namespace');

        if (str_starts_with($ns, $this->adminStageName)) {
            $session = $this->container->get(Session::class);
            $session->setName('WINDWALKER_ADMIN_SESSID');

            // todo: Must not set to parent, should fix: https://github.com/windwalker-io/core/issues/1431
            $this->container->getParent()->getParameters()->setDeep(
                'user.remember.cookie_name',
                'WINDWALKER_ADMIN_REMEMBER'
            );
        }
    }
}
