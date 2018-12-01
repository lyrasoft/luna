<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\LunaPackage;
use Phoenix\Script\JQueryScript;
use Phoenix\Script\PhoenixScript;
use Phoenix\Script\VueScript;
use Windwalker\Core\Asset\AbstractScript;

/**
 * The LunaScript class.
 *
 * @since  1.5.2
 */
class LunaScript extends AbstractScript
{
    /**
     * Property packageClass.
     *
     * @var  string
     */
    protected static $packageClass = LunaPackage::class;

    /**
     * vueDraggable
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function vueDraggable()
    {
        if (!static::inited(__METHOD__)) {
            VueScript::core();
            PhoenixScript::sortableJS();

            static::addJS(static::packageName() . '/js/vue/vuedraggable.min.js');
        }
    }

    /**
     * vueDragUploader
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function vueDragUploader()
    {
        if (!static::inited(__METHOD__)) {
            VueScript::core();
            static::vueDraggable();
            VueScript::animate();
            JQueryScript::csrfToken(); // todo: remove if phoenix.ajax fix
            static::addJS(static::packageName() . '/js/vue/vue-drag-uploader.min.js');
            static::addCSS(static::packageName() . '/css/vue/vue-drag-uploader.min.css');
        }
    }

    /**
     * vueSlider
     *
     * @see https://biigpongsatorn.github.io/#/vue-slide-bar
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function vueSlider()
    {
        if (!static::inited(__METHOD__)) {
            static::addJS(static::packageName() . '/js/vue/vue-slide-bar.min.js');

            static::internalJS("Vue.component('vue-slide-bar', vueSlideBar);");
        }
    }

    /**
     * animate
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function animate()
    {
        if (!static::inited(__METHOD__)) {
            static::addCSS(static::packageName() . '/css/animate/animate.min.css');
        }
    }

    /**
     * wow
     *
     * @param bool $init
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function wow($init = false)
    {
        if (!static::inited(__METHOD__)) {
            static::addJS(static::packageName() . '/js/wow/wow.min.js');
        }

        if (!static::inited(__METHOD__, get_defined_vars()) && $init) {
            static::internalJS('new WOW().init();');
        }
    }

    /**
     * jarallax
     *
     * @return  void
     *
     * @since  1.5.2
     */
    public static function jarallax()
    {
        if (!static::inited(__METHOD__)) {
            static::addCSS(static::packageName() . '/js/jarallax/jarallax.min.css');
            static::addJS(static::packageName() . '/js/jarallax/jarallax.min.js');
            static::addJS(static::packageName() . '/js/jarallax/jarallax-video.min.js');
        }
    }
}
