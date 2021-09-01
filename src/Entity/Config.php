<?php

/**
 * Part of starter project.
 *
 * @copyright      Copyright (C) 2021 __ORGANIZATION__.
 * @license        MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\Core\DateTime\Chronos;
use Windwalker\ORM\Attributes\Cast;
use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\Cast\JsonCast;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Config class.
 */
#[Table('configs', 'config')]
class Config implements EntityInterface
{
    use EntityTrait;

    #[Column('type'), PK]
    protected string $type = '';

    #[Column('subtype'), PK]
    protected string $subtype = '';

    #[Column('content')]
    #[Cast(JsonCast::class)]
    protected array $content = [];

    #[Column('modified')]
    #[CurrentTime('now', false)]
    #[CastNullable(Chronos::class)]
    protected ?Chronos $modified = null;

    #[Column('modified_by')]
    protected int $modifiedBy = 0;

    #[EntitySetup]
    public static function setup(
        EntityMetadata $metadata
    ): void {
        //
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

    public function getSubtype(): string
    {
        return $this->subtype;
    }

    public function setSubtype(string $subtype): static
    {
        $this->subtype = $subtype;

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

    /**
     * @return array
     */
    public function getContent(): array
    {
        return $this->content;
    }

    /**
     * @param  array  $content
     *
     * @return  static  Return self to support chaining.
     */
    public function setContent(array $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getModified(): ?Chronos
    {
        return $this->modified;
    }

    public function setModified(\DateTimeInterface|string|null $modified): static
    {
        $this->modified = Chronos::wrap($modified);

        return $this;
    }
}
