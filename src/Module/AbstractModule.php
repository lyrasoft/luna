<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Module;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Form\Renderer\InputRenderer;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Package\PackageHelper;
use Windwalker\Core\Renderer\BladeRenderer;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\Form\Form;
use Windwalker\Structure\Structure;
use Windwalker\Utilities\Queue\PriorityQueue;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The AbstractModule class.
 *
 * @property  string    title
 * @property  string    content
 * @property  string    type
 * @property  string    position
 * @property  string    state
 * @property  string    ordering
 * @property  string    language
 * @property  Structure params
 *
 * @since  1.0
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
     * Property data.
     *
     * @var  array|Data
     */
    protected $data;

    /**
     * getInstance
     *
     * @param array  $data
     * @param string $engine
     *
     * @return static
     */
    public static function getInstance($data = [], $engine = 'edge')
    {
        return new static($data, $engine);
    }

    /**
     * AbstractModule constructor.
     *
     * @param  array $data
     * @param string $engine
     */
    public function __construct($data = [], $engine = 'edge')
    {
        $this->data     = $data instanceof Data ? $data : new Data($data);
        $this->params   = $this->data->params;
        $this->renderer = RendererHelper::getRenderer($engine);
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
        if (!static::$type) {
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

        return $this->renderer->render(static::getType(), $data);
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

        $paths->insert(WINDWALKER_TEMPLATES . '/luna/modules/' . static::$type, PriorityQueue::LOW);

        $paths->insert($package->getDir() . '/modules/' . static::$type, PriorityQueue::LOW);

        $paths->insert(dirname(ReflectionHelper::getPath($this)) . '/Templates', PriorityQueue::LOW);
    }

    /**
     * prepareData
     *
     * @param DataInterface $data
     *
     * @return  void
     */
    abstract protected function prepareData(DataInterface $data);

    /**
     * getForm
     *
     * @param array $data
     *
     * @return Form
     */
    public static function getForm($data = null)
    {
        $form = new Form('params');

        $form->setRenderer(new InputRenderer);

        $class = ReflectionHelper::getNamespaceName(get_called_class()) . '\Form\EditDefinition';

        if (class_exists($class)) {
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
        if (static::$name === null) {
            return __(static::$langPrefix . 'module.' . static::getType() . '.name');
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
        if (static::$description === null) {
            return __(static::$langPrefix . 'module.' . static::getType() . '.desc');
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
     * @param DataInterface $data
     *
     * @return  void
     */
    protected function prepareGlobals(DataInterface $data)
    {
        $package = LunaHelper::getPackage()->getCurrentPackage();

        $globals = RendererHelper::getGlobals();

        $globals['router']  = $package->router;
        $globals['package'] = PackageHelper::getCurrentPackage();

        $data->bind($globals);
    }

    /**
     * getDir
     *
     * @return  string
     */
    public static function getDir()
    {
        return dirname(ReflectionHelper::getPath(get_called_class()));
    }

    /**
     * __get
     *
     * @param   string $name
     *
     * @return  mixed
     */
    public function __get($name)
    {
        return $this->data->item[$name];
    }

    /**
     * Method to get property Data
     *
     * @return  array|Data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Method to set property data
     *
     * @param   array|Data $data
     *
     * @return  static  Return self to support chaining.
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }
}
