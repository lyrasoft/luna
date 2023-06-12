<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Attribute;
use Unicorn\Utilities\SlugHelper;
use Windwalker\ORM\ORM;
use Windwalker\Utilities\Arr;

/**
 * The PageSlugify class.
 */
#[Attribute]
class PageSlugify extends Slugify
{
    protected function getDefaultCaster(): callable
    {
        return function (mixed $value, ORM $orm, object $entity) {
            $default = $value;

            if (!$value && $this->titleColumn) {
                $default = $orm->extractField($entity, $this->titleColumn);
            }

            if (trim($value) === '') {
                return SlugHelper::safe((string) $default, $this->utf8);
            }

            $segments = Arr::explodeAndClear('/', $value);

            $segments = array_map(
                fn($segment) => SlugHelper::slugify((string) $segment, $this->utf8),
                $segments
            );

            return implode('/', $segments);
        };
    }
}
