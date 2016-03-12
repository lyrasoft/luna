<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module;

use Windwalker\Data\DataSet;
use Windwalker\Filesystem\Folder;
use Windwalker\Filesystem\Path\PathCollection;
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
	protected static $paths = null;

	/**
	 * Property classes.
	 *
	 * @var  array
	 */
	protected static $classes = null;

	/**
	 * getModuleTypes
	 *
	 * @return  array
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
	 * @return  DataSet
	 */
	public static function getModuleTypes()
	{
		$classes = static::getModuleClasses();

		$types = new DataSet;

		/** @var AbstractModule $class */
		foreach ($classes as $class)
		{
			$types[$class::getType()] = static::bindModuleType($class);
		}

		return $types;
	}

	/**
	 * getModuleType
	 *
	 * @param   string  $type
	 *
	 * @return  AbstractModule
	 */
	public static function getModuleType($type)
	{
		$classes = static::getModuleTypes();

		if (isset($classes[$type]))
		{
			return $classes[$type];
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

		foreach ($paths as $path => $namespace)
		{
			$folders = Folder::folders($path, false, Folder::PATH_BASENAME);

			foreach ($folders as $folder)
			{
				/** @var AbstractModule $class */
				$class = $namespace . '\\' . ucfirst($folder) . '\\' . ucfirst($folder) . 'Module';

				if (class_exists($class))
				{
					if (!is_subclass_of($class, 'Lyrasoft\Luna\Module\AbstractModule'))
					{
						throw new \LogicException('Class: ' . $class . ' must be sub class of: Lyrasoft\Luna\Module\AbstractModule');
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
	 * addNamespace
	 *
	 * @param   string  $namespace
	 * @param   string  $path
	 *
	 * @return  void
	 */
	public static function addNamespace($namespace, $path)
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
	public static function setPaths($paths)
	{
		static::$paths = $paths;
	}
	/**
	 * reset
	 *
	 * @return  void
	 */
	public static function reset()
	{
		static::$paths = array();
	}
}
