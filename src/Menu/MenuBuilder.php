<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Menu;

use Lyrasoft\Luna\Menu\Tree\MenuNode;
use Lyrasoft\Luna\Menu\Tree\MenuNodeInterface;
use Lyrasoft\Luna\Tree\NodeInterface;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Router\RouteUri;
use Windwalker\Filesystem\Filesystem;

/**
 * The MenuBuilder class.
 */
class MenuBuilder
{
    use TranslatorTrait;

    protected MenuNode $root;

    protected ?MenuNodeInterface $current;

    protected ?MenuNodeInterface $last;

    /**
     * @var array<MenuNodeInterface>
     */
    protected array $stack = [];

    public function __construct(protected AppContext $app)
    {
        //
    }

    public function createTree(string $name): static
    {
        $root = $this->app->make(MenuNode::class)
            ->title($name);

        $this->root = $root;
        $this->current = $root;
        $this->stack[] = $root;

        return $this;
    }

    /**
     * createNode
     *
     * @template T
     *
     * @param  T  $className
     *
     * @return  T|MenuNode
     */
    public function createNode(string $className = MenuNode::class): MenuNodeInterface
    {
        return $this->app->make($className);
    }

    protected function createNodeAndSetCurrent(string $layout = 'link.link'): MenuNode
    {
        $node = $this->createNode();
        $node->setLayout($layout);

        $this->current->addChild($node);
        $this->last = $node;

        return $node;
    }

    /**
     * add
     *
     * @param  string  $title
     * @param  mixed   $uri
     *
     * @return  MenuNode
     * @throws \ReflectionException
     */
    public function add(string $title, mixed $uri = null): MenuNode
    {
        if ($uri instanceof \Closure) {
            $uri = $this->app->call($uri);
        }

        $node = $this->createNodeAndSetCurrent();
        $node->title($title);

        if ($uri !== null) {
            $node->link($uri);
        }

        return $node;
    }
    
    public function link(string $title, mixed $uri = null): MenuNode
    {
        return $this->add($title, $uri);
    }

    public function divider(): MenuNode
    {
        return $this->createNodeAndSetCurrent('placeholder.divider');
    }

    public function header(string $title): MenuNode
    {
        return $this->createNodeAndSetCurrent('placeholder.header')
            ->title($title);
    }

    public function text(string $text): MenuNode
    {
        return $this->createNodeAndSetCurrent('placeholder.text')
            ->title($text);
    }

    /**
     * addNode
     *
     * @template T
     *
     * @param  MenuNodeInterface|T  $node
     *
     * @return  MenuNodeInterface|T
     */
    public function addNode(MenuNodeInterface $node): MenuNodeInterface
    {
        $this->current->addChild($node);
        $this->last = $node;

        return $node;
    }

    public function load(array|string $path): static
    {
        $paths = (array) $path;

        $files = Filesystem::globAll($paths);

        $navOptions = RouteUri::MODE_MUTE;

        if ($this->app->isDebug()) {
            $navOptions |= RouteUri::DEBUG_ALERT;
        }

        $menu = $this;
        $app  = $this->app;
        $nav  = $app->service(Navigator::class)->withOptions($navOptions);
        $lang = $this->lang;

        foreach ($files as $file) {
            include $file->getPathname();
        }

        return $this;
    }

    public function registerChildren(callable $callback): static
    {
        $this->stack[] = $this->current;

        $this->current = $this->last;

        $callback($this);

        $this->current = array_pop($this->stack);

        return $this;
    }

    public function registerChildrenFor(MenuNodeInterface $node, callable $callback): static
    {
        $this->stack[] = $this->current;

        $this->current = $node;

        $callback($this);

        $this->current = array_pop($this->stack);

        return $this;
    }

    public function fromTree(NodeInterface|iterable $node, callable $callback): void
    {
        $children = $node instanceof NodeInterface ? $node->getChildren() : $node;

        foreach ($children as $child) {
            $callback($child, $this);

            $this->registerChildren(
                function (MenuBuilder $menu) use ($callback, $child) {
                    $menu->fromTree($child, $callback);
                }
            );
        }
    }

    /**
     * @return MenuNode|null
     */
    public function getRoot(): ?MenuNode
    {
        return $this->root;
    }

    /**
     * @param  MenuNode|null  $root
     *
     * @return  static  Return self to support chaining.
     */
    public function setRoot(?MenuNode $root): static
    {
        $this->root = $root;

        return $this;
    }

    /**
     * @return MenuNodeInterface|null
     */
    public function getCurrent(): ?MenuNodeInterface
    {
        return $this->current;
    }

    /**
     * @param  MenuNodeInterface|null  $current
     *
     * @return  static  Return self to support chaining.
     */
    public function setCurrent(?MenuNodeInterface $current): static
    {
        $this->current = $current;

        return $this;
    }

    /**
     * @return MenuNodeInterface|null
     */
    public function getLast(): ?MenuNodeInterface
    {
        return $this->last;
    }

    public function getTree(): MenuNode
    {
        return $this->getRoot();
    }
}
