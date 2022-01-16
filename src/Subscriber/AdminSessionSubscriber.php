<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Events\Web\AfterRoutingEvent;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Core\Language\TranslatorTrait;
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
    use TranslatorTrait;

    public const ADMIN_SEPARATE = 1 << 0;
    public const ADMIN_PROTECT = 1 << 1;

    /**
     * AdminSessionSubscriber constructor.
     */
    public function __construct(
        protected Container $container,
        protected int $options = self::ADMIN_PROTECT | self::ADMIN_SEPARATE,
    ) {
    }

    #[ListenTo(AfterRoutingEvent::class)]
    public function afterRouting(AfterRoutingEvent $event): void
    {
        if (!($this->options & static::ADMIN_SEPARATE)) {
            return;
        }

        $matched = $event->getMatched();

        $ns = $matched->getExtraValue('namespace');

        if (str_starts_with($ns, 'admin')) {
            $session = $this->container->get(Session::class);
            $session->setName('WINDWALKER_ADMIN_SESSID');
        }
    }

    #[ListenTo(LoginAuthEvent::class)]
    public function loginAuth(LoginAuthEvent $event): void
    {
        if (!($this->options & static::ADMIN_PROTECT)) {
            return;
        }

        $userService = $this->container->get(UserService::class);
        $request = $this->container->get(AppRequest::class);
        $matched = $request->getMatchedRoute();

        $ns = $matched?->getExtraValue('namespace');

        if (str_starts_with((string) $ns, 'admin')) {
            if (!$userService->can(AccessService::ADMIN_ACCESS_ACTION)) {
                throw new AuthenticateFailException(
                    $this->trans('luna.login.message.authorize.fail'),
                    40103
                );
            }
        }
    }
}
