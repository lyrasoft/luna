<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use DateTimeInterface;
use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\User\UserEntityInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\DateTime\ServerTimeCast;
use Windwalker\ORM\Attributes\AutoIncrement;
use Windwalker\ORM\Attributes\Cast;
use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\CreatedTime;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Event\AfterDeleteEvent;
use Windwalker\ORM\Event\BeforeDeleteEvent;
use Windwalker\ORM\Event\BeforeSaveEvent;
use Windwalker\ORM\Event\EnergizeEvent;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The User class.
 */
#[Table('users', 'user')]
#[\AllowDynamicProperties]
class User implements EntityInterface, UserEntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    protected ?int $id = null;

    #[Column('username')]
    protected string $username = '';

    #[Column('email')]
    protected string $email = '';

    #[Column('name')]
    protected string $name = '';

    #[Column('avatar')]
    protected string $avatar = '';

    #[Column('password')]
    protected string $password = '';

    #[Column('enabled')]
    #[Cast('bool')]
    protected bool $enabled = true;

    #[Column('verified')]
    #[Cast('bool')]
    protected bool $verified = true;

    #[Column('activation')]
    protected string $activation = '';

    #[Column('receive_mail')]
    #[Cast('bool')]
    protected bool $receiveMail = true;

    #[Column('reset_token')]
    protected string $resetToken = '';

    #[Column('last_reset')]
    #[CastNullable(ServerTimeCast::class)]
    protected ?Chronos $lastReset = null;

    #[Column('last_login')]
    #[CastNullable(ServerTimeCast::class)]
    protected ?Chronos $lastLogin = null;

    #[Column('registered')]
    #[CreatedTime]
    #[CastNullable(ServerTimeCast::class)]
    protected ?Chronos $registered = null;

    #[Column('modified')]
    #[CurrentTime]
    #[CastNullable(ServerTimeCast::class)]
    protected ?Chronos $modified = null;

    #[Column('params')]
    #[Cast(JsonCast::class)]
    protected array $params = [];

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

        $orm->deleteWhere(UserSocial::class, ['user_id' => $item->getId()]);
        $orm->deleteWhere(UserRoleMap::class, ['user_id' => $item->getId()]);
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

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param  int|null  $id
     *
     * @return  static  Return self to support chaining.
     */
    public function setId(?int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAvatar(): string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): static
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): static
    {
        $this->verified = $verified;

        return $this;
    }

    public function getActivation(): string
    {
        return $this->activation;
    }

    public function setActivation(string $activation): static
    {
        $this->activation = $activation;

        return $this;
    }

    public function isReceiveMail(): bool
    {
        return $this->receiveMail;
    }

    public function setReceiveMail(bool $receiveMail): static
    {
        $this->receiveMail = $receiveMail;

        return $this;
    }

    public function getResetToken(): string
    {
        return $this->resetToken;
    }

    public function setResetToken(string $resetToken): static
    {
        $this->resetToken = $resetToken;

        return $this;
    }

    public function getLastReset(): ?Chronos
    {
        return $this->lastReset;
    }

    public function setLastReset(DateTimeInterface|string|null $lastReset): static
    {
        $this->lastReset = Chronos::wrapOrNull($lastReset);

        return $this;
    }

    public function getLastLogin(): ?Chronos
    {
        return $this->lastLogin;
    }

    public function setLastLogin(DateTimeInterface|string|null $lastLogin): static
    {
        $this->lastLogin = Chronos::wrapOrNull($lastLogin);

        return $this;
    }

    public function getRegistered(): ?Chronos
    {
        return $this->registered;
    }

    public function setRegistered(DateTimeInterface|string|null $registered): static
    {
        $this->registered = Chronos::wrapOrNull($registered);

        return $this;
    }

    public function getModified(): ?Chronos
    {
        return $this->modified;
    }

    public function setModified(DateTimeInterface|string|null $modified): static
    {
        $this->modified = Chronos::wrapOrNull($modified);

        return $this;
    }

    public function getParams(): array
    {
        return $this->params;
    }

    public function setParams(array $params): static
    {
        $this->params = $params;

        return $this;
    }

    public function isLogin(): bool
    {
        return $this->getId() !== null;
    }
}
