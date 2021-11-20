<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

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
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Page class.
 */
#[Table('pages', 'page')]
class Page implements EntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    protected ?int $id = null;

    #[Column('extends')]
    protected string $extends = '';

    #[Column('title')]
    protected string $title = '';

    #[Column('alias')]
    #[Slugify]
    protected string $alias = '';

    #[Column('content')]
    #[Cast(JsonCast::class)]
    protected array $content = [];

    #[Column('css')]
    protected string $css = '';

    #[Column('meta')]
    #[Cast(JsonCast::class)]
    protected array $meta = [];

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    protected BasicState $state;

    #[Column('ordering')]
    protected int $ordering = 0;

    #[Column('created')]
    #[CastNullable(Chronos::class)]
    #[CreatedTime]
    protected ?Chronos $created = null;

    #[Column('created_by')]
    #[Author]
    protected int $createdBy = 0;

    #[Column('modified')]
    #[CastNullable(Chronos::class)]
    #[CurrentTime]
    protected ?Chronos $modified = null;

    #[Column('modified_by')]
    #[Modifier]
    protected int $modifiedBy = 0;

    #[Column('language')]
    protected string $language = '';

    #[Column('preview_secret')]
    protected string $previewSecret = '';

    #[Column('params')]
    #[Cast(JsonCast::class)]
    protected array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
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

    public function getExtends(): string
    {
        return $this->extends;
    }

    public function setExtends(string $extends): static
    {
        $this->extends = $extends;

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

    public function getAlias(): string
    {
        return $this->alias;
    }

    public function setAlias(string $alias): static
    {
        $this->alias = $alias;

        return $this;
    }

    public function getContent(): array
    {
        return $this->content;
    }

    public function setContent(array $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getCss(): string
    {
        return $this->css;
    }

    public function setCss(string $css): static
    {
        $this->css = $css;

        return $this;
    }

    public function getMeta(): array
    {
        return $this->meta;
    }

    public function setMeta(array $meta): static
    {
        $this->meta = $meta;

        return $this;
    }

    public function getState(): BasicState
    {
        return $this->state;
    }

    public function setState(int|BasicState $state): static
    {
        $this->state = new BasicState($state);

        return $this;
    }

    public function getOrdering(): int
    {
        return $this->ordering;
    }

    public function setOrdering(int $ordering): static
    {
        $this->ordering = $ordering;

        return $this;
    }

    public function getCreated(): ?Chronos
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface|string|null $created): static
    {
        $this->created = Chronos::wrapOrNull($created);

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

    public function setModified(\DateTimeInterface|string|null $modified): static
    {
        $this->modified = Chronos::wrapOrNull($modified);

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

    public function getPreviewSecret(): string
    {
        return $this->previewSecret;
    }

    public function setPreviewSecret(string $previewSecret): static
    {
        $this->previewSecret = $previewSecret;

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
}
