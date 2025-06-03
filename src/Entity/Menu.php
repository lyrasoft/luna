<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use DateTimeInterface;
use Lyrasoft\Luna\Attributes\Author;
use Lyrasoft\Luna\Attributes\Modifier;
use Lyrasoft\Luna\Enum\MenuTarget;
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
use Windwalker\ORM\Attributes\NestedSet;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\Event\BeforeSaveEvent;
use Windwalker\ORM\Event\BeforeStoreEvent;
use Windwalker\ORM\Metadata\EntityMetadata;
use Windwalker\ORM\Nested\NestedEntityInterface;
use Windwalker\ORM\Nested\NestedEntityTrait;

/**
 * The Menu class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[NestedSet('menus', 'menu')]
#[\AllowDynamicProperties]
class Menu implements NestedEntityInterface
{
    use NestedEntityTrait;

    #[Column('id'), PK, AutoIncrement]
    public ?int $id = null;

    #[Column('type')]
    public string $type = '';

    #[Column('view')]
    public string $view = '';

    #[Column('title')]
    public string $title = '';

    #[Column('url')]
    public string $url = '';

    #[Column('target')]
    #[Cast(MenuTarget::class)]
    public MenuTarget $target {
        set(string|MenuTarget $value) {
            $this->target = MenuTarget::wrap($value);
        }
    }

    #[Column('variables')]
    #[Cast(JsonCast::class)]
    public array $variables = [];

    #[Column('image')]
    public string $image = '';

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    public BasicState $state {
        set(int|BasicState $value) {
            $this->state = BasicState::wrap($value);
        }
    }

    #[Column('hidden')]
    #[Cast('bool', 'int')]
    public bool $hidden = false;

    #[Column('created')]
    #[CastNullable(ServerTimeCast::class)]
    #[CreatedTime]
    public ?Chronos $created = null {
        set(\DateTimeInterface|string|null $value) {
            $this->created = Chronos::tryWrap($value);
        }
    }

    #[Column('modified')]
    #[CastNullable(ServerTimeCast::class)]
    #[CurrentTime]
    public ?Chronos $modified = null {
        set(\DateTimeInterface|string|null $value) {
            $this->modified = Chronos::tryWrap($value);
        }
    }

    #[Column('created_by')]
    #[Author]
    public int $createdBy = 0;

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

    public function getPrimaryKeyValue(): mixed
    {
        return $this->id;
    }
}
