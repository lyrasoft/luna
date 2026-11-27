<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Services\RememberMeService;
use Lyrasoft\Luna\Subscriber\RememberMeSubscriber;
use Lyrasoft\Luna\User\Event\AfterLoginSessionEvent;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\AppContext;
use Windwalker\Session\Session;

class RememberMeSubscriberTest extends TestCase
{
    private function createUser(int $id = 5): User
    {
        $user = new User();
        $user->id = $id;

        return $user;
    }

    private function createSubscriber(
        RememberMeService $service,
        ?\Closure $conditions = null,
    ): RememberMeSubscriber {
        $app = $this->createStub(AppContext::class);
        $app->method('call')->willReturnCallback(
            static fn(callable $callback, array $args) => $callback(...$args)
        );

        return new RememberMeSubscriber(
            app: $app,
            session: $this->createStub(Session::class),
            rememberMeService: $service,
            conditions: $conditions,
        );
    }

    #[Test]
    public function startsRememberWhenOptionEnabled(): void
    {
        $service = $this->createMock(RememberMeService::class);
        $service->expects(self::once())
            ->method('startNewRemember')
            ->with(5);

        $event = new AfterLoginSessionEvent($this->createUser(), true, ['remember' => true]);

        $this->createSubscriber($service)->afterLoginSession($event);
    }

    #[Test]
    public function doesNotStartRememberWhenOptionMissing(): void
    {
        $service = $this->createMock(RememberMeService::class);
        $service->expects(self::never())->method('startNewRemember');

        $event = new AfterLoginSessionEvent($this->createUser(), true);

        $this->createSubscriber($service)->afterLoginSession($event);
    }

    #[Test]
    public function conditionsOverrideRememberOption(): void
    {
        $service = $this->createMock(RememberMeService::class);
        $service->expects(self::never())->method('startNewRemember');

        $conditions = static fn(AfterLoginSessionEvent $event, array $options): bool => false;

        $event = new AfterLoginSessionEvent($this->createUser(), true, ['remember' => true]);

        $this->createSubscriber($service, $conditions)->afterLoginSession($event);
    }

    #[Test]
    public function conditionsCanEnableRememberWithoutOption(): void
    {
        $service = $this->createMock(RememberMeService::class);
        $service->expects(self::once())
            ->method('startNewRemember')
            ->with(5);

        $conditions = static fn(AfterLoginSessionEvent $event, array $options): bool => $event->result === true;

        $event = new AfterLoginSessionEvent($this->createUser(), true);

        $this->createSubscriber($service, $conditions)->afterLoginSession($event);
    }
}
