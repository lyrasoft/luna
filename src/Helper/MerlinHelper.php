<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin\Helper;

use Lyrasoft\Merlin\MerlinPackage;
use Symfony\Component\Yaml\Yaml;

/**
 * The MerlinHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
abstract class MerlinHelper
{
	/**
	 * Property package.
	 *
	 * @var  MerlinPackage
	 */
	protected static $package;

	/**
	 * setPackage
	 *
	 * @param   MerlinPackage $merlin
	 *
	 * @return  void
	 */
	public static function setPackage(MerlinPackage $merlin)
	{
		static::$package = $merlin;
	}

	/**
	 * Method to get property Package
	 *
	 * @return  MerlinPackage
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
		return Yaml::parse(MERLIN_SOURCE . '/routing.yml');
	}

	/**
	 * getFrontendRouting
	 *
	 * @return  array
	 */
	public static function getAdminRouting()
	{
		return Yaml::parse(MERLIN_SOURCE_ADMIN . '/routing.yml');
	}
}
