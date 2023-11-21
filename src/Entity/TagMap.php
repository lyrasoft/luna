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
#[Table('tag_maps', 'tag_map')]
#[\AllowDynamicProperties]
class TagMap implements EntityInterface
{
    use EntityTrait;

    #[Column('tag_id')]
    protected int $tagId = 0;

    #[Column('target_id')]
    protected int $targetId = 0;

    #[Column('type')]
    protected string $type = '';

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    public function getTagId(): int
    {
        return $this->tagId;
    }

    public function setTagId(int $tagId): static
    {
        $this->tagId = $tagId;

        return $this;
    }

    public function getTargetId(): int
    {
        return $this->targetId;
    }

    public function setTargetId(int $targetId): static
    {
        $this->targetId = $targetId;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string|\BackedEnum $type): static
    {
        $this->type = (string) unwrap_enum($type);

        return $this;
    }
}
