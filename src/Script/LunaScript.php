<?php

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

            if ($this->unicornScript->next) {
                $this->unicornScript->importMainThen("u\$luna.useCaptcha()");
            } else {
                $this->unicornScript->importMainThen("u.import('@luna/dist/captcha.js')");
            }
        }

        return $this;
    }

    public function flagIcon(): static
    {
        if ($this->available()) {
            $this->css('@luna/dist/flag-icon.css');
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

            if ($this->unicornScript->next) {
                $this->unicornScript->importMainThen(
                    "u.\$luna.useAccountCheck()",
                );
            } else {
                $this->js('@luna/dist/account-check.js');
            }
        }

        return $this;
    }

    public function langDropdown(): static
    {
        if ($this->available()) {
            if ($this->unicornScript->next) {
                $this->unicornScript->importMainThen("u.\$luna.useLangDropdown()");
            } else {
                $this->js('@vendor/lyrasoft/luna/dist/lang-dropdown.js');
            }
        }

        return $this;
    }

    public function localeSwitch(): static
    {
        if ($this->available()) {
            if ($this->unicornScript->next) {
                $this->unicornScript->importMainThen("u.\$luna.useLocaleSwitch()");
            } else {
                $this->js('@vendor/lyrasoft/luna/dist/locale-switch.js');
            }
        }

        return $this;
    }
}
