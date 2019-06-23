<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Menu;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Menu\View\AbstractMenuView;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Cache\RuntimeCacheTrait;
use Windwalker\Core\Database\DatabaseAdapter;
use Windwalker\DI\Annotation\Inject;
use Windwalker\DI\Container;

/**
 * The MenuService class.
 *
 * @since  __DEPLOY_VERSION__
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
     * getViews
     *
     * @param bool $group
     *
     * @return  array
     *
     * @throws \Psr\Cache\InvalidArgumentException
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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
     * @since  __DEPLOY_VERSION__
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

            $options[] = (object) [
                'name' => $name,
                'type' => $k,
            ];
        }

        return $options;
    }
}
