<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

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
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Language class.
 */
#[Table('languages', 'language')]
#[\AllowDynamicProperties]
class Language implements EntityInterface
{
    use EntityTrait;

    #[Column('id'), PK, AutoIncrement]
    protected ?int $id = null;

    #[Column('title')]
    protected string $title = '';

    #[Column('alias')]
    #[Slugify]
    protected string $alias = '';

    #[Column('title_native')]
    protected string $titleNative = '';

    #[Column('code')]
    protected string $code = '';

    #[Column('image')]
    protected string $image = '';

    #[Column('description')]
    protected string $description = '';

    #[Column('meta')]
    #[Cast(MetaData::class, JsonCast::class)]
    protected MetaData $meta;

    #[Column('sitename')]
    protected string $sitename = '';

    #[Column('state')]
    #[Cast('int')]
    #[Cast(BasicState::class)]
    protected BasicState $state;

    #[Column('ordering')]
    protected int $ordering = 0;

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

    public function getTitleNative(): string
    {
        return $this->titleNative;
    }

    public function setTitleNative(string $titleNative): static
    {
        $this->titleNative = $titleNative;

        return $this;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

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

    public function getMeta(): MetaData
    {
        return $this->meta;
    }

    public function setMeta(MetaData|array $meta): static
    {
        $this->meta = MetaData::wrap($meta);

        return $this;
    }

    public function getSitename(): string
    {
        return $this->sitename;
    }

    public function setSitename(string $sitename): static
    {
        $this->sitename = $sitename;

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

    public function getOrdering(): int
    {
        return $this->ordering;
    }

    public function setOrdering(int $ordering): static
    {
        $this->ordering = $ordering;

        return $this;
    }
}
