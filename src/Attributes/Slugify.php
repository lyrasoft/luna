<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Attributes;

use Unicorn\Utilities\SlugHelper;
use Windwalker\ORM\Attributes\CastForSave;
use Windwalker\ORM\ORM;

/**
 * The Slugify class.
 */
#[\Attribute]
class Slugify extends CastForSave
{
    public function __construct(
        protected $utf8 = false,
        protected $titleColumn = 'title',
        protected int $limit = 16
    ) {
        parent::__construct(null);
    }

    protected function getDefaultCaster(): callable
    {
        return function (mixed $value, ORM $orm, object $entity) {
            if (!$value) {
                $title = '';

                if ($this->titleColumn) {
                    $title = $orm->extractField($entity, $this->titleColumn);
                }

                $value = SlugHelper::safe((string) $value, $this->utf8, $title);
            }

            return $value;
        };
    }
}
