<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Renderer\BladeRenderer;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Core\View\Helper\ViewHelper;
use Windwalker\Data\Data;
use Windwalker\Form\Form;
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
	 * Property type.
	 *
	 * @var  string
	 */
	protected static $type;

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
	 * Property langPrefix.
	 *
	 * @var  string
	 */
	protected static $langPrefix = 'luna.';

	/**
	 * Property renderer.
	 *
	 * @var  BladeRenderer
	 */
	protected $renderer;

	/**
	 * getInstance
	 *
	 * @param array         $data
	 * @param BladeRenderer $renderer
	 *
	 * @return  static
	 */
	public static function getInstance($data = array(), BladeRenderer $renderer = null)
	{
		return new static($data, $renderer);
	}

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
	 * Method to get property Type
	 *
	 * @return  string
	 */
	public static function getType()
	{
		if (!static::$type)
		{
			return strtolower(substr(ReflectionHelper::getShortName(get_called_class()), 0, -6));
		}

		return static::$type;
	}

	/**
	 * Method to set property type
	 *
	 * @param   string $type
	 *
	 * @return  void
	 */
	public static function setType($type)
	{
		static::$type = $type;
	}

	/**
	 * Method to get property LangPrefix
	 *
	 * @return  string
	 */
	public static function getLangPrefix()
	{
		return static::$langPrefix;
	}

	/**
	 * Method to set property langPrefix
	 *
	 * @param   string $langPrefix
	 *
	 * @return  void
	 */
	public static function setLangPrefix($langPrefix)
	{
		static::$langPrefix = $langPrefix;
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

		return $this->renderer->render(static::$type, $data);
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

		$paths->insert(WINDWALKER_TEMPLATES . '/luna/modules/' . static::$type, Priority::LOW);

		$paths->insert($package->getDir() . '/modules/' . static::$type, Priority::LOW);

		$paths->insert(ReflectionHelper::getPath($this) . '/Templates', Priority::LOW);
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
	 * getForm
	 *
	 * @param array $data
	 *
	 * @return Form
	 */
	public static function getForm($data = null)
	{
		$form = new Form;

		$form->setFieldRenderHandler(array('Phoenix\Form\Renderer\InputRenderer', 'render'));

		$class = ReflectionHelper::getNamespaceName(get_called_class()) . '\Form\EditDefinition';

		if (class_exists($class))
		{
			$form->defineFormFields(new $class);
		}

		$form->bind($data);

		return $form;
	}

	/**
	 * Method to get property Name
	 *
	 * @return  string
	 */
	public static function getName()
	{
		if (static::$name === null)
		{
			return Translator::translate(static::$langPrefix . 'module.' . static::getType() . '.name');
		}

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
		if (static::$description === null)
		{
			return Translator::translate(static::$langPrefix . 'module.' . static::getType() . '.desc');
		}

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

	/**
	 * getDir
	 *
	 * @return  string
	 */
	public static function getDir()
	{
		return ReflectionHelper::getPath(get_called_class());
	}
}
