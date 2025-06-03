<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\ORM\Attributes\Cast;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Session class.
 */
#[Table('sessions', 'session')]
#[\AllowDynamicProperties]
class Session implements EntityInterface
{
    use EntityTrait;

    #[Column('id'), PK]
    public ?string $id = null;

    #[Column('data')]
    public string $data = '';

    #[Column('user_id')]
    public int $userId = 0;

    #[Column('remember')]
    #[Cast('bool', 'int')]
    public bool $remember = true;

    #[Column('time')]
    public int $time = 0;

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }
}
