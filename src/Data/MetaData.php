<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Data;

use Windwalker\Data\ValueObject;

/**
 * The MetaData class.
 */
class MetaData extends ValueObject
{
    public string $title = '';

    public string $description = '';

    public string $keywords = '';

    public string $cover = '';

    public string $customCode = '';
}
