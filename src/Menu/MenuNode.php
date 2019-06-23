<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu;

use Lyrasoft\Luna\Admin\Record\Columns\MenuDataInterface;
use Lyrasoft\Luna\Tree\Node;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Data\Data;

/**
 * The MenuNode class.
 *
 * @since  __DEPLOY_VERSION__
 */
class MenuNode extends Node
{
    /**
     * Property instance.
     *
     * @var AbstractMenuView
     */
    protected $viewInstance;

    /**
     * Set the value of the current node
     *
     * @param MenuDataInterface $value
     *
     * @return static the current instance
     */
    public function setValue($value)
    {
        if ($value instanceof Data) {
            if (!is_array($value->variables)) {
                $value->variables = (array) json_decode($value->variables, true);
            }

            if (!is_array($value->params)) {
                $value->params = (array) json_decode($value->params, true);
            }
        }

        return parent::setValue($value);
    }

    /**
     * Method to get property ViewInstance
     *
     * @return  AbstractMenuView
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getViewInstance(): AbstractMenuView
    {
        return $this->viewInstance;
    }

    /**
     * Method to set property viewInstance
     *
     * @param AbstractMenuView $viewInstance
     *
     * @return  static  Return self to support chaining.
     *
     * @since  __DEPLOY_VERSION__
     */
    public function setViewInstance(AbstractMenuView $viewInstance)
    {
        $this->viewInstance = $viewInstance;

        return $this;
    }

    /**
     * route
     *
     * @param RouteBuilderInterface $router
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function route(RouteBuilderInterface $router): string
    {
        return $this->getViewInstance()->route(
            $router,
            $this->getValue()->variables,
            $this->getValue()->params
        );
    }

    /**
     * isActive
     *
     * @param bool $checkChildren
     *
     * @return  bool
     *
     * @since  __DEPLOY_VERSION__
     */
    public function isActive(bool $checkChildren = false): bool
    {
        $active = $this->getViewInstance()->isActive(
            $this->getValue()->variables,
            $this->getValue()->params
        );

        if (!$active && $checkChildren) {
            /** @var MenuNode $child */
            foreach ($this->getChildren() as $child) {
                if ($active = $child->isActive(true)) {
                    break;
                }
            }
        }

        return $active;
    }

    /**
     * render
     *
     * @return  string
     *
     * @since  __DEPLOY_VERSION__
     */
    public function render(): string
    {
        $instance = $this->getViewInstance();

        if (!$instance instanceof SelfRenderMenuInterface) {
            return '';
        }

        return $instance->render(
            $this,
            $this->getValue()->variables,
            $this->getValue()->params
        );
    }

    /**
     * getMenuById
     *
     * @param int $id
     *
     * @return  MenuNode|null
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getMenuById(int $id): ?MenuNode
    {
        return $this->findFirst(function (self $item) use ($id) {
            return (int) $item->getValue()->id === $id;
        });
    }

    /**
     * find
     *
     * @param callable $callback
     *
     * @return  MenuNode|null
     *
     * @since  __DEPLOY_VERSION__
     */
    public function findFirst(callable $callback): ?MenuNode
    {
        /** @var MenuNode $item */
        foreach ($this as $item) {
            if ($callback($item)) {
                return $item;
            }
        }

        return null;
    }
}
