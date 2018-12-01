<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use Phoenix\Script\PhoenixScript;
use Windwalker\Core\Asset\Asset;
use Windwalker\Core\Package\PackageHelper;
use Windwalker\Core\Renderer\BladeRenderer;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\Renderer\AbstractRenderer;
use Windwalker\Structure\Structure;
use Windwalker\Utilities\Queue\PriorityQueue;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The AbstractAddon class.
 *
 * @property  string    title
 * @property  string    content
 * @property  string    type
 * @property  string    state
 * @property  string    ordering
 * @property  string    language
 * @property  Structure params
 *
 * @since  1.0
 */
abstract class AbstractAddon implements AdminVueComponentInterface
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
            return strtolower(substr(ReflectionHelper::getShortName(static::class), 0, -5));
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
     * @throws \ReflectionException
     */
    public function render()
    {
        $data = $this->data;

        $this->prepareOptions($data);

        $this->prepareData($data);

        $this->prepareGlobals($data);

        static::registerPaths($this->renderer);

        return $this->renderer->render(static::getType(), $data);
    }

    /**
     * registerPaths
     *
     * @param AbstractRenderer $renderer
     *
     * @return  void
     * @throws \ReflectionException
     */
    public static function registerPaths(AbstractRenderer $renderer)
    {
        $package = LunaHelper::getPackage()->getCurrentPackage();

        $paths = $renderer->getPaths();

        $paths->insert(WINDWALKER_TEMPLATES . '/luna/addons/' . static::getType(), PriorityQueue::LOW);

        $paths->insert($package->getDir() . '/addons/' . static::getType(), PriorityQueue::LOW);

        $paths->insert(
            dirname(ReflectionHelper::getPath(static::class)) . '/Templates',
            PriorityQueue::LOW
        );
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
     * prepareOptions
     *
     * @param DataInterface $data
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareOptions(DataInterface $data)
    {
        /**
         * @var Structure      $options
         * @var StyleContainer $styles
         * @var array          $classes
         * @var array          $attrs
         */
        $styles = $data->styles;

        if ($this instanceof HasOwnStyleInterface) {
            $options = $data->options;
            $classes = $data->classes;
            $attrs   = $data->attrs;

            $this->prepareCSS($options, $styles);
            $this->prepareElement($options, $classes, $attrs);

            $data->classes = $classes;
            $data->attrs   = $attrs;
        }

        Asset::internalCSS($styles->render());
    }

    /**
     * getVueComponentName
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public static function getVueComponentName()
    {
        return 'addon-' . static::getType();
    }

    /**
     * getForm
     *
     * @param array $data
     *
     * @return string
     * @throws \ReflectionException
     */
    public static function getVueComponentTemplate(array $data = [])
    {
        $renderer = RendererHelper::getRenderer('edge');

        static::registerPaths($renderer);

        return $renderer->render('form', $data);
    }

    /**
     * Method to get property Name
     *
     * @return  string
     */
    public static function getName()
    {
        if (static::$name === null) {
            PhoenixScript::translate(static::$langPrefix . 'addon.' . static::getType() . '.name');

            return __(static::$langPrefix . 'addon.' . static::getType() . '.name');
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
            PhoenixScript::translate(static::$langPrefix . 'addon.' . static::getType() . '.desc');

            return __(static::$langPrefix . 'addon.' . static::getType() . '.desc');
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

        $globals['addon']   = $this;
        $globals['router']  = $package->router;
        $globals['package'] = PackageHelper::getCurrentPackage();

        $data->bind($globals);
    }

    /**
     * getDir
     *
     * @return  string
     * @throws \ReflectionException
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
