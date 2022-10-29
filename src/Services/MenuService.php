<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Services;

use DomainException;
use Lyrasoft\Luna\Entity\Menu;
use Lyrasoft\Luna\Locale\LocaleAwareTrait;
use Lyrasoft\Luna\Menu\AbstractMenuView;
use Lyrasoft\Luna\Menu\MenuBuilder;
use Lyrasoft\Luna\Menu\Tree\DbMenuNode;
use Lyrasoft\Luna\Menu\Tree\MenuNode;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\NodeInterface;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Psr\Cache\InvalidArgumentException;
use ReflectionException;
use Unicorn\Enum\BasicState;
use Unicorn\Selector\ListSelector;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Data\Collection;
use Windwalker\DI\Exception\DependencyResolutionException;
use Windwalker\ORM\ORM;
use Windwalker\ORM\SelectorQuery;
use Windwalker\Query\Query;
use Windwalker\Utilities\Arr;
use Windwalker\Utilities\Cache\InstanceCacheTrait;

/**
 * The MenuService class.
 */
class MenuService
{
    use InstanceCacheTrait;
    use TranslatorTrait;
    use LocaleAwareTrait;

    public function __construct(
        protected ApplicationInterface $app,
        protected ORM $orm
    ) {
    }

    public function createBuilder(string $name): MenuBuilder
    {
        return $this->app->make(MenuBuilder::class)->createTree($name);
    }

    /**
     * createTree
     *
     * @param  iterable<Menu>  $menus
     *
     * @return  DbMenuNode|DbMenuNode[]
     */
    public static function createTree(iterable $menus): NodeInterface
    {
        if ($menus instanceof Query || $menus instanceof ListSelector) {
            $menus->setDefaultItemClass(Menu::class);
        }

        return TreeBuilder::create(
            $menus,
            'id',
            'parentId',
            DbMenuNode::class
        );
    }

    public function loadMenuFromFile(string $name, string|array $path): MenuNode
    {
        return $this->createBuilder($name)->load($path)->getTree();
    }

    /**
     * getViews
     *
     * @param  bool  $group
     *
     * @return  array
     *
     * @throws InvalidArgumentException
     * @since  1.7
     */
    public function getViews(bool $group = false): array
    {
        return $this->once('views.group:' . (int) $group, function () use ($group) {
            $views = (array) $this->app->config('menu.views');

            $classes = [];

            /** @var class-string<AbstractMenuView> $view */
            foreach ($views as $view) {
                if ($view && class_exists($view)) {
                    if ($group) {
                        $classes[$view::getGroup()][$view::getName()] = $view;
                    } else {
                        $classes[$view::getName()] = $view;
                    }
                }
            }

            return $classes;
        });
    }

    /**
     * getViewInstance
     *
     * @param  string  $name
     *
     * @return  AbstractMenuView|null
     *
     * @throws ReflectionException
     * @throws DependencyResolutionException
     * @throws InvalidArgumentException
     *
     * @since  1.7
     */
    public function getViewInstance(string $name): ?AbstractMenuView
    {
        $class = $this->getViews()[$name] ?? null;

        if (!$class) {
            return null;
        }

        return $this->app->make($class);
    }

    /**
     * getMenuTypes
     *
     * @return  array
     *
     * @since  1.7
     */
    public function getMenuTypes(): array
    {
        $items = $this->orm->select()
            ->selectRaw('DISTINCT type')
            ->from(Menu::class)
            ->where('type', '!=', '')
            ->order('type')
            ->loadColumn()
            ->dump();

        $items = array_combine($items, $items);

        $types = $this->app->config('menu.types');

        foreach ((array) $types as $type => $name) {
            if (is_numeric($type)) {
                $type = $name;
            }

            $items[$type] = $name;
        }

        ksort($items);

        $options = [];

        foreach ($items as $k => $n) {
            $title = $this->trans($n);
            $name = $k === $n ? $n : $k . ' (' . $this->trans($n) . ')';

            $options[$k] = [
                'title' => $title,
                'name' => $name,
                'type' => $k,
            ];
        }

        return $options;
    }

