<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module;

use Lyrasoft\Luna\Admin\DataMapper\ModuleMapper;
use Lyrasoft\Luna\Admin\Model\ModulesModel;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Windwalker\Cache\Cache;
use Windwalker\Cache\DataHandler\RawDataHandler;
use Windwalker\Cache\Storage\RuntimeStorage;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\Filesystem\Folder;
use Windwalker\Filesystem\Path\PathCollection;
use Windwalker\Ioc;
use Windwalker\Registry\Registry;
use Windwalker\String\StringNormalise;

/**
 * The ModuleResolver class.
 *
 * @since  {DEPLOY_VERSION}
 */
class ModuleHelper
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
	 * @var  DataSet|ModuleType[]
	 */
	protected static $types = null;

	/**
	 * Property modules.
	 *
	 * @var  array
	 */
	protected static $modules = array();

	/**
	 * getModules
	 *
	 * @param   string  $position
	 * @param   string  $language
	 *
	 * @return DataSet
	 */
	public static function getModules($position = null, $language = null)
	{
		$cache = static::getCache();

		return $cache->call('position.' . $position, function() use ($position, $language)
		{
			$conditions = array();

			if ('' !== (string) $position)
			{
				$conditions['position'] = $position;
			}

			if ($language)
			{
				$conditions['language'] = (array) $language;
			}
			elseif (Locale::isEnabled())
			{
				$conditions['language'] = array(Locale::getLocale(), '*');
			}

			$conditions['state'] = 1;

			$items = static::findModules($conditions, 'position, ordering');

			$modules = array();

			foreach ($items as $item)
			{
				$type = static::getModuleType($item->type);
				$class = $type->class;

				$modules[] = new $class(array('item' => $item, 'params' => new Registry($item->params)));
			}

			return $modules;
		});
	}

	/**
	 * findModules
	 *
	 * @param array    $conditions
	 * @param string   $order
	 * @param integer  $start
	 * @param integer  $limit
	 *
	 * @return  DataSet|Data[]
	 */
	public static function findModules($conditions = array(), $order = null, $start = null, $limit = null)
	{
		$modules = ModuleMapper::find($conditions, $order, $start, $limit);

		return $modules;
	}

	/**
	 * getModuleTypes
	 *
	 * @return  array|AbstractModule[]
	 */
	public static function getModuleClasses()
	{
		if (static::$classes === null)
		{
			static::$classes = static::findModuleClasses();
		}

		return static::$classes;
	}

	/**
	 * getModuleTypes
	 *
	 * @return  DataSet|ModuleType[]
	 */
	public static function getModuleTypes()
	{
		if (static::$types === null)
		{
			$classes = static::getModuleClasses();

			static::$types = new DataSet;

			$luna = LunaHelper::getPackage();
			$includes = (array) $luna->get('module.includes');
			$excludes = (array) $luna->get('module.excludes');

			/** @var AbstractModule $class */
			foreach ($classes as $class)
			{
				$type = $class::getType();
				$accept = true;

				if ($includes && !in_array($type, $includes) && !in_array('*', $includes))
				{
					$accept = false;
				}

				if ($excludes && (in_array($type, $excludes) || in_array('*', $excludes)))
				{
					$accept = false;
				}

				if ($accept)
				{
					static::$types[$type] = static::bindModuleType($class);
				}
			}
		}

		return static::$types;
	}

	/**
	 * getModuleType
	 *
	 * @param   string  $type
	 *
	 * @return  ModuleType
	 */
	public static function getModuleType($type)
	{
		$types = static::getModuleTypes();

		if (isset($types[$type]))
		{
			return $types[$type];
		}

		return null;
	}

	/**
	 * bindModuleType
	 *
	 * @param   string|AbstractModule  $class
	 *
	 * @return  ModuleType
	 */
	public static function bindModuleType($class)
	{
		return new ModuleType(array(
			'name' => $class::getName(),
			'type' => $class::getType(),
			'icon' => $class::getIcon(),
			'description' => $class::getDescription(),
			'langPrefix'  => $class::getLangPrefix(),
			'class' => $class,
		));
	}

	/**
	 * findModuleClasses
	 *
	 * @return  array
	 */
	public static function findModuleClasses()
	{
		$paths = ModuleHelper::getPaths();

		$classes = array();

		foreach ((array) $paths as $path => $namespace)
		{
			$folders = Folder::folders($path, false, Folder::PATH_BASENAME);

			foreach ($folders as $folder)
			{
				/** @var AbstractModule $class */
				$class = $namespace . '\\' . ucfirst($folder) . '\\' . ucfirst($folder) . 'Module';

				if (class_exists($class))
				{
					if (!is_subclass_of($class, AbstractModule::class))
					{
						throw new \LogicException('Class: ' . $class . ' must be sub class of: ' . AbstractModule::class);
					}

					if ($class::$isEnabled)
					{
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
	 * @param   string  $namespace
	 * @param   string  $path
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
	 * @return  PathCollection
	 */
	public static function getPaths()
	{
		return static::$paths;
	}

	/**
	 * Method to set property namespaces
	 *
	 * @param   array  $paths
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
		static::$types = null;
		static::$classes = null;
	}

	/**
	 * getModel
	 *
	 * @param bool $forceNew
	 *
	 * @return  ModulesModel
	 */
	public static function getModel($forceNew = false)
	{
		$key = 'modules.helper.model';

		if (!Ioc::exists($key))
		{
			Ioc::getContainer()->share($key, function()
			{
				return new ModulesModel;
			});
		}

		return Ioc::get($key, $forceNew);
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

		if (!Ioc::exists($key))
		{
			Ioc::getContainer()->share($key, function()
			{
				return new Cache(new RuntimeStorage, new RawDataHandler);
			});
		}

		return Ioc::get($key, $forceNew);
	}
}
