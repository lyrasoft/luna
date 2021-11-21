<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Menu\Tree;

use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Enum\MenuTarget;
use Lyrasoft\Luna\Menu\AbstractMenuView;
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
class DbMenuNode extends Node implements MenuNodeInterface
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
     * @var AbstractMenuView|null
     */
    protected ?AbstractMenuView $viewInstance;

    /**
     * Property active.
     *
     * @var bool|null
     */
    protected bool|null $forceActive = null;

    /**
     * @inheritDoc
     */
    public function __construct(mixed $value = null, array $children = [])
    {
        $value ??= new Menu();

        parent::__construct($value, $children);
    }

    /**
     * @inheritDoc
     */
    public function getIcon(): string
    {
        return $this->getValue()?->getImage();
    }

    public function getTitle(): string
    {
        return $this->getValue()?->getTitle() ?? '';
    }

    /**
     * @inheritDoc
     */
    public function setValue(mixed $value): static
    {
        TypeAssert::assert(
            $value instanceof Menu,
            '{caller} must set ' . Menu::class . ' as value, {value} given.',
            $value
        );

        return parent::setValue($value);
    }

    /**
     * Method to get property ViewInstance
     *
     * @return  ?AbstractMenuView
     *
     * @since  1.7
     */
    public function getViewInstance(): ?AbstractMenuView
    {
        return $this->viewInstance;
    }

    /**
     * Method to set property viewInstance
     *
     * @param  AbstractMenuView|null  $viewInstance
     *
     * @return  static  Return self to support chaining.
     *
     * @since  1.7
     */
    public function setViewInstance(?AbstractMenuView $viewInstance): static
    {
        $this->viewInstance = $viewInstance;

        return $this;
    }

    /**
     * route
     *
     * @param Navigator $nav
     *
     * @return  ?UriInterface
     *
     * @since  1.7
     */
    public function route(Navigator $nav): ?UriInterface
    {
        return $this->getViewInstance()?->route(
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
            /** @var DbMenuNode $child */
            foreach ($this->getChildren() as $child) {
                if ($active = $child->isActive(true)) {
                    break;
                }
            }
        }

        return $active;
    }

    /**
     * getMenuById
     *
     * @param mixed $id
     *
     * @return  static|null
     *
     * @since  1.7
     */
    public function getMenuById(mixed $id): ?static
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
     * @return  static|null
     *
     * @since  1.7
     */
    public function findFirst(callable $callback): ?static
    {
        /** @var DbMenuNode $item */
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
     * @return  static|null
     *
     * @since  1.7.6
     */
    public function getActive(): ?static
    {
        return $this->findFirst(static function (self $menuNode) {
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
            if (!$child->isHidden()) {
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
     * @return  static
     *
     * @since  1.7.6
     */
    public function forceActive(?bool $active): static
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

        return $menu->getView() === $view && Arr::query([$menu->getVariables()], $variablesQuery) !== [];
    }

    /**
     * @inheritDoc
     */
    public function isHidden(): bool
    {
        return $this->getValue()?->isHidden() ?? true;
    }

    /**
     * @inheritDoc
     */
    public function getTarget(): MenuTarget
    {
        return $this->getValue()->getTarget();
    }

    /**
     * @param  array  $merge  To merge this.
     *
     * @inheritDoc
     */
    public function getHTMLAttributes(array $merge = []): array
    {
        return array_merge(
            [
                'data-menu-id' => $this->getValue()->getId(),
            ],
            $merge
        );
    }
}
