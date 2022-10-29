<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use DateTimeInterface;
use Lyrasoft\Luna\Attributes\Author;
use Lyrasoft\Luna\Attributes\Modifier;
use Lyrasoft\Luna\Attributes\Slugify;
use Unicorn\Enum\BasicState;
use Windwalker\Core\DateTime\Chronos;
use Windwalker\ORM\Attributes\AutoIncrement;
use Windwalker\ORM\Attributes\Cast;
use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\CreatedTime;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\NestedSet;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Watch;
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\Event\WatchEvent;
use Windwalker\ORM\Metadata\EntityMetadata;
use Windwalker\ORM\Nested\NestedPathableInterface;
use Windwalker\ORM\Nested\NestedPathableTrait;

/**
 * The Category class.
 */
#[NestedSet('categories', 'category')]
#[\AllowDynamicProperties]
class Category implements NestedPathableInterface
{
    use NestedPathableTrait;

    #[Column('id'), PK, AutoIncrement]
    protected ?int $id = null;

    #[Column('type')]
    protected string $type = '';

    #[Column('title')]
    protected string $title = '';

    #[Column('alias')]
    #[Slugify]
    protected string $alias = '';

    #[Column('image')]
    protected string $image = '';

    #[Column('description')]
    protected string $description = '';

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    protected BasicState $state;

    #[Column('created')]
    #[CreatedTime]
    #[CastNullable(Chronos::class)]
    protected ?Chronos $created = null;

    #[Column('modified')]
    #[CurrentTime]
    #[CastNullable(Chronos::class)]
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

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param  int|null  $id
     *
     * @return  static  Return self to support chaining.
     */
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

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getState(): BasicState
    {
        return $this->state;
    }

    public function setState(BasicState|int $state): static
    {
        $this->state = new BasicState($state);

        return $this;
    }

    public function getCreated(): ?Chronos
    {
        return $this->created;
    }

    public function setCreated(DateTimeInterface|string|null $created): static
    {
        $this->created = Chronos::wrap($created);

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

    public function getModified(): ?Chronos
    {
        return $this->modified;
    }

    public function setModified(DateTimeInterface|string|null $modified): static
    {
        $this->modified = Chronos::wrap($modified);

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

    public function getParams(): array
    {
        return $this->params;
    }

    public function setParams(array $params): static
    {
        $this->params = $params;

        return $this;
    }

    public function getPrimaryKeyValue(): mixed
    {
        return $this->getId();
    }

    /**
     * @return string
     */
    public function getLanguage(): string
    {
        return $this->language;
    }

    /**
     * @param  string  $language
     *
     * @return  static  Return self to support chaining.
     */
    public function setLanguage(string $language): static
    {
        $this->language = $language;

        return $this;
    }
}
