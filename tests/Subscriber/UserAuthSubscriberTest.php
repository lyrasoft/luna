<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Subscriber\UserAuthSubscriber;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\Event\LoginAuthEvent;
use Lyrasoft\Luna\User\Exception\AuthenticateFailException;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Authentication\ResultSet;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\State\AppState;
use Windwalker\DI\Container;

class UserAuthSubscriberTest extends TestCase
{
    private function createSubscriber(AppState $state, ?\Closure $handler = null): UserAuthSubscriber
    {
        $subscriber = new UserAuthSubscriber(new Container(), $state, $handler);

        // TranslatorTrait injects $lang; provide a stub so trans() returns the id.
        $lang = $this->createStub(LangService::class);
        $lang->method('trans')->willReturnArgument(0);

        $property = new \ReflectionProperty($subscriber, 'lang');
        $property->setValue($subscriber, $lang);

        return $subscriber;
    }

    private function createEvent(User $user): LoginAuthEvent
    {
        return new LoginAuthEvent($user, false, new ResultSet());
    }

    private function createUser(bool $verified, bool $enabled): User
    {
        $user = $this->createStub(User::class);
        $user->method('isVerified')->willReturn($verified);
        $user->method('isEnabled')->willReturn($enabled);
        $user->email = 'foo@example.com';

        return $user;
    }

    #[Test]
    public function loginAuthPassesWhenUserIsVerifiedAndEnabled(): void
    {
        $state = $this->createMock(AppState::class);
        $state->expects($this->never())->method('remember');

        $subscriber = $this->createSubscriber($state);

        $subscriber->loginAuth($this->createEvent($this->createUser(true, true)));
    }

    #[Test]
    public function loginAuthRejectsUnverifiedUserAndRemembersEmail(): void
    {
        $state = $this->createMock(AppState::class);
        $state->expects($this->once())
            ->method('remember')
            ->with(ActivationService::RE_ACTIVATE_SESSION_KEY, 'foo@example.com');

        $subscriber = $this->createSubscriber($state);

        $this->expectException(AuthenticateFailException::class);
        $this->expectExceptionCode(40101);

        $subscriber->loginAuth($this->createEvent($this->createUser(false, true)));
    }

    #[Test]
    public function loginAuthRejectsDisabledUser(): void
    {
        $state = $this->createMock(AppState::class);
        $state->expects($this->never())->method('remember');

        $subscriber = $this->createSubscriber($state);

        $this->expectException(AuthenticateFailException::class);
        $this->expectExceptionCode(40102);

        $subscriber->loginAuth($this->createEvent($this->createUser(true, false)));
    }

    #[Test]
    public function loginAuthCallsHandlerWithEvent(): void
    {
        $state = $this->createStub(AppState::class);
        $called = null;

        $handler = function (LoginAuthEvent $event) use (&$called) {
            $called = $event;
        };

        $subscriber = $this->createSubscriber($state, $handler);
        $event = $this->createEvent($this->createUser(true, true));

        $subscriber->loginAuth($event);

        self::assertSame($event, $called);
    }
}
