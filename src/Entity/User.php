<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\User\LunaUserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\DateTime\ServerTimeCast;
use Windwalker\ORM\Attributes\AutoIncrement;
use Windwalker\ORM\Attributes\Cast;
use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\CreatedTime;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\JsonObject;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Event\AfterDeleteEvent;
use Windwalker\ORM\Event\BeforeSaveEvent;
use Windwalker\ORM\Event\EnergizeEvent;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The User class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('users', 'user')]
#[\AllowDynamicProperties]
class User implements EntityInterface, LunaUserEntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    public ?int $id = null;

    #[Column('username')]
    public string $username = '';

    #[Column('email')]
    public string $email = '';

    #[Column('name')]
    public string $name = '';

    #[Column('avatar')]
    public string $avatar = '';

    #[Column('password')]
    public string $password = '';

    #[Column('enabled')]
    #[Cast('bool', 'int')]
    public bool $enabled = false;

    #[Column('verified')]
    #[Cast('bool', 'int')]
    public bool $verified = false;

    #[Column('activation')]
    public string $activation = '';

    #[Column('receive_mail')]
    #[Cast('bool', 'int')]
    public bool $receiveMail = false;

    #[Column('reset_token')]
    public string $resetToken = '';

    #[Column('last_reset')]
    #[CastNullable(ServerTimeCast::class)]
    public ?Chronos $lastReset = null {
        set(\DateTimeInterface|string|null $value) => $this->lastReset = Chronos::tryWrap($value);
    }

    #[Column('last_login')]
    #[CastNullable(ServerTimeCast::class)]
    public ?Chronos $lastLogin = null {
        set(\DateTimeInterface|string|null $value) => $this->lastLogin = Chronos::tryWrap($value);
    }

    #[Column('registered')]
    #[CastNullable(ServerTimeCast::class)]
    #[CreatedTime]
    public ?Chronos $registered = null {
        set(\DateTimeInterface|string|null $value) => $this->registered = Chronos::tryWrap($value);
    }

    #[Column('modified')]
    #[CastNullable(ServerTimeCast::class)]
    #[CurrentTime]
    public ?Chronos $modified = null {
        set(\DateTimeInterface|string|null $value) => $this->modified = Chronos::tryWrap($value);
    }

    #[Column('params')]
    #[JsonObject]
    public array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    #[EnergizeEvent]
    public static function energize(EnergizeEvent $event): void
    {
        $event->storeCallback(
            'user.service',
            fn(UserService $userService) => $userService
        );

        $event->storeCallback(
            'access.service',
            fn(AccessService $accessService) => $accessService
        );
    }

    #[BeforeSaveEvent]
    public static function beforeSave(BeforeSaveEvent $event): void
    {
        $data = &$event->data;

        if (isset($data['password']) && $data['password'] === '') {
            unset($data['password']);
        }
    }

    #[AfterDeleteEvent]
    public static function afterDelete(AfterDeleteEvent $event): void
    {
        /** @var static $item */
        $item = $event->entity;
        $orm = $event->orm;

        $orm->deleteWhere(UserSocial::class, ['user_id' => $item->id]);
        $orm->deleteWhere(UserRoleMap::class, ['user_id' => $item->id]);
    }

    public function can(string $action, ...$args): bool
    {
        /** @var AccessService $accessService */
        $accessService = $this->retrieveMeta('access.service')();

        return $accessService->can($action, $this, ...$args);
    }

    public function isRoles(mixed ...$roles): bool
    {
        /** @var AccessService $accessService */
        $accessService = $this->retrieveMeta('access.service')();

        return $accessService->userInRoles($this, $roles);
    }

    public function isLogin(): bool
    {
        return $this->id !== null;
    }

    public function getId(): mixed
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    public function isVerified(): bool
    {
        return $this->verified;
    }
}
