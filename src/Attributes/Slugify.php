<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Attribute;
use Unicorn\Utilities\SlugHelper;
use Windwalker\ORM\Attributes\CastForSaveInterface;
use Windwalker\ORM\ORM;

/**
 * The Slugify class.
 */
#[Attribute]
class Slugify implements CastForSaveInterface
{
    public function __construct(
        protected bool $utf8 = false,
        protected string $titleColumn = 'title',
        protected int $limit = 8
    ) {
        //
    }

    public function getCaster(): callable
    {
        return function (mixed $value, ORM $orm, object $entity) {
            $default = $value;

            if (!$value && $this->titleColumn) {
                $default = $orm->extractField($entity, $this->titleColumn);
            }

            return SlugHelper::safe((string) $value, $this->utf8, $default, $this->limit);
        };
    }
}
