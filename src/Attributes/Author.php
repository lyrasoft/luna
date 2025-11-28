<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Attribute;
use Lyrasoft\Luna\User\UserService;
use Windwalker\ORM\Attributes\CastForSaveInterface;
use Windwalker\ORM\ORM;

/**
 * The Author class.
 */
#[Attribute]
class Author implements CastForSaveInterface
{
    public function getCaster(): \Closure
    {
        return static function (mixed $value, ORM $orm, object $entity, ?UserService $userService = null) {
            if (!$value && $userService) {
                $mapper = $orm->mapper($entity::class);

                if ($mapper->canCheckIsNew()) {
                    if ($mapper->isNew($entity)) {
                        $value = $userService->getUser()?->id;
                    }
                } else {
                    $value = $userService->getUser()?->id;
                }
            }

            return $value;
        };
    }
}
