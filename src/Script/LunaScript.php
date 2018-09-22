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
}
