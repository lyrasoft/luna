<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Menu;

use Psr\Http\Message\UriInterface;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Event\EventAwareInterface;
use Windwalker\Event\EventAwareTrait;
use Windwalker\Form\FieldDefinitionInterface;
use Windwalker\Form\Form;
use Windwalker\Utilities\Contract\LanguageInterface;

/**
 * The AbstractView class.
 *
 * @since  1.7
 */
abstract class AbstractMenuView implements
    FieldDefinitionInterface,
    EventAwareInterface
{
    use EventAwareTrait;

    public const NO_LINK = '__NO_LINK__';

    /**
     * Property tabs.
     *
     * @var array
     */
    protected array $tabs = [];

    #[Inject]
    protected MenuHelper $menuHelper;

    /**
     * getName
     *
     * @return  string
     *
     * @since  1.7
     */
    abstract public static function getName(): string;

    /**
     * getTitle
     *
     * @return  string
     *
     * @since  1.7
     */
    public static function getTitle(LanguageInterface $lang): string
    {
        return $lang->trans('luna.menu.view.' . static::getName() . '.title');
    }

    /**
     * getDescription
     *
     * @return  string
     *
     * @since  1.7
     */
    public static function getDescription(LanguageInterface $lang): string
    {
        return $lang->trans('luna.menu.view.' . static::getName() . '.desc');
    }

    /**
     * getGroup
     *
     * @return  string
     *
     * @since  1.7
     */
    public static function getGroup(): string
    {
        return 'core';
    }

    /**
     * Define the form fields.
     *
     * @param  Form  $form  The Windwalker form object.
     *
     * @return  void
     */
    public function define(Form $form): void
    {
        $form->ns('variables', function (Form $form) {
            $this->defineVariablesForm($form);
        });

        $form->ns('params', function (Form $form) {
            $this->defineParamsForm($form);
        });

        $this->emit(
            MenuFieldDefineEvent::class,
            [
                'form' => $form,
                'menu' => $this,
            ]
        );
    }

    /**
     * defineRoute
     *
     * @param  Form  $form
     *
     * @return  void
     *
     * @since  1.7
     */
    abstract protected function defineVariablesForm(Form $form): void;

    /**
     * You must use tab('name', function () { ... }) to wrap your fields.
     *
     * @param  Form  $form
     *
     * @return  void
     *
     * @since  1.7
     */
    abstract protected function defineParamsForm(Form $form): void;

    /**
     * tab
     *
     * @param  string  $fieldset
     * @param  string  $title
     * @param  callable  $callback
     *
     * @return  static
     *
     * @since  1.7
     */
    public function tab(string $fieldset, ?string $title, callable $callback): self
    {
        if (!$title) {
            $title = $this->trans('luna.menu.view.params.fieldset.' . $fieldset);
        }

        $this->tabs[$fieldset] = [
            'title' => $title,
        ];

        $this->fieldset($fieldset, $callback);

        return $this;
    }

    /**
     * Method to get property Tabs
     *
     * @return  array
     *
     * @since  1.7
     */
    public function getTabs(): array
    {
        return $this->tabs;
    }

    /**
     * prepareVariablesStore
     *
     * @param  array  $variables
     *
     * @return  void
     *
     * @since  1.7
     */
    public function prepareVariablesForm(array &$variables): void
    {
        //
    }

    /**
     * prepareVariablesStore
     *
     * @param  array  $variables
     *
     * @return  void
     *
     * @since  1.7
     */
    public function prepareVariablesStore(array &$variables): void
    {
        //
    }

    /**
     * route
     *
     * @param  Navigator  $nav
     * @param  array      $variables
     * @param  array      $params
     *
     * @return  UriInterface
     *
     * @since  1.7
     */
    abstract public function route(Navigator $nav, array $variables, array $params): UriInterface;

    /**
     * isActive
     *
     * @param  array  $variables
     * @param  array  $params
     *
     * @return  bool
     *
     * @since  1.7
     */
    abstract public function isActive(array $variables, array $params): bool;
}
