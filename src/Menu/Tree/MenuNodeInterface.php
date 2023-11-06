<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\Tree;

use Lyrasoft\Luna\Enum\MenuTarget;
use Lyrasoft\Luna\Tree\NodeInterface;
use Psr\Http\Message\UriInterface;
use Windwalker\Core\Router\Navigator;

/**
 * Interface MenuNodeInterface
 *
 * @method MenuNodeInterface[] getChildren
 */
interface MenuNodeInterface extends NodeInterface
{
    /**
     * getTitle
     *
     * @return  string
     */
    public function getTitle(): string;

    /**
     * getIcon
     *
     * @return  string
     */
    public function getIcon(): string;

    /**
     * getTarget
     *
     * @return  MenuTarget
     */
    public function getTarget(): MenuTarget;

    /**
     * getHTMLAttributes
     *
     * @param  array  $merge  *
     *
     * @return  array
     */
    public function getHTMLAttributes(array $merge = []): array;

    /**
     * route
     *
     * @param  Navigator  $nav
     *
     * @return  ?UriInterface
     *
     * @since  1.7
     */
    public function route(Navigator $nav): ?UriInterface;

    /**
     * isActive
     *
     * @param  bool  $checkChildren
     *
     * @return  bool
     *
     * @since  1.7
     */
    public function isActive(bool $checkChildren = false): bool;

    /**
     * find
     *
     * @param  callable  $callback
     *
     * @return  static|null
     *
     * @since  1.7
     */
    public function findFirst(callable $callback): ?static;

    /**
     * getActive
     *
     * @return  static|null
     *
     * @since  1.7.6
     */
    public function getActive(): ?static;

    /**
     * hasVisibleChildren
     *
     * @return  bool
     *
     * @since  1.7.6
     */
    public function hasVisibleChildren(): bool;

    /**
     * foraceActive
     *
     * @param  bool|null  $active
     *
     * @return  static
     *
     * @since  1.7.6
     */
    public function forceActive(?bool $active): static;

    /**
     * is
     *
     * @param  string  $view
     * @param  array   $variablesQuery
     *
     * @return  bool
     *
     * @since  1.7.6
     */
    public function is(string $view, array $variablesQuery = []): bool;

    /**
     * isHidden
     *
     * @return  bool
     */
    public function isHidden(): bool;
}
