<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Script;

use Windwalker\Core\Asset\AbstractScript;

/**
 * The FontAwesomeScript class.
 */
class FontAwesomeScript extends AbstractScript
{
    public const PRO = 1 << 0;
    public const V4_SHIMS = 1 << 1;
    public const SOLID = 1 << 2;
    public const REGULAR = 1 << 3;
    public const LIGHT = 1 << 4;
    public const THIN = 1 << 5;
    public const DUOTONE = 1 << 6;
    public const BRANDS = 1 << 7;

    public const DEFAULT_SET = self::SOLID | self::REGULAR | self::BRANDS;
    public const ALL = self::SOLID | self::REGULAR | self::LIGHT | self::THIN | self::DUOTONE | self::BRANDS;

    public function cssFont(int $options = self::DEFAULT_SET): void
    {
        $package = $options & static::PRO ? '@fortawesome/fontawesome-pro' : '@fortawesome/fontawesome-free';
        $package = "vendor/$package/css";

        if (($options & static::ALL) === static::ALL) {
            $this->asset->css("$package/all.min.css");
        } else {
            $this->asset->css("$package/fontawesome.min.css");

            if ($options & static::SOLID) {
                $this->asset->css("$package/solid.min.css");
            }

            if ($options & static::REGULAR) {
                $this->asset->css("$package/regular.min.css");
            }

            if ($options & static::LIGHT) {
                $this->asset->css("$package/light.min.css");
            }

            if ($options & static::THIN) {
                $this->asset->css("$package/thin.min.css");
            }

            if ($options & static::DUOTONE) {
                $this->asset->css("$package/duotone.min.css");
            }

            if ($options & static::BRANDS) {
                $this->asset->css("$package/brands.min.css");
            }
        }

        if ($options & static::V4_SHIMS) {
            $this->asset->css("$package/v4-shims.min.css");
        }
    }
}
