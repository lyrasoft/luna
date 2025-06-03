<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Lyrasoft\Luna\Attributes\Author;
use Lyrasoft\Luna\Attributes\Modifier;
use Lyrasoft\Luna\Attributes\Slugify;
use Lyrasoft\Luna\Data\MetaData;
use Unicorn\Enum\BasicState;
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
use Windwalker\ORM\Event\BeforeSaveEvent;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Page class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('pages', 'page')]
#[\AllowDynamicProperties]
class Page implements EntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    public ?int $id = null;

    #[Column('category_id')]
    public int $categoryId = 0;

    #[Column('extends')]
    public string $extends = '';

    #[Column('title')]
    public string $title = '';

    #[Column('alias')]
    #[Slugify]
    public string $alias = '';

    #[Column('image')]
    public string $image = '';

    #[Column('content')]
    #[JsonObject]
    public array $content = [];

    #[Column('css')]
    public string $css = '';

    #[Column('meta')]
    #[Cast(MetaData::class)]
    public MetaData $meta {
        get {
            return $this->meta ??= new MetaData();
        }
        set(MetaData|array $value) {
            $this->meta = MetaData::wrap($value);
        }
    }

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    public BasicState $state {
        set(BasicState|int $value) {
            $this->state = BasicState::wrap($value);
        }
    }

    #[Column('ordering')]
    public int $ordering = 0;

    #[Column('created')]
    #[CastNullable(ServerTimeCast::class)]
    #[CreatedTime]
    public ?Chronos $created = null {
        set(\DateTimeInterface|string|null $value) {
            $this->created = Chronos::tryWrap($value);
        }
    }

    #[Column('created_by')]
    #[Author]
    public int $createdBy = 0;

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

    #[Column('language')]
    public string $language = '';

    #[Column('params')]
    #[JsonObject]
    public array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    #[BeforeSaveEvent]
    public static function beforeSave(BeforeSaveEvent $event): void
    {
        $event->data['language'] = $event->data['language'] ?? null ?: '*';
    }
}
