<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Lyrasoft\Luna\User\UserService;
use Unicorn\Utilities\SlugHelper;
use Windwalker\ORM\Attributes\CastForSave;
use Windwalker\ORM\ORM;

/**
 * The Author class.
 */
#[\Attribute]
class Author extends CastForSave
{
    protected function getDefaultCaster(): callable
    {
        return function (mixed $value, ORM $orm, object $entity, UserService $userService) {
            if (!$value) {
                $mapper = $orm->mapper($entity::class);

                if ($mapper->canCheckIsNew()) {
                    if ($mapper->isNew($entity)) {
                        $value = $userService->getUser()?->getId();
                    }
                } else {
                    $value = $userService->getUser()?->getId();
                }
            }

            return $value;
        };
    }
}
