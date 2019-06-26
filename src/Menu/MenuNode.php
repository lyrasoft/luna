<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu;

use Lyrasoft\Luna\Admin\Record\Columns\MenuDataInterface;
use Lyrasoft\Luna\Admin\Record\MenuRecord;
use Lyrasoft\Luna\Tree\Node;
use Windwalker\Core\Router\RouteBuilderInterface;
use Windwalker\Data\Data;
use Windwalker\Utilities\Arr;

/**
 * The MenuNode class.
 *
 * @method MenuRecord getValue()
 *
 * @since  1.7
 */
class MenuNode extends Node
{
    /**
     * Property value.
     *
     * @var MenuRecord
     */
    protected $value;

    /**
     * Property instance.
     *
     * @var AbstractMenuView
     */
    protected $viewInstance;

    /**
     * Property active.
     *
     * @var bool|null
     */
    protected $forceActive;

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
     * @since  1.7
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
     * @since  1.7
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
     * @since  1.7
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
     * @since  1.7
     */
    public function isActive(bool $checkChildren = false): bool
    {
        if ($this->forceActive !== null) {
            return $this->forceActive;
        }

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
     * @param array $params
     *
     * @return  string
     *
     * @since  1.7
     */
//    public function render(array $params = []): string
//    {
//        $instance = $this->getViewInstance();
//
//        if (!$instance instanceof SelfRenderMenuInterface) {
//            return '';
//        }
//
//        return $instance->render(
//            $this,
//            $this->getValue()->variables,
//            Arr::mergeRecursive(
//                $this->getValue()->params,
//                $params
//            )
//        );
//    }

    /**
     * getMenuById
     *
     * @param int $id
     *
     * @return  MenuNode|null
     *
     * @since  1.7
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
     * @since  1.7
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

    /**
     * getActive
     *
     * @return  MenuNode|null
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getActive(): ?MenuNode
    {
        return $this->findFirst(function (MenuNode $menuNode) {
            return $menuNode->isActive();
        });
    }

    /**
     * hasVisibleChildren
     *
     * @return  bool
     *
     * @since  __DEPLOY_VERSION__
     */
    public function hasVisibleChildren(): bool
    {
        foreach ($this->getChildren() as $child) {
            if (!$child->getValue()->hidden) {
                return true;
            }
        }

        return false;
    }

    /**
     * foraceActive
     *
     * @param bool|null $active
     *
     * @return  MenuNode
     *
     * @since  __DEPLOY_VERSION__
     */
    public function forceActive(?bool $active): self
    {
        $this->forceActive = $active;

        return $this;
    }
}
