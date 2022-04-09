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

    public function flagIcon(): static
    {
        if ($this->available()) {
            $this->css('@luna/dist/flag-icon.min.css');
        }

        return $this;
    }

    public function accountCheck(): static
    {
        if ($this->available()) {
            $this->unicornScript->translate('luna.message.user.account.exists');
            $this->unicornScript->addRoute(
                '@account_check',
            );

            $this->js('@luna/dist/account-check.js');
        }

        return $this;
    }
}
