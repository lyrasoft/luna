<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Error\LunaErrorHandler;
use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Application\WebApplication;

/**
 * The ErrorListener class.
 *
 * @since  {DEPLOY_VERSION}
 */
class ErrorListener
{
	/**
	 * Property app.
	 *
	 * @var  WebApplication
	 */
	protected $app;

	/**
	 * Property handler.
	 *
	 * @var  LunaErrorHandler
	 */
	protected $handler;

	/**
	 * ErrorListener constructor.
	 *
	 * @param WebApplication $app
	 */
	public function __construct(WebApplication $app)
	{
		$this->app = $app;
	}

	/**
	 * onAfterInitialise
	 *
	 * @return  void
	 */
	public function onAfterInitialise()
	{
		if (!$this->app->get('system.debug') && $this->app->isWeb())
		{
			$this->handler = new LunaErrorHandler;

			$this->app->container->get('error.handler')->addHandler($this->handler, 'default');
		}
	}

	/**
	 * onAfterRouting
	 *
	 * @return  void
	 */
	public function onAfterRouting()
	{
		if ($this->handler && LunaHelper::isAdmin())
		{
			$this->handler->setPackage(LunaHelper::getAdminPackage(true));
		}
	}
}
