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
use Windwalker\Core\Application\WebApplication;
use Windwalker\Core\Mvc\MvcResolver;
use Windwalker\Ioc;
use Windwalker\Utilities\Queue\Priority;
use Windwalker\Utilities\Reflection\ReflectionHelper;

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
		if (!Ioc::getConfig()->get('debug') && Ioc::getApplication() instanceof WebApplication)
		{
			/** @var MvcResolver $resolver */
			$resolver = Ioc::getContainer()->get('mvc.resolver');

			$resolver->addNamespace(ReflectionHelper::getNamespaceName(LunaHelper::getPackage()), Priority::LOW - 100);

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
			ErrorHandler::setPackage(LunaHelper::getAdminPackage(true));
		}
	}
}
