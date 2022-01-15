<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\PageBuilder;

use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\PageBuilder\Renderer\Style\StyleContainer;
use ReflectionClass;
use ReflectionException;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Renderer\CompositeRenderer;
use Windwalker\Utilities\Contract\LanguageInterface;
use Windwalker\Utilities\Iterator\PriorityQueue;

/**
 * The AbstractAddon class.
 *
 * @property  string     title
 * @property  string     content
 * @property  string     type
 * @property  string     state
 * @property  string     ordering
 * @property  string     language
 * @property  Collection params
 *
 * @since  1.0
 */
abstract class AbstractAddon implements AdminVueComponentInterface
{
    /**
     * Property name.
     *
     * @var  string|null
     */
    protected static ?string $name = null;

    /**
     * Property description.
     *
     * @var  string|null
     */
    protected static ?string $description = null;

    /**
     * Property data.
     *
     * @var  array|Collection
     */
    protected array|Collection $data;

    #[Inject]
    protected AssetService $asset;

    /**
     * AbstractModule constructor.
     *
     * @param  array  $data
     */
    public function __construct(array $data = [])
    {
        $this->data = Collection::wrap($data);
        $this->params = $this->data['params'];
    }

    /**
     * Method to get property Type
     *
     * @return  string
     */
    abstract public static function getType(): string;

    /**
     * Method to get property Icon
     *
     * @return  string
     */
    abstract public static function getIcon(): string;

    /**
     * getReflector
     *
     * @return  ReflectionClass
     */
    protected static function getReflector(): ReflectionClass
    {
        return new ReflectionClass(static::class);
    }

    /**
     * render
     *
     * @param  CompositeRenderer  $renderer
     *
     * @return  string
     * @throws ReflectionException
     */
    public function render(CompositeRenderer $renderer): string
    {
        $data = $this->data;

        $this->prepareOptions($data);

        $this->prepareData($data);

        $this->prepareGlobals($data);

        static::registerPaths($renderer);

        return $renderer->render(static::getType(), $data->dump());
    }

    /**
     * registerPaths
     *
     * @param  CompositeRenderer  $renderer
     *
     * @return  void
     * @throws ReflectionException
     */
    public static function registerPaths(CompositeRenderer $renderer): void
    {
        $paths = $renderer->getPaths();

        $paths->insert(WINDWALKER_VIEWS . '/addons/' . static::getType(), PriorityQueue::LOW);

        $paths->insert(
            dirname(static::getReflector()->getFileName()) . '/views',
            PriorityQueue::LOW
        );

        $paths->insert(WINDWALKER_SOURCE . '/Module/Front/Page/views', PriorityQueue::LOW);
        $paths->insert(LunaPackage::path('views'), PriorityQueue::LOW);
    }

    /**
     * prepareData
     *
     * @param  Collection  $data
     *
     * @return  void
     */
    abstract protected function prepareData(Collection $data): void;

    /**
     * prepareOptions
     *
     * @param  Collection  $data
     *
     * @return  void
     *
     * @since  1.5.2
     */
    protected function prepareOptions(Collection $data): void
    {
        /**
         * @var Collection     $options
         * @var StyleContainer $styles
         * @var array          $classes
         * @var array          $attrs
         */
        $styles = $data->styles;

        if ($this instanceof HasOwnStyleInterface) {
            $options = $data->options;
            $classes = $data->classes;
            $attrs = $data->attrs;

            $this->prepareCSS($options, $styles);
            $this->prepareElement($options, $classes, $attrs);

            $data->classes = $classes;
            $data->attrs = $attrs;
        }

        $this->getAsset()
            ->internalCSS($styles->render());
    }

    /**
     * getVueComponentName
     *
     * @return  string
     *
     * @since  1.5.2
     */
    public static function getVueComponentName(): string
    {
        return 'addon-' . static::getType();
    }

    /**
     * getForm
     *
     * @param  array  $data
     *
     * @return string
     * @throws ReflectionException
     */
    public static function getVueComponentTemplate(CompositeRenderer $renderer, array $data = []): string
    {
        static::registerPaths($renderer);

        if (!$renderer->has('form')) {
            return '';
        }

        return $renderer->render('form', $data);
    }

    /**
     * Method to get property Name
     *
     * @param  LanguageInterface  $lang
     *
     * @return  string
     */
    public static function getName(LanguageInterface $lang): string
    {
        return static::$name ?? $lang->trans('luna.addon.' . static::getType() . '.name');
    }

    /**
     * Method to set property name
     *
     * @param  string  $name
     *
     * @return  void
     */
    public static function setName(string $name): void
    {
        static::$name = $name;
    }

    /**
     * Method to get property Description
     *
     * @param  LanguageInterface  $lang
     *
     * @return  string
     */
    public static function getDescription(LanguageInterface $lang): string
    {
        return static::$description ?? $lang->trans('luna.addon.' . static::getType() . '.desc');
    }

    /**
     * Method to set property description
     *
     * @param  string  $description
     *
     * @return  void
     */
    public static function setDescription(string $description): void
    {
        static::$description = $description;
    }

    /**
     * Method to get property Renderer
     *
     * @return  RendererService
     */
    public function getRenderer(): RendererService
    {
        return $this->renderer;
    }

    /**
     * prepareGlobals
     *
     * @param  Collection  $data
     *
     * @return  void
     */
    protected function prepareGlobals(Collection $data): void
    {
        //
    }

    /**
     * getDir
     *
     * @return  string
     */
    public static function getDir(): string
    {
        $ref = static::getReflector();

        return dirname($ref->getFileName());
    }

    /**
     * __get
     *
     * @param  string  $name
     *
     * @return  mixed
     */
    public function __get(string $name)
    {
        return $this->data->item[$name];
    }

    /**
     * Method to get property Data
     *
     * @return  array|Collection
     */
    public function getData(): array|Collection
    {
        return $this->data;
    }

    /**
     * Method to set property data
     *
     * @param  array|Collection  $data
     *
     * @return  static  Return self to support chaining.
     */
    public function setData(array|Collection $data): static
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @return AssetService
     */
    public function getAsset(): AssetService
    {
        return $this->asset;
    }
}
