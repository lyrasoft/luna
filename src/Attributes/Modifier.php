<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Attribute;
use Lyrasoft\Luna\User\UserService;
use Windwalker\ORM\Attributes\CastForSave;
use Windwalker\ORM\ORM;

/**
 * The Modifier class.
 */
#[Attribute]
class Modifier extends CastForSave
{
    protected function getDefaultCaster(): callable
    {
        return function (mixed $value, ORM $orm, object $entity, UserService $userService = null) {
            if (!$userService) {
                return $value;
            }

            $mapper = $orm->mapper($entity::class);

            if ($mapper->canCheckIsNew()) {
                if (!$mapper->isNew($entity)) {
                    $value = $userService->getUser()?->getId();
                }
            } else {
                $value = $userService->getUser()?->getId();
            }

            return $value;
        };
    }
}
