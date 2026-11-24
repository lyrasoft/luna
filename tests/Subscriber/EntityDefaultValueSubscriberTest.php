<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Tests\Subscriber;

use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Subscriber\EntityDefaultValueSubscriber;
use Lyrasoft\Luna\User\UserService;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\ORM\Event\BeforeSaveEvent;

class EntityDefaultValueSubscriberTest extends TestCase
{
    private function createSubscriber(?int $currentUserId = 7, array $options = []): EntityDefaultValueSubscriber
    {
        $user = $this->createStub(User::class);
        $user->id = $currentUserId;

        $userService = $this->createStub(UserService::class);
        $userService->method('getUser')->willReturn($user);

        $app = $this->createStub(ApplicationInterface::class);
        $app->method('service')->willReturn($userService);

        $subscriber = new EntityDefaultValueSubscriber($options);

        $property = new \ReflectionProperty($subscriber, 'app');
        $property->setValue($subscriber, $app);

        return $subscriber;
    }

    #[Test]
    public function beforeSaveGeneratesAliasFromTitleWhenAliasEmpty(): void
    {
        $event = new BeforeSaveEvent(
            type: BeforeSaveEvent::TYPE_CREATE,
            data: ['title' => 'Hello World', 'alias' => '', 'created_by' => 1],
        );

        $this->createSubscriber()->beforeSave($event);

        self::assertSame('hello-world', $event->data['alias']);
    }

    #[Test]
    public function beforeSaveKeepsExistingAlias(): void
    {
        $event = new BeforeSaveEvent(
            type: BeforeSaveEvent::TYPE_UPDATE,
            data: ['title' => 'Hello World', 'alias' => 'custom', 'modified_by' => 1],
        );

        $this->createSubscriber()->beforeSave($event);

        self::assertSame('custom', $event->data['alias']);
    }

    #[Test]
    public function beforeSaveFillsCreatedByOnCreate(): void
    {
        $event = new BeforeSaveEvent(
            type: BeforeSaveEvent::TYPE_CREATE,
            data: ['title' => 'x', 'alias' => 'x', 'created_by' => 0],
        );

        $this->createSubscriber(7)->beforeSave($event);

        self::assertSame(7, $event->data['created_by']);
    }

    #[Test]
    public function beforeSaveFillsModifiedByOnUpdate(): void
    {
        $event = new BeforeSaveEvent(
            type: BeforeSaveEvent::TYPE_UPDATE,
            data: ['title' => 'x', 'alias' => 'x', 'modified_by' => null],
        );

        $this->createSubscriber(9)->beforeSave($event);

        self::assertSame(9, $event->data['modified_by']);
    }

    #[Test]
    public function beforeSaveDoesNotOverwriteCreatedByOnUpdate(): void
    {
        $event = new BeforeSaveEvent(
            type: BeforeSaveEvent::TYPE_UPDATE,
            data: ['title' => 'x', 'alias' => 'x', 'created_by' => 0],
        );

        $this->createSubscriber(7)->beforeSave($event);

        self::assertSame(0, $event->data['created_by']);
    }
}