    /**
     * getMenusTree
     *
     * @param  string    $type
     * @param  bool      $onlyAvailable
     * @param  int|Menu  $parent
     *
     * @return  DbMenuNode|DbMenuNode[]
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     * @since  1.7
     */
    public function getMenusTree(string $type, bool $onlyAvailable = true, int|Menu $parent = 1): Node
    {
        return $this->once(
            'menu.tree:' . sha1(json_encode(get_defined_vars())),
            fn() => $this->buildTree($this->getMenus($type, $onlyAvailable, $parent))
        );
    }

    /**
     * Build custom menu tree.
     *
     * ```php
     * $menuService->buildTree(
     *      $menuService->createSelectQuery('mainmenu', false)
     *          ->where(...)
     * );
     * ```
     *
     * @param  iterable<Menu>  $menus
     *
     * @return  Node
     *
     * @throws DependencyResolutionException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function buildTree(iterable $menus): Node
    {


        $node = static::createTree($menus);

        /** @var DbMenuNode $menuNode */
        foreach ($node->iterate() as $menuNode) {
            if (!$instance = $this->getViewInstance($menuNode->getValue()->getView())) {
                throw new DomainException(
                    sprintf(
                        'Menu View: %s not found',
                        $menuNode->getValue()->view
                    )
                );
            }

            $menuNode->setViewInstance($instance);
        }

