<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Script;

use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AbstractScript;

/**
 * The PageScript class.
 */
class PageScript extends AbstractScript
{
    public function __construct(protected UnicornScript $unicornScript)
    {
    }

    public static function wowToAOS(string $animationName): string
    {
        $map = [
            'fadeIn' => 'fade',
            'fadeInDown' => 'fade-down',
            'fadeInDownBig' => 'fade-down',
            'fadeInLeft' => 'fade-left',
            'fadeInLeftBig' => 'fade-left',
            'fadeInRight' => 'fade-right',
            'fadeInRightBig' => 'fade-right',
            'fadeInUp' => 'fade-up',
            'fadeInUpBig' => 'fade-up',

            'flip' => 'flip-left',
            'flipInX' => 'flip-up',
            'flipInY' => 'flip-left',

            'rotateIn' => 'zoom-in',
            'rotateInDownLeft' => 'fade-down',
            'rotateInDownRight' => 'fade-down',
            'rotateInUpLeft' => 'fade-up',
            'rotateInUpRight' => 'fade-up',

            'zoomIn' => 'zoom-in',
            'zoomInDown' => 'zoom-in-down',
            'zoomInLeft' => 'zoom-in-left',
            'zoomInRight' => 'zoom-in-right',
            'zoomInUp' => 'zoom-in-up',

            'bounceIn' => 'zoom-in',
            'bounceInDown' => 'fade-down',
            'bounceInLeft' => 'fade-left',
            'bounceInRight' => 'fade-right',
            'bounceInUp' => 'fade-up',
        ];

        return $map[$animationName] ?? 'fade';
    }

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
            if ($this->asset->has('@vendor/wow.js/dist/wow.min.js')) {
                $this->js('@vendor/wow.js/dist/wow.min.js');
                $this->internalJS('new WOW().init();');
            } else {
                $this->warnIfDebug('Please install `wow.js` module to support animation.');
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

    public function aos(): void
    {
        if ($this->available()) {
            $this->unicornScript->importMainThen('u.$luna.useAOS();');
            // $this->asset->importMainThen('u.$luna.useAOS();');
        }
    }
}
