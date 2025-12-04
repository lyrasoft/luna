<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\ORM\Attributes\CastNullable;
use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The Access class.
 */
// phpcs:disable
// todo: remove this when phpcs supports 8.4
#[Table('rules', 'rule')]
#[\AllowDynamicProperties]
class Rule implements EntityInterface
{
    use EntityTrait;

    #[Column('role_id'), PK]
    public mixed $roleId = null;

    #[Column('name'), PK]
    public string $name = '';

    #[Column('type')]
    public string $type = '';

    #[Column('action')]
    public string $action = '';

    #[Column('target_id'), PK]
    public mixed $targetId = null;

    #[Column('title')]
    public string $title = '';

    #[Column('allow')]
    #[CastNullable('bool', 'int')]
    public ?bool $allow = null {
        set(bool|int|null $value) => $this->allow = (bool) $value;
    }

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    /**
     * @param  bool|int|null  $allow
     *
     * @return  $this
     *
     * @deprecated  Use property instead.
     */
    public function setAllow(bool|int|null $allow): static
    {
        if (is_int($allow)) {
            $allow = (bool) $allow;
        }

        $this->allow = $allow;

        return $this;
    }

    public function isInherited(): bool
    {
        return $this->allow === null;
    }

    public function isStatic(): bool
    {
        return is_string($this->roleId) && !is_numeric($this->roleId);
    }
}
