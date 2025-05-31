<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\State\AppState;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;

/**
 * The UserSubscriber class.
 */
#[EventSubscriber]
class UserAuthSubscriber
{
    use TranslatorTrait;

    public function __construct(protected AppState $state)
    {
    }

    #[ListenTo(LoginAuthEvent::class)]
    public function loginAuth(LoginAuthEvent $event): void
    {
        /** @var User $user */
        $user = $event->user;

        if (method_exists($user, 'isVerified') && !$user->isVerified()) {
            $this->state->remember(ActivationService::RE_ACTIVATE_SESSION_KEY, $user->getEmail());

            throw new AuthenticateFailException(
                $this->trans('luna.login.message.not.activated'),
                40101
            );
        }

        if (method_exists($user, 'isEnabled') && !$user->isEnabled()) {
            throw new AuthenticateFailException(
                $this->trans('luna.login.message.not.enabled'),
                40102
            );
        }
    }
}
