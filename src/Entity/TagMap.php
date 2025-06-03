<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

use function Windwalker\unwrap_enum;

/**
 * The TagMap class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('tag_maps', 'tag_map')]
#[\AllowDynamicProperties]
class TagMap implements EntityInterface
{
    use EntityTrait;

    #[Column('tag_id')]
    public int $tagId = 0;

    #[Column('target_id')]
    public mixed $targetId = null;

    #[Column('type')]
    public string $type = '' {
        set(string|\BackedEnum $value) {
            $this->type = unwrap_enum($value);
        }
    }

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }
}
