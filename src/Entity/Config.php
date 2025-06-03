<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Lyrasoft\Luna\Attributes\Modifier;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\Core\DateTime\ServerTimeCast;
use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\JsonObject;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Config class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('configs', 'config')]
#[\AllowDynamicProperties]
class Config implements EntityInterface
{
    use EntityTrait;

    #[Column('type'), PK]
    public string $type = '';

    #[Column('subtype'), PK]
    public string $subtype = '';

    #[Column('content')]
    #[JsonObject]
    public array $content = [];

    #[Column('modified')]
    #[CastNullable(ServerTimeCast::class)]
    #[CurrentTime]
    public ?Chronos $modified = null {
        set(\DateTimeInterface|string|null $value) {
            $this->modified = Chronos::tryWrap($value);
        }
    }

    #[Column('modified_by')]
    #[Modifier]
    public int $modifiedBy = 0;

    #[EntitySetup]
    public static function setup(
        EntityMetadata $metadata
    ): void {
        //
    }
}
