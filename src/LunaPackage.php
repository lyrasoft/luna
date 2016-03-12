<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Listener\EditorListener;
use Lyrasoft\Luna\Listener\LunaListener;
use Lyrasoft\Luna\Module\ModuleHelper;
use Lyrasoft\Luna\Provider\LunaProvider;
use Phoenix\Language\TranslatorHelper;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\DI\Container;
use Windwalker\Event\Dispatcher;

define('LUNA_ROOT', dirname(__DIR__));
define('LUNA_SOURCE', LUNA_ROOT . '/src');
define('LUNA_SOURCE_ADMIN', LUNA_SOURCE . '/Admin');

/**
 * The LunaPackage class.
 *
 * @since  {DEPLOY_VERSION}
 */
class LunaPackage extends AbstractPackage
{
	/**
	 * WarderPackage constructor.
	 */
	public function __construct()
	{
		LunaHelper::setPackage($this);
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

		ModuleHelper::addNamespace(__NAMESPACE__ . '\Module', $this->getDir() . '/Module');
	}

	/**
	 * registerProviders
	 *
	 * @param Container $container
	 *
	 * @return  void
	 */
	public function registerProviders(Container $container)
	{
		$container->registerServiceProvider(new LunaProvider($this));
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

		$dispatcher->addListener(new LunaListener($this))
			->addListener(new EditorListener);
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

	/**
	 * getLangPrefix
	 *
	 * @return  string
	 */
	public function getLangPrefix()
	{
		if ($this->isAdmin())
		{
			$langPrefix = $this->get('admin.language.prefix', 'luna.');
		}
		else
		{
			$langPrefix = $this->get('frontend.language.prefix', 'luna.');
		}

		return $langPrefix;
	}
}
