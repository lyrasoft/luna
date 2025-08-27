<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Attribute;
use Lyrasoft\Luna\User\UserService;
use Windwalker\ORM\Attributes\CastForSaveInterface;
use Windwalker\ORM\ORM;

/**
 * The Modifier class.
 */
#[Attribute]
class Modifier implements CastForSaveInterface
{
    public function getCaster(): \Closure
    {
        return static function (mixed $value, ORM $orm, object $entity, ?UserService $userService = null) {
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
