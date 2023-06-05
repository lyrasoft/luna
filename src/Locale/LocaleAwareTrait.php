<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 LYRASOFT.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Locale;

use Lyrasoft\Luna\Services\LocaleService;
use Windwalker\DI\Attributes\Service;

/**
 * Trait LocaleAwareTrait
 */
trait LocaleAwareTrait
{
    #[Service]
    protected LocaleService $localeService;

    public function isLocaleEnabled(): bool
    {
        return $this->localeService->isEnabled();
    }

    public function getLocale(): ?string
    {
        return $this->localeService->getLocale();
    }
}
