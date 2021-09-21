<?php

/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\PK;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The UserRoleMap class.
 */
#[Table('user_role_maps', 'user_role_map')]
class UserRoleMap implements EntityInterface
{
    #[Column('user_id'), PK]
    protected int $userId = 0;

    #[Column('role_id'), PK]
    protected string|int $roleId = '';

    use EntityTrait;

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getRoleId(): string|int
    {
        return $this->roleId;
    }

    public function setRoleId(string|int $roleId): static
    {
        $this->roleId = $roleId;

        return $this;
    }

    public function isStatic(): bool
    {
        return !is_numeric($this->roleId);
    }
}
