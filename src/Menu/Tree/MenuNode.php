<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu\Tree;

use Lyrasoft\Luna\Enum\MenuTarget;
use Lyrasoft\Luna\Tree\Node;
use Psr\Http\Message\UriInterface;
use Unicorn\Legacy\Html\MenuHelper;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\Route;
use Windwalker\Core\Router\RouteUri;
use Windwalker\DI\Attributes\Inject;
use Windwalker\DOM\DOMElement;
use Windwalker\Uri\Uri;

/**
 * The MenuNode class.
 */
class MenuNode extends Node implements MenuNodeInterface
{
    protected string $title = '';

    protected ?UriInterface $link = null;

    protected bool $hidden = false;

    protected ?MenuTarget $target = null;

    protected string $layout = 'link.link';

    protected ?DOMElement $element = null;

    protected ?bool $forceActive = null;

    #[Inject]
    protected MenuHelper $menuHelper;

    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @inheritDoc
     */
    public function route(Navigator $nav): ?UriInterface
    {
        return $this->getLink();
    }

    /**
     * @inheritDoc
     */
    public function isActive(bool $checkChildren = false): bool
    {
        if ($this->forceActive !== null) {
            return $this->forceActive;
        }

        $uri = $this->getLink();
        $ns = $this->getRoot()?->getTitle() ?? '';

        $active = false;

        if ($uri instanceof RouteUri) {
            /** @var Route $route */
            [, $vars, $route] = $uri->getHandledData();

            $active = $this->menuHelper->is($route->getName(), $vars, $ns);
        }

        if (!$active && $checkChildren) {
            /** @var static $child */
            foreach ($this->getChildren() as $child) {
                if ($active = $child->isActive(true)) {
                    break;
                }
            }
        }

        return $active;
    }

    /**
     * @inheritDoc
     */
    public function findFirst(callable $callback): ?static
    {
        /** @var static $item */
        foreach ($this as $item) {
            if ($callback($item)) {
                return $item;
            }
        }

        return null;
    }

    /**
     * @inheritDoc
     */
    public function getActive(): ?static
    {
        return $this->findFirst(static function (self $menuNode) {
            return $menuNode->isActive();
        });
    }

    /**
     * @inheritDoc
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
     * @inheritDoc
     */
    public function forceActive(?bool $active): static
    {
        $this->forceActive = $active;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function is(string $view, array $variablesQuery = []): bool
    {
        $ns = $this->getRoot()?->getTitle() ?? '';

        return $this->menuHelper->is($view, $variablesQuery, $ns);
    }

    /**
     * @inheritDoc
     */
    public function isHidden(): bool
    {
        return $this->hidden;
    }

    /**
     * @param  string  $title
     *
     * @return  static  Return self to support chaining.
     */
    public function title(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return UriInterface|null
     */
    public function getLink(): ?UriInterface
    {
        return $this->link;
    }

    /**
     * @param  UriInterface|string|null  $link
     *
     * @return  static  Return self to support chaining.
     */
    public function link(UriInterface|string|null $link): static
    {
        if (is_string($link)) {
            $link = new Uri($link);
        }

        $this->link = $link;

        return $this;
    }

    /**
     * @param  bool  $hidden
     *
     * @return  static  Return self to support chaining.
     */
    public function hidden(bool $hidden): static
    {
        $this->hidden = $hidden;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function getTarget(): MenuTarget
    {
        return $this->target ??= MenuTarget::SELF();
    }

    public function linkTarget(MenuTarget $target): static
    {
        $this->target = $target;

        return $this;
    }

    /**
     * @param  array  $merge  *
     * @inheritDoc
     */
    public function getHTMLAttributes(array $merge = []): array
    {
        $attrs = [
            'data-menu-id' => ''
        ];

        return array_merge(
            $this->getElement()->getAttributes(true),
            $attrs,
            $merge
        );
    }

    public function getElement(): DOMElement
    {
        return $this->element ??= new DOMElement();
    }

    public function attr(string $name, string $value): static
    {
        $this->getElement()->setAttribute($name, $value);

        return $this;
    }

    public function addClass(string $class): static
    {
        $this->getElement()->addClass($class);

        return $this;
    }

    /**
     * @return string
     */
    public function getLayout(): string
    {
        return $this->layout;
    }

    /**
     * @param  string  $layout
     *
     * @return  static  Return self to support chaining.
     */
    public function setLayout(string $layout): static
    {
        $this->layout = $layout;

        return $this;
    }
}
