<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Renderer\BladeRenderer;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Core\View\Helper\ViewHelper;
use Windwalker\Data\Data;
use Windwalker\Utilities\Queue\Priority;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The AbstractModule class.
 *
 * @since  {DEPLOY_VERSION}
 */
abstract class AbstractModule
{
	/**
	 * Property isEnabled.
	 *
	 * @var  boolean
	 */
	public static $isEnabled = true;

	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected static $name;

	/**
	 * Property description.
	 *
	 * @var  string
	 */
	protected static $description;

	/**
	 * Property icon.
	 *
	 * @var string
	 */
	protected static $icon;

	/**
	 * Property renderer.
	 *
	 * @var  BladeRenderer
	 */
	protected $renderer;

	/**
	 * AbstractModule constructor.
	 *
	 * @param  array          $data
	 * @param  BladeRenderer  $renderer
	 */
	public function __construct($data = array(), BladeRenderer $renderer = null)
	{
		$this->data = $data instanceof Data ? $data : new Data($data);
		$this->renderer = $renderer ? : RendererHelper::getBladeRenderer(array('cache_path' => WINDWALKER_TEMP . '/modules'));;
	}

	/**
	 * Method to get property Icon
	 *
	 * @return  string
	 */
	public static function getIcon()
	{
		return static::$icon;
	}

	/**
	 * Method to set property icon
	 *
	 * @param   string $icon
	 *
	 * @return  void
	 */
	public static function setIcon($icon)
	{
		static::$icon = $icon;
	}

	/**
	 * render
	 *
	 * @return  string
	 */
	public function render()
	{
		$data = $this->data;

		$this->prepareData($data);

		$this->prepareGlobals($data);

		$this->registerPaths();

		return $this->renderer->render($this->name, $data);
	}

	/**
	 * registerPaths
	 *
	 * @return  void
	 */
	public function registerPaths()
	{
		$package = LunaHelper::getPackage()->getCurrentPackage();

		$paths = $this->getRenderer()->getPaths();

		$paths->insert(WINDWALKER_TEMPLATES . '/luna/modules/' . $this->name, Priority::LOW);

		$paths->insert($package->getDir() . '/modules/' . $this->name, Priority::LOW);

		$paths->insert(ReflectionHelper::getPath($this) . '/templates', Priority::LOW);
	}

	/**
	 * prepareData
	 *
	 * @param Data $data
	 *
	 * @return  void
	 */
	abstract protected function prepareData(Data $data);

	/**
	 * Method to get property Name
	 *
	 * @return  string
	 */
	public static function getName()
	{
		return static::$name;
	}

	/**
	 * Method to set property name
	 *
	 * @param   string $name
	 *
	 * @return  void
	 */
	public static function setName($name)
	{
		static::$name = $name;
	}

	/**
	 * Method to get property Description
	 *
	 * @return  string
	 */
	public static function getDescription()
	{
		return static::$description;
	}

	/**
	 * Method to set property description
	 *
	 * @param   string $description
	 *
	 * @return  void
	 */
	public static function setDescription($description)
	{
		static::$description = $description;
	}

	/**
	 * Method to get property Renderer
	 *
	 * @return  BladeRenderer
	 */
	public function getRenderer()
	{
		return $this->renderer;
	}

	/**
	 * Method to set property renderer
	 *
	 * @param   BladeRenderer $renderer
	 *
	 * @return  static  Return self to support chaining.
	 */
	public function setRenderer($renderer)
	{
		$this->renderer = $renderer;

		return $this;
	}

	/**
	 * prepareGlobals
	 *
	 * @param Data $data
	 *
	 * @return  void
	 */
	protected function prepareGlobals(Data $data)
	{
		$package = LunaHelper::getPackage()->getCurrentPackage();

		$globals = ViewHelper::getGlobalVariables($package);

		$data->bind($globals);
	}
}
