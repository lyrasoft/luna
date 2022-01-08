<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Script;

use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AbstractScript;

/**
 * The LunaScript class.
 */
class LunaScript extends AbstractScript
{
    public function __construct(protected UnicornScript $unicornScript)
    {
    }

    public function captcha(): static
    {
        if ($this->available()) {
            $this->unicornScript->translate('luna.field.captcha.message.please.check.first');

            $this->unicornScript->importMainThen("u.import('@luna/dist/captcha.js')");
        }

        return $this;
    }
}
