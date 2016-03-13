<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Error;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Package\PackageHelper;

/**
 * The ErrorHandler class.
 *
 * @since  {DEPLOY_VERSION}
 */
class ErrorHandler extends \Windwalker\Core\Error\ErrorHandler
{
	/**
	 * Property package.
	 *
	 * @var  string
	 */
	protected static $package = null;

	/**
	 * Method to get property Package
	 *
	 * @return  string
	 */
	public static function getPackage()
	{
		return static::$package;
	}

	/**
	 * Method to set property package
	 *
	 * @param   string $package
	 *
	 * @return  void
	 */
	public static function setPackage($package)
	{
		static::$package = $package;
	}

	/**
	 * respond
	 *
	 * @param \Exception $exception
	 *
	 * @return  void
	 */
	protected static function respond($exception)
	{
		$luna = LunaHelper::getPackage();

		if (!$package = static::getPackage())
		{
			$package = $luna->get('frontend.package', 'front');
		}

		$package = PackageHelper::getPackage($package);

		$package->getContainer()->getParent()->set('current.package', $package);

		$package->app->getRouter();
		$package->app->set('route.extra.layout', 'error');
		$package->app->input->set('exception', $exception);

		$body = $package->execute('Error\GetController');

		$package->app->setBody($body);

		$package->app->respond();

		die;
	}
}
