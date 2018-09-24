<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Script;

use Lyrasoft\Luna\LunaPackage;
use Phoenix\Script\VueScript;
use Windwalker\Core\Asset\AbstractScript;

/**
 * The LunaScript class.
 *
 * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
     */
    public static function vueDraggable()
    {
        if (!static::inited(__METHOD__)) {
            VueScript::core();
            static::sortableJS();

            static::addJS(static::packageName() . '/js/vue/vuedraggable.min.js');
        }
    }

    /**
     * sortableJS
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function sortableJS()
    {
        if (!static::inited(__METHOD__)) {
            static::addJS(static::packageName() . '/js/sortablejs/Sortable.min.js');
        }
    }

    /**
     * vueSlider
     *
     * @see https://biigpongsatorn.github.io/#/vue-slide-bar
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * vide
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function vide()
    {
        if (!static::inited(__METHOD__)) {
            static::addJS(static::packageName() . '/js/vide/jquery.vide.min.js');
        }
    }

    /**
     * jarallax
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
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
