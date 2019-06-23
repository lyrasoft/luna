<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu\View;

use Windwalker\Core\Event\EventDispatcher;
use Windwalker\Core\Form\CoreFieldDefinitionInterface;
use Windwalker\Core\Form\CoreFieldDefinitionTrait;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Core\Router\RouteString;
use Windwalker\DI\Annotation\Inject;
use Windwalker\Event\DispatcherAwareTrait;
use Windwalker\Event\DispatcherInterface;
use Windwalker\Form\Form;

/**
 * The AbstractView class.
 *
 * @since  __DEPLOY_VERSION__
 */
abstract class AbstractMenuView implements
    CoreFieldDefinitionInterface,
    DispatcherInterface
{
    use CoreFieldDefinitionTrait;
    use DispatcherAwareTrait;

    /**
     * Property tabs.
     *
     * @var array
     */
    protected $tabs = [];

    /**
     * Property dispatcher.
     *
     * @Inject()
     *
     * @var EventDispatcher
     */
    protected $dispatcher;

    /**
     * getName
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract public static function getName(): string;

    /**
     * getTitle
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function getTitle(): string
    {
        return __('luna.menu.view.' . static::getName() . '.title');
    }

    /**
     * getDescription
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function getDescription(): string
    {
        return __('luna.menu.view.' . static::getName() . '.desc');
    }

    /**
     * getGroup
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public static function getGroup(): string
    {
        return 'core';
    }

    /**
     * route
     *
     * @param RouteBuilderInterface $router
     * @param array                 $variables
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract public function route(RouteBuilderInterface $router, array $variables): string;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     */
    protected function doDefine(Form $form)
    {
        $this->group('variables', function (Form $form) {
            $this->defineView($form);
        });

        $this->group('params', function (Form $form) {
            $this->defineParams($form);
        });

        $this->triggerEvent('onMenuDefineFormField', [
            'form' => $form,
            'menu' => $this
        ]);
    }

    /**
     * defineRoute
     *
     * @param Form $form
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract protected function defineView(Form $form): void;

    /**
     * You must use tab('name', funcstion () { ... }) to wrap your fields.
     *
     * @param Form $form
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    abstract protected function defineParams(Form $form): void;

    /**
     * tab
     *
     * @param string   $fieldset
     * @param string   $title
     * @param callable $callback
     *
     * @return  static
     *
     * @since  __DEPLOY_VERSION__
     */
    public function tab(string $fieldset, ?string $title, callable $callback): self
    {
        if (!$title) {
            $title = __('luna.menu.view.params.fieldset.' . $fieldset);
        }

        $this->tabs[$fieldset] = [
            'title' => $title
        ];

        $this->fieldset($fieldset, $callback);

        return $this;
    }

    /**
     * Method to get property Tabs
     *
     * @return  array
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getTabs(): array
    {
        return $this->tabs;
    }

    /**
     * prepareVariablesStore
     *
     * @param array $variables
     *
     * @return  void
     *
     * @since  __DEPLOY_VERSION__
     */
    public function prepareVariablesStore(array &$variables): void
    {
        //
    }
}
