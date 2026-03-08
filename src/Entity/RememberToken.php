<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\DateTime\ServerTimeCast;
use Windwalker\ORM\Attributes\AutoIncrement;
use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\CreatedTime;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\JsonObject;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('remember_tokens', 'remember_token')]
#[\AllowDynamicProperties]
class RememberToken implements EntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    public ?int $id = null;

    #[Column('selector')]
    public string $selector = '';

    #[Column('validator')]
    public string $validator = '';

    #[Column('user_id')]
    public int $userId = 0;

    #[Column('created')]
    #[CastNullable(ServerTimeCast::class)]
    #[CreatedTime]
    public ?Chronos $created = null {
        set(\DateTimeInterface|string|null $value) => $this->created = Chronos::tryWrap($value);
    }

    #[Column('expired_at')]
    #[CastNullable(ServerTimeCast::class)]
    public ?Chronos $expiredAt = null {
        set(\DateTimeInterface|string|null $value) => $this->expiredAt = Chronos::tryWrap($value);
    }

    #[Column('last_used_at')]
    #[CastNullable(ServerTimeCast::class)]
    public ?Chronos $lastUsedAt = null {
        set(\DateTimeInterface|string|null $value) => $this->lastUsedAt = Chronos::tryWrap($value);
    }

    #[Column('params')]
    #[JsonObject]
    public array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }
}