        return $node;
    }

    /**
     * getAllMenusTree
     *
     * @return  DbMenuNode[]
     *
     * @throws InvalidArgumentException
     *
     * @since  1.7.6
     */
    public function getAllMenusTree(): array
    {
        return $this->once('all.menus', function () {
            $types = $this->orm->select()
                ->selectRaw('DISTINCT type')
                ->from(Menu::class)
                ->loadColumn();

            $trees = [];

            foreach ($types as $type) {
                if (!$type) {
                    continue;
                }

                $trees[$type] = $this->getMenusTree($type);
            }

            return $trees;
        });
    }

    /**
     * getMenus
     *
     * @param  string      $type
     * @param  bool        $onlyAvailable
     * @param  int|object  $parent
     *
     * @return  Collection
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     * @since  1.7
     */
    public function getMenus(string $type, bool $onlyAvailable = true, int|Menu $parent = 1): Collection
    {
        return $this->createSelectQuery($type, $onlyAvailable, $parent)->all(Menu::class);
    }

    /**
     * createSelectQuery
     *
     * @param  string      $type
     * @param  bool        $onlyAvailable
     * @param  int|object  $parent
     *
     * @return  SelectorQuery
     *
     * @since  1.7
     */
    public function createSelectQuery(
        string $type,
        bool $onlyAvailable = true,
        int|Menu $parent = 1
    ): SelectorQuery {
        $query = $this->orm->from(Menu::class)
            ->where('type', $type)
            ->order('lft', 'ASC');

        if ($onlyAvailable) {
            $query->where('state', BasicState::PUBLISHED());

            if ($this->isLocaleEnabled()) {
                $query->where('state', $this->getLocale());
            }
        }

        if (!is_object($parent)) {
            $parent = $this->orm->findOne(Menu::class, $parent);
        }

        $query->where('lft', '>=', $parent->getLft())
            ->where('rgt', '<=', $parent->getRgt());

        return $query;
    }

    /**
     * getActiveMenu
     *
     * @param  string  $type
     *
     * @return  DbMenuNode|null
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     *
     * @since  1.7.6
     */
    public function getActiveMenu(?string $type = null): ?DbMenuNode
    {
        if ($type) {
            return $this->getMenusTree($type)->getActive();
        }

        $trees = $this->getAllMenusTree();

        foreach ($trees as $menus) {
            if ($menu = $menus->getActive()) {
                return $menu;
            }
        }

        return null;
    }

    /**
     * findMenu
     *
     * @param  callable  $callback
     *
     * @return  DbMenuNode|null
     *
     * @throws InvalidArgumentException
     *
     * @since  1.7.6
     */
    public function findMenu(callable $callback): ?DbMenuNode
    {
        foreach ($this->getAllMenusTree() as $tree) {
            if ($menu = $tree->findFirst($callback)) {
                return $menu;
            }
        }

        return null;
    }

    /**
     * each
     *
     * @param  callable     $callback
     * @param  string|null  $type
     *
     * @return  static
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     *
     * @since  1.7.12
     */
    public function each(callable $callback, ?string $type = null): self
    {
        if ($type) {
            $menus = [$this->getMenusTree($type)];
        } else {
            $menus = $this->getAllMenusTree();
        }

        foreach ($menus as $tree) {
            foreach ($tree as $menu) {
                $callback($menu);
            }
        }

        return $this;
    }

    /**
     * If there are no current active menu, find a menu to make it active.
     *
     * @param  string  $view
     * @param  array   $conditions
     *
     * @return  MenuService
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     *
     * @since  1.7.12
     */
    public function forceActiveIfNoExists(string $view, array $conditions = []): self
    {
        $active = $this->getActiveMenu();

        if ($active) {
            return $this;
        }

        $conditions = Arr::flatten($conditions);

        $this->each(function (DbMenuNode $menuNode) use ($view, $conditions) {
            if (
                $menuNode->getValue()->getView() === $view
                && array_intersect(Arr::flatten($menuNode->getValue()->getVariables()), $conditions) === $conditions
            ) {
                $menuNode->forceActive(true);
            }
        });

        return $this;
    }

    /**
     * forceActiveMenu
     *
     * @param  string  $view
     * @param  array   $variablesQuery
     * @param  bool    $onlyFirst
     *
     * @return  static
     *
     * @throws InvalidArgumentException
     *
     * @since  1.7.6
     */
    public function forceMenuActive(string $view, array $variablesQuery = [], bool $onlyFirst = true): self
    {
        $this->findMenu(static function (DbMenuNode $menuNode) use ($view, $variablesQuery, $onlyFirst) {
            if ($menuNode->is($view, $variablesQuery)) {
                $menuNode->forceActive(true);

                if ($onlyFirst) {
                    return true;
                }
            }

            return false;
        });

        return $this;
    }

    /**
     * renderMenu
     *
     * @param  DbMenuNode|string  $menus   MenuNode of menu type name.
     * @param  array              $data    Some configure settings date.
     *                                     - vertical: (bool) Vertical menu with flex-column class
     *                                     - dropdown: (bool) Top navbar doprdown menu.
     *                                     - fade: (bool) Fade in-out submenu. (Only for dropdown)
     *                                     - click: (bool) Click show submenu, otherwise will be hover. (Only for
     *                                     dropdown)
     *                                     - level: (int) Firset level number, default is 1.
     * @param  string             $layout  Layout parh.
     *
     * @return  string
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     *
     * @since  1.7.6
     */
    public function renderMenu(DbMenuNode|string $menus, array $data = [], string $layout = 'luna.menu.nav'): string
    {
        if (is_string($menus)) {
            $menus = $this->getMenusTree($menus);
        }

        $data['menus'] = $menus;

        return WidgetHelper::render(
            $layout,
            $data,
            'edge'
        );
    }

    /**
     * renderMenuItems
     *
     * @param  DbMenuNode|string  $menus   MenuNode of menu type name.
     * @param  array              $data    Some configure settings date.
     *                                     - vertical: (bool) Vertical menu with flex-column class
     *                                     - dropdown: (bool) Top navbar doprdown menu.
     *                                     - fade: (bool) Fade in-out submenu. (Only for dropdown)
     *                                     - click: (bool) Click show submenu, otherwise will be hover. (Only for
     *                                     dropdown)
     *                                     - level: (int) Firset level number, default is 1.
     * @param  string             $layout  Layout parh.
     *
     * @return  string
     *
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws DependencyResolutionException
     * @since  1.7
     */
    public function renderMenuItems($menus, array $data = [], string $layout = 'luna.menu.menu-items'): string
    {
        if (is_string($menus)) {
            $menus = $this->getMenusTree($menus);
        }

        $data['menus'] = $menus;

        return $this->app->service(RendererService::class)
            ->render(
                $layout,
                $data
            );
    }

    /**
     * registerMenuStyles
     *
     * @return  static
     *
     * @since  1.7.6
     */
    public function registerMenuStyles(): self
    {
        BootstrapScript::multiLevelMenu();

        return $this;
    }
}
