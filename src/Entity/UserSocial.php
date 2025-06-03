<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Entity;

use Windwalker\ORM\Attributes\Column;
use Windwalker\ORM\Attributes\EntitySetup;
use Windwalker\ORM\Attributes\JsonObject;
use Windwalker\ORM\Attributes\Table;
use Windwalker\ORM\EntityInterface;
use Windwalker\ORM\EntityTrait;
use Windwalker\ORM\Metadata\EntityMetadata;

/**
 * The UserSocial class.
 */
#[Table('user_socials', 'user_social')]
#[\AllowDynamicProperties]
class UserSocial implements EntityInterface
{
    use EntityTrait;

    #[Column('user_id')]
    public int $userId = 0;

    #[Column('identifier')]
    public string $identifier = '';

    #[Column('provider')]
    public string $provider = '';

    #[Column('params')]
    #[JsonObject]
    public array $params = [];

    #[EntitySetup]
    public static function setup(EntityMetadata $metadata): void
    {
        //
    }
}
