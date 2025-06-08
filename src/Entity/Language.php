<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Lyrasoft\Luna\Attributes\Slugify;
use Lyrasoft\Luna\Data\MetaData;
use Unicorn\Enum\BasicState;
use Windwalker\ORM\Attributes\AutoIncrement;
use Windwalker\ORM\Attributes\Cast;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Language class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('languages', 'language')]
#[\AllowDynamicProperties]
class Language implements EntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    public ?int $id = null;

    #[Column('title')]
    public string $title = '';

    #[Column('alias')]
    #[Slugify]
    public string $alias = '';

    #[Column('title_native')]
    public string $titleNative = '';

    #[Column('code')]
    public string $code = '';

    #[Column('image')]
    public string $image = '';

    #[Column('description')]
    public string $description = '';

    #[Column('meta')]
    #[Cast(MetaData::class)]
    public MetaData $meta {
        get => $this->meta ??= new MetaData();
        set(MetaData|array $value) => $this->meta = MetaData::wrap($value);
    }

    #[Column('sitename')]
    public string $sitename = '';

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    public BasicState $state {
        set(int|BasicState $value) => $this->state = BasicState::wrap($value);
    }

    #[Column('ordering')]
    public int $ordering = 0;

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }
}
