<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Script;

use Windwalker\Core\Asset\AbstractScript;

/**
 * The PageScript class.
 */
class PageScript extends AbstractScript
{
    public function jarallax(): void
    {
        if ($this->available()) {
            if ($this->asset->has('@vendor/jarallax/dist/jarallax.min.js')) {
                $this->css('@vendor/jarallax/dist/jarallax.min.css');
                $this->js('@vendor/jarallax/dist/jarallax.min.js');
                $this->js('@vendor/jarallax/dist/jarallax-video.min.js');
            } else {
                $this->warnIfDebug('Please install `jarallax` module to support parallax scroll.');
            }
        }
    }

    public function wow(): void
    {
        if ($this->available()) {
            if ($this->asset->has('@vendor/wowjs/dist/wow.min.js')) {
                $this->js('@vendor/wowjs/dist/wow.min.js');
                $this->internalJS('new WOW().init();');
            } else {
                $this->warnIfDebug('Please install `wowjs` module to support animation.');
            }
        }
    }

    public function animate(): void
    {
        if ($this->available()) {
            if ($this->asset->has('@vendor/animate.css/animate.min.css')) {
                $this->css('@vendor/animate.css/animate.min.css');
            } else {
                $this->warnIfDebug('Please install `animate.css` module to support animation.');
            }
        }
    }
}
