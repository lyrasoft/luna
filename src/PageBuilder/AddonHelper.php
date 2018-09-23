<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Cache\Cache;
use Windwalker\Cache\Serializer\RawSerializer;
use Windwalker\Cache\Storage\ArrayStorage;
use Windwalker\Data\DataSet;
use Windwalker\Filesystem\Folder;
use Windwalker\Ioc;
use Windwalker\String\StringNormalise;

/**
 * The AddonHelper class.
 *
 * @since  __DEPLOY_VERSION__
 */
class AddonHelper
{
    /**
     * Property namespaces.
     *
     * @var  array
     */
    protected static $paths = [];

    /**
     * Property classes.
     *
     * @var  array
     */
    protected static $classes = null;

    /**
     * Property types.
     *
     * @var  DataSet|AddonType[]
     */
    protected static $types = null;

    /**
     * Property addons.
     *
     * @var  array
     */
    protected static $addons = [];

    /**
     * getModuleTypes
     *
     * @param bool $refresh
     *
     * @return array|AbstractAddon[]
     */
    public static function getAddonClasses($refresh = false)
    {
        if (static::$classes === null || $refresh) {
            static::$classes = static::findAddonClasses();
        }

        return static::$classes;
    }

    /**
     * getModuleTypes
     *
     * @param bool $refresh
     *
     * @return AddonType[]|DataSet
     */
    public static function getAddonTypes($refresh = false)
    {
        if (static::$types === null || $refresh) {
            $classes = static::getAddonClasses($refresh);

            static::$types = new DataSet();

            $luna     = LunaHelper::getPackage();
            $includes = (array) $luna->get('addon.includes');
            $excludes = (array) $luna->get('addon.excludes');

            /** @var AbstractAddon $class */
            foreach ($classes as $class) {
                $type   = $class::getType();
                $accept = true;

                if ($includes && !in_array($type, $includes, true) && !in_array('*', $includes, true)) {
                    $accept = false;
                }

                if ($excludes && (in_array($type, $excludes, true) || in_array('*', $excludes, true))) {
                    $accept = false;
                }

                if ($accept) {
                    static::$types[$type] = static::bindAddonType($class);
                }
            }
        }

        return static::$types;
    }

    /**
     * getModuleType
     *
     * @param   string $type
     *
     * @return  AddonType
     */
    public static function getAddonType($type)
    {
        $types = static::getAddonTypes();

        if (isset($types[$type])) {
            return $types[$type];
        }

        return null;
    }

    /**
     * bindModuleType
     *
     * @param   string|AbstractAddon $class
     *
     * @return  AddonType
     */
    public static function bindAddonType($class)
    {
        return new AddonType(
            [
                'name' => $class::getName(),
                'type' => $class::getType(),
                'icon' => $class::getIcon(),
                'description' => $class::getDescription(),
                'langPrefix' => $class::getLangPrefix(),
                'componentName' => $class::getVueComponentName(),
                'class' => $class,
            ]
        );
    }

    /**
     * findModuleClasses
     *
     * @return  array
     */
    public static function findAddonClasses()
    {
        $paths = static::getPaths();

        $classes = [];

        foreach ((array) $paths as $path => $namespace) {
            $folders = Folder::folders($path, false, Folder::PATH_BASENAME);

            foreach ($folders as $folder) {
                /** @var AbstractAddon $class */
                $class = $namespace . '\\' . ucfirst($folder) . '\\' . ucfirst($folder) . 'Addon';

                if (class_exists($class)) {
                    if (!is_subclass_of($class, AbstractAddon::class)) {
                        throw new \LogicException(
                            'Class: ' . $class . ' must be sub class of: ' . AbstractAddon::class
                        );
                    }

                    if ($class::$isEnabled) {
                        $classes[$class::getType()] = $class;
                    }
                }
            }
        }

        return $classes;
    }

    /**
     * addPath
     *
     * @param   string $namespace
     * @param   string $path
     *
     * @return  void
     */
    public static function addPath($namespace, $path)
    {
        static::$paths[$path] = StringNormalise::toClassNamespace($namespace);
    }

    /**
     * Method to get property Namespaces
     *
     * @return array
     */
    public static function getPaths()
    {
        return static::$paths;
    }

    /**
     * Method to set property namespaces
     *
     * @param   array $paths
     *
     * @return  void
     */
    public static function setPaths(array $paths)
    {
        static::$paths = $paths;
    }

    /**
     * reset
     *
     * @return  void
     */
    public static function resetPath()
    {
        static::$paths = [];
    }

    /**
     * reset
     *
     * @return  void
     */
    public static function reset()
    {
        static::$types   = null;
        static::$classes = null;
    }

    /**
     * getCache
     *
     * @param bool $forceNew
     *
     * @return  Cache
     */
    public static function getCache($forceNew = false)
    {
        $key = 'modules.helper.cache';

        if (!Ioc::exists($key)) {
            Ioc::getContainer()->share($key, function () {
                return new Cache(new ArrayStorage(), new RawSerializer());
            });
        }

        return Ioc::get($key, $forceNew);
    }
}
