<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\JsonObject;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Association class.
 */
#[Table('associations', 'association')]
#[\AllowDynamicProperties]
class Association implements EntityInterface
{
    use EntityTrait;

    #[Column('type')]
    public string $type = '';

    #[Column('target_id')]
    public int $targetId = 0;

    #[Column('key')]
    public string $key = '';

    #[Column('hash')]
    public string $hash = '';

    #[Column('params')]
    #[JsonObject]
    public array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }
}
