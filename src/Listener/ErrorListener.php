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
use Windwalker\Core\Application\WindwalkerApplicationInterface;

/**
 * The ErrorListener class.
 *
 * @since  1.0
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
	 * @param WindwalkerApplicationInterface $app
	 */
	public function __construct(WindwalkerApplicationInterface $app)
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
