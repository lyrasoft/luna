<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Menu;

use App\Entity\Menu;
use Lyrasoft\Luna\Tree\Node;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Router\Navigator;
use Windwalker\Utilities\Arr;
use Windwalker\Utilities\Assert\TypeAssert;

/**
 * The MenuNode class.
 *
 * @method Menu getValue()
 *
 * @since  1.7
 */
class MenuNode extends Node
{
    /**
     * Property value.
     *
     * @var ?Menu
     */
    protected mixed $value;

    /**
     * Property instance.
     *
     * @var AbstractMenuView
     */
    protected AbstractMenuView $viewInstance;

    /**
     * Property active.
     *
     * @var bool|null
     */
    protected bool|null $forceActive;

    /**
     * @inheritDoc
     */
    public function setValue(mixed $value): static
    {
        TypeAssert::assert(
            $value instanceof Menu,
            '{caller} must set ' . Menu::class . ' as value, {value} given.'
        );

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
     * @param Navigator $router
     *
     * @return  UriInterface
     *
     * @since  1.7
     */
    public function route(Navigator $nav): UriInterface
    {
        return $this->getViewInstance()->route(
            $nav,
            $this->getValue()->getVariables(),
            $this->getValue()->getParams()
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
            $this->getValue()->getVariables(),
            $this->getValue()->getParams()
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
            return (int) $item->getValue()->getId() === $id;
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
     * @since  1.7.6
     */
    public function getActive(): ?MenuNode
    {
        return $this->findFirst(static function (MenuNode $menuNode) {
            return $menuNode->isActive();
        });
    }

    /**
     * hasVisibleChildren
     *
     * @return  bool
     *
     * @since  1.7.6
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
     * @since  1.7.6
     */
    public function forceActive(?bool $active): self
    {
        $this->forceActive = $active;

        return $this;
    }

    /**
     * is
     *
     * @param string $view
     * @param array  $variablesQuery
     *
     * @return  bool
     *
     * @since  1.7.6
     */
    public function is(string $view, array $variablesQuery = []): bool
    {
        $menu = $this->getValue();

        return $menu->view === $view && Arr::query([$menu->variables], $variablesQuery) !== [];
    }
}
