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
use Windwalker\ORM\Attributes\CastForSave;
use Windwalker\ORM\ORM;

/**
 * The Slugify class.
 */
#[Attribute]
class Slugify extends CastForSave
{
    public function __construct(
        protected bool $utf8 = false,
        protected string $titleColumn = 'title',
        protected int $limit = 8
    ) {
        parent::__construct(null);
    }

    protected function getDefaultCaster(): callable
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
