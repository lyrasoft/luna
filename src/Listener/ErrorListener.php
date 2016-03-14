<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Error\ErrorHandler;
use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Ioc;

/**
 * The ErrorListener class.
 *
 * @since  {DEPLOY_VERSION}
 */
class ErrorListener
{
	/**
	 * onAfterInitialise
	 *
	 * @return  void
	 */
	public function onAfterInitialise()
	{
		if (!Ioc::getConfig()->get('system.debug'))
		{
			ErrorHandler::register(true);
		}
	}

	/**
	 * onAfterRouting
	 *
	 * @return  void
	 */
	public function onAfterRouting()
	{
		if (LunaHelper::isAdmin())
		{
			ErrorHandler::setPackage(LunaHelper::getAdminPackage());
		}
	}
}
