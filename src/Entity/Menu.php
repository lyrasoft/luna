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
use Windwalker\ORM\Attributes\NestedSet;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\Event\BeforeStoreEvent;
use Windwalker\ORM\Metadata\EntityMetadata;
use Windwalker\ORM\Nested\NestedEntityInterface;
use Windwalker\ORM\Nested\NestedEntityTrait;

/**
 * The Menu class.
 */
#[NestedSet('menus', 'menu')]
#[\AllowDynamicProperties]
class Menu implements NestedEntityInterface
{
    use NestedEntityTrait;

    #[Column('id'), PK, AutoIncrement]
    protected ?int $id = null;

    #[Column('type')]
    protected string $type = '';

    #[Column('view')]
    protected string $view = '';

    #[Column('title')]
    protected string $title = '';

    #[Column('url')]
    protected string $url = '';

    #[Column('target')]
    #[Cast(MenuTarget::class)]
    protected MenuTarget $target;

    #[Column('variables')]
    #[Cast(JsonCast::class)]
    protected array $variables = [];

    #[Column('image')]
    protected string $image = '';

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    protected BasicState $state;

    #[Column('hidden')]
    #[Cast('bool', 'int')]
    protected bool $hidden = false;

    #[Column('created')]
    #[CastNullable(ServerTimeCast::class)]
    #[CreatedTime]
    protected ?Chronos $created = null;

    #[Column('modified')]
    #[CastNullable(ServerTimeCast::class)]
    #[CurrentTime]
    protected ?Chronos $modified = null;

    #[Column('created_by')]
    #[Author]
    protected int $createdBy = 0;

    #[Column('modified_by')]
    #[Modifier]
    protected int $modifiedBy = 0;

    #[Column('language')]
    protected string $language = '';

    #[Column('params')]
    #[Cast(JsonCast::class)]
    protected array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    #[BeforeStoreEvent]
    public static function beforeStore(BeforeStoreEvent $event): void
    {
        $data = &$event->getData();

        $data['language'] = $data['language'] ?? null ?: '*';
    }

    /**
     * @inheritDoc
     */
    public function getPrimaryKeyValue(): mixed
    {
        return $this->getId();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getView(): string
    {
        return $this->view;
    }

    public function setView(string $view): static
    {
        $this->view = $view;

        return $this;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getVariables(): array
    {
        return $this->variables;
    }

    public function setVariables(array $variables): static
    {
        $this->variables = $variables;

        return $this;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getState(): BasicState
    {
        return $this->state;
    }

    public function setState(int|BasicState $state): static
    {
        $this->state = BasicState::wrap($state);

        return $this;
    }

    public function isHidden(): bool
    {
        return $this->hidden;
    }

    public function setHidden(bool $hidden): static
    {
        $this->hidden = $hidden;

        return $this;
    }

    public function getCreated(): ?Chronos
    {
        return $this->created;
    }

    public function setCreated(DateTimeInterface|string|null $created): static
    {
        $this->created = Chronos::wrapOrNull($created);

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

    public function getCreatedBy(): int
    {
        return $this->createdBy;
    }

    public function setCreatedBy(int $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getModifiedBy(): int
    {
        return $this->modifiedBy;
    }

    public function setModifiedBy(int $modifiedBy): static
    {
        $this->modifiedBy = $modifiedBy;

        return $this;
    }

    public function getLanguage(): string
    {
        return $this->language;
    }

    public function setLanguage(string $language): static
    {
        $this->language = $language;

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

    /**
     * @return MenuTarget
     */
    public function getTarget(): MenuTarget
    {
        return $this->target;
    }

    /**
     * @param  MenuTarget|string  $target
     *
     * @return  static  Return self to support chaining.
     */
    public function setTarget(MenuTarget|string $target): static
    {
        $this->target = MenuTarget::wrap($target);

        return $this;
    }
}
