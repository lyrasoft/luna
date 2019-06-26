<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu;

use Admin\Table\Table;
use Lyrasoft\Luna\Admin\DataMapper\MenuMapper;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Repository\MenusRepository;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Phoenix\Repository\ListRepositoryInterface;
use Windwalker\Cache\Cache;
use Windwalker\Cache\Serializer\RawSerializer;
use Windwalker\Cache\Storage\ArrayStorage;
use Windwalker\Cache\Storage\RuntimeArrayStorage;
use Windwalker\Core\Cache\RuntimeCacheTrait;
use Windwalker\Core\Database\DatabaseAdapter;
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\DI\Annotation\Inject;
use Windwalker\DI\Container;

/**
 * The MenuService class.
 *
 * @since  1.7
 */
class MenuService
{
    use RuntimeCacheTrait;

    /**
     * Property container.
     *
     * @Inject()
     *
     * @var Container
     */
    protected $container;

    /**
     * Property db.
     *
     * @Inject()
     *
     * @var DatabaseAdapter
     */
    protected $db;

    /**
     * Property repository.
     *
     * @Inject()
     *
     * @var MenusRepository
     */
    protected $repository;

    /**
     * createTree
     *
     * @param array|DataSet|Data[] $menus
     *
     * @return  MenuNode|MenuNode[]
     */
    public static function createTree($menus): Node
    {
        return TreeBuilder::create(
            $menus,
            'id',
            'parent_id',
            'level',
            MenuNode::class
        );
    }

    /**
     * getViews
     *
     * @param bool $group
     *
     * @return  array
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @since  1.7
     */
    public function getViews(bool $group = false): array
    {
        return $this->once('views,group:' . (int) $group, function () use ($group) {
            $luna = self::getLuna();

            $views = (array) $luna->get('menu.views');

            $classes = [];

            /** @var AbstractMenuView $view */
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
     * @param string $name
     *
     * @return  AbstractMenuView|null
     *
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  1.7
     */
    public function getViewInstance(string $name): ?AbstractMenuView
    {
        $class = $this->getViews()[$name] ?? null;

        if (!$class) {
            return null;
        }

        return $this->container->newInstance($class);
    }

    /**
     * getLuna
     *
     * @return  LunaPackage
     *
     * @since  1.7
     */
    public static function getLuna(): LunaPackage
    {
        return LunaHelper::getPackage();
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
        $db = $this->db;

        $query = $db->getQuery(true);

        $query->select('DISTINCT type')
            ->from(LunaTable::MENUS)
            ->where("type != ''")
            ->order('type');

        $items = (array) $db->setQuery($query)->loadColumn();

        $items = array_combine($items, $items);

        $types = static::getLuna()->get('menu.types');

        foreach ((array) $types as $type => $name) {
            if (is_numeric($type)) {
                $type = $name;
            }

            $items[$type] = $name;
        }

        ksort($items);

        $options = [];

        foreach ($items as $k => $n) {
            $name = $k === $n ? $n : $k . ' (' . __($n) . ')';

            $options[$k] = (object) [
                'name' => $name,
                'type' => $k,
            ];
        }

        return $options;
    }

    /**
     * getMenusTree
     *
     * @param string $type
     * @param bool   $onlyAvailable
     * @param int    $parent
     *
     * @return  MenuNode|MenuNode[]
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  1.7
     */
    public function getMenusTree(string $type, bool $onlyAvailable = true, $parent = 1): Node
    {
        return $this->once(
            'menu.tree:' . sha1(json_encode(get_defined_vars())),
            function () use ($type, $onlyAvailable, $parent) {
                $node = static::createTree(
                    $this->getMenus($type, $onlyAvailable, $parent)
                );

                /** @var MenuNode $menuNode */
                foreach ($node as $menuNode) {
                    if (!$instance = $this->getViewInstance($menuNode->getValue()->view)) {
                        throw new \DomainException(sprintf(
                            'Menu View: %s not found',
                            $menuNode->getValue()->view
                        ));
                    }

                    $menuNode->setViewInstance($instance);
                }

                return $node;
            }
        );
    }

    /**
     * getAllMenusTree
     *
     * @return  MenuNode[]
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getAllMenusTree(): array
    {
        return $this->once('all.menus', function () {
            $query = $this->db->getQuery(true);

            $query->select(['DISTINCT type'])
                ->from(LunaTable::MENUS);

            $types = $this->db->prepare($query)->loadColumn();

            $trees = [];

            foreach ($types as $type) {
                if (!$type) {
                    continue;
                }

                $trees[] = $this->getMenusTree($type);
            }

            return $trees;
        });
    }

    /**
     * getMenus
     *
     * @param string     $type
     * @param bool       $onlyAvailable
     * @param int|object $parent
     *
     * @return  DataSet
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  1.7
     */
    public function getMenus(string $type, bool $onlyAvailable = true, $parent = 1): DataSet
    {
        return $this->getRepositoryWithAvailableConditions($type, $onlyAvailable, $parent)->getItems();
    }

    /**
     * getActiveMenu
     *
     * @param string $type
     *
     * @return  MenuNode|null
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function getActiveMenu(?string $type = null): ?MenuNode
    {
        if ($type)  {
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
     * @param callable $callback
     *
     * @return  MenuNode|null
     *
     * @throws \Psr\Cache\InvalidArgumentException
     *
     * @since  __DEPLOY_VERSION__
     */
    public function findMenu(callable $callback): ?MenuNode
    {
        foreach ($this->getAllMenusTree() as $tree) {
            if ($menu = $tree->findFirst($callback)) {
                return $menu;
            }
        }

        return null;
    }

    /**
     * getRepositoryWithAvailableConditions
     *
     * @param string      $type
     * @param bool        $onlyAvailable
     * @param int|object  $parent
     *
     * @return  ListRepositoryInterface
     *
     * @since  1.7
     */
    public function getRepositoryWithAvailableConditions(
        string $type,
        bool $onlyAvailable = true,
        $parent = 1
    ): ListRepositoryInterface {
        $repo = $this->getRepository();

        $repo->type($type);

        if ($onlyAvailable) {
            $repo->onlyAvailable();
        }

        if (!is_object($parent)) {
            $parent = MenuMapper::findOne($parent);
        }

        $repo->parentKeys($parent->lft, $parent->rgt);

        return $repo;
    }

    /**
     * renderMenuItems
     *
     * @param MenuNode|string $menus
     * @param string          $layout
     * @param array           $data
     *
     * @return  string
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @throws \ReflectionException
     * @throws \Windwalker\DI\Exception\DependencyResolutionException
     * @since  1.7
     */
    public function renderMenuItems($menus, array $data = [], string $layout = 'luna.menu.menu-items'): string
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
     * Method to get property Repository
     *
     * @param bool $reset
     *
     * @return  MenusRepository
     *
     * @since  1.7
     */
    public function getRepository(bool $reset = false): ListRepositoryInterface
    {
        if ($reset) {
            $this->repository->reset();
            $this->repository->resetCache();
        }

        return $this->repository;
    }

    /**
     * Method to set property repository
     *
     * @param ListRepositoryInterface $repository
     *
     * @return  static  Return self to support chaining.
     *
     * @since  1.7
     */
    public function setRepository(ListRepositoryInterface $repository)
    {
        $this->repository = $repository;

        return $this;
    }

    /**
     * resetCache
     *
     * @return  static
     */
    public function resetCache()
    {
        $this->cache = new Cache(new RuntimeArrayStorage(), new RawSerializer());

        return $this;
    }
}
