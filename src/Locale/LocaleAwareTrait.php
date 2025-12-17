<?php

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

    public function getFallbackLocale(): string
    {
        return $this->localeService->getFallback();
    }
}
