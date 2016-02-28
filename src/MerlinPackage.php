<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Merlin;

use Lyrasoft\Merlin\Helper\MerlinHelper;
use Lyrasoft\Merlin\Listener\MerlinListener;
use Phoenix\Language\TranslatorHelper;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Event\Dispatcher;

define('MERLIN_ROOT', dirname(__DIR__));
define('MERLIN_SOURCE', MERLIN_ROOT . '/src');
define('MERLIN_SOURCE_ADMIN', MERLIN_SOURCE . '/Admin');

/**
 * The MerlinPackage class.
 *
 * @since  {DEPLOY_VERSION}
 */
class MerlinPackage extends AbstractPackage
{
	/**
	 * WarderPackage constructor.
	 */
	public function __construct()
	{
		MerlinHelper::setPackage($this);
	}

	/**
	 * initialise
	 *
	 * @throws  \LogicException
	 * @return  void
	 */
	public function initialise()
	{
		parent::initialise();

		TranslatorHelper::loadAll($this);
	}

	/**
	 * registerListeners
	 *
	 * @param Dispatcher $dispatcher
	 *
	 * @return  void
	 */
	public function registerListeners(Dispatcher $dispatcher)
	{
		parent::registerListeners($dispatcher);

		$dispatcher->addListener(new MerlinListener($this));
	}

	/**
	 * isFrontend
	 *
	 * @param   string $name
	 *
	 * @return  boolean
	 */
	public function isFrontend($name = null)
	{
		$name = $name ? : $this->getCurrentPackage()->getName();

		return in_array($name, (array) $this->get('frontend.package'));
	}

	/**
	 * isFrontend
	 *
	 * @param   string $name
	 *
	 * @return  boolean
	 */
	public function isAdmin($name = null)
	{
		$name = $name ? : $this->getCurrentPackage()->getName();

		return in_array($name, (array) $this->get('admin.package'));
	}

	/**
	 * isEnabled
	 *
	 * @param   string $name
	 *
	 * @return  boolean
	 */
	public function isEnabled($name = null)
	{
		return $this->isFrontend($name) || $this->isAdmin($name);
	}

	/**
	 * getCurrentPackage
	 *
	 * @return  AbstractPackage
	 */
	public function getCurrentPackage()
	{
		if (!$this->container->exists('current.package'))
		{
			throw new \LogicException('Please call this method after routing.');
		}

		return $this->container->get('current.package');
	}
}
