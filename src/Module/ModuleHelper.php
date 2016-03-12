<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module;

use Windwalker\Filesystem\Folder;
use Windwalker\Filesystem\Path\PathCollection;
use Windwalker\String\StringNormalise;
use Windwalker\Utilities\Queue\PriorityQueue;

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
						$classes[] = $class;
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
