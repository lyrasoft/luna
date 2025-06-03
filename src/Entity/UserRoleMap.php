<?php

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
#[\AllowDynamicProperties]
class UserRoleMap implements EntityInterface
{
    use EntityTrait;

    #[Column('user_id'), PK]
    public int $userId = 0;

    #[Column('role_id'), PK]
    public mixed $roleId = null;

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }

    public function isStatic(): bool
    {
        return is_string($this->roleId) && !is_numeric($this->roleId);
    }
}
