<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Helper;

use Lyrasoft\Luna\LunaPackage;

/**
 * The LunaHelper class.
 *
 * @since  1.0
 */
abstract class LunaHelper
{
    /**
     * Property package.
     *
     * @var  LunaPackage
     */
    protected static $package;

    /**
     * setPackage
     *
     * @param   LunaPackage $luna
     *
     * @return  void
     */
    public static function setPackage(LunaPackage $luna)
    {
        static::$package = $luna;
    }

    /**
     * Method to get property Package
     *
     * @return  LunaPackage
     */
    public static function getPackage()
    {
        return static::$package;
    }

    /**
     * isFrontend
     *
     * @param   string $name
     *
     * @return  boolean
     */
    public static function isFrontend($name = null)
    {
        return static::getPackage()->isFrontend($name);
    }

    /**
     * isAdmin
     *
     * @param   string $name
     *
     * @return  boolean
     */
    public static function isAdmin($name = null)
    {
        return static::getPackage()->isAdmin($name);
    }

    /**
     * getFrontendRouting
     *
     * @return  array
     */
    public static function getFrontendRouting()
    {
        return LUNA_SOURCE . '/routing.yml';
    }

    /**
     * getFrontendRouting
     *
     * @return  array
     */
    public static function getAdminRouting()
    {
        return LUNA_SOURCE_ADMIN . '/routing.yml';
    }

    /**
     * getLangPrefix
     *
     * @return  string
     */
    public static function getLangPrefix()
    {
        return static::getPackage()->getLangPrefix();
    }

    /**
     * getTypeTable
     *
     * @param string $type
     * @param string $default
     *
     * @return  string
     */
    public static function getTypeTable($type, $default = null)
    {
        return (string) static::getPackage()->get('type_table_map.' . $type, $default);
    }

    /**
     * getTable
     *
     * @param string $alias
     * @param string $default
     *
     * @return  string
     */
    public static function getTable($alias, $default = null)
    {
        $default = $default ?: $alias;

        return static::getPackage()->get('table.' . $alias, $default);
    }

    /**
     * tableExists
     *
     * @param   string $alias
     *
     * @return  boolean
     */
    public static function tableExists($alias)
    {
        if (!static::$package) {
            return false;
        }

        $table = static::getTable($alias);

        return static::getPackage()->getContainer()->get('db')->getTable($table)->exists();
    }

    /**
     * getFrontendPackage
     *
     * @param bool $main
     *
     * @return  array|string
     */
    public static function getFrontendPackage($main = false)
    {
        $packages = (array) static::getPackage()->get('frontend.package');

        return $main ? $packages[0] : $packages;
    }

    /**
     * getFrontendPackage
     *
     * @param bool $main
     *
     * @return  array|string
     */
    public static function getAdminPackage($main = false)
    {
        $packages = (array) static::getPackage()->get('admin.package');

        return $main ? $packages[0] : $packages;
    }
}
