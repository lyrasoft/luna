<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Language\LanguageNormalizer;

/**
 * The LocaleService class.
 */
class LocaleService
{
    public const FLAG_NORMAL = 1;
    public const FLAG_SQUARE = 2;

    public const STAGE_FRONT = 1 << 0;
    public const STAGE_ADMIN = 1 << 1;
    public const STAGE_CURRENT = 1 << 2;
    public const STAGE_EITHER = 0;
    public const STAGE_BOTH = self::STAGE_FRONT | self::STAGE_ADMIN;

    public function __construct(
        protected LunaScript $lunaScript
    ) {
    }

    public function getFlagIconClass(string $name, int $type = self::FLAG_NORMAL): string
    {
        $this->lunaScript->flagIcon();

        $name = trim(LanguageNormalizer::normalizeLangCode($name), '-');

        $names = explode('-', $name, 2);

        if (isset($names[1])) {
            $names[0] = $names[1];
        }

        $sq = $type === static::FLAG_SQUARE ? ' flag-icon-squared' : null;

        return 'flag-icon flag-icon-' . $names[0] . $sq;
    }
}
