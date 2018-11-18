<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Category;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Repository\CategoriesRepository;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\Utilities\ArrayHelper;

/**
 * The CategoryHelper class.
 *
 * @since  1.0
 */
class CategoryHelper
{
    /**
     * Property model.
     *
     * @var  CategoriesRepository
     */
    protected static $repository;

    /**
     * createTree
     *
     * @param   array|DataSet|Data[] $categories
     *
     * @return  Node|Node[]
     */
    public static function createTree($categories)
    {
        return TreeBuilder::create($categories);
    }

    /**
     * getCategoryAsTree
     *
     * @param string           $type
     * @param int|array|object $parent
     * @param int              $maxLevel
     * @param array            $conditions
     * @param string           $order
     * @param int              $start
     * @param int              $limit
     *
     * @return  Node|Node[]
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function getCategoryAsTree(
        $type,
        $parent = 1,
        $maxLevel = 0,
        $conditions = [],
        $order = 'lft',
        $start = null,
        $limit = null
    ) {
        return static::createTree(
            static::getCategories($type, $parent, $maxLevel, $conditions, $order, $start, $limit)
        );
    }

    /**
     * getCategories
     *
     * @param string           $type
     * @param int|array|object $parent
     * @param int              $maxLevel
     * @param array            $conditions
     * @param string           $order
     * @param int              $start
     * @param int              $limit
     *
     * @return  Data[]|DataSet
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function getCategories(
        $type,
        $parent = 1,
        $maxLevel = 0,
        $conditions = [],
        $order = 'lft',
        $start = null,
        $limit = null
    ) {
        if (is_object($parent) || is_array($parent)) {
            $lft   = ArrayHelper::getValue($parent, 'lft');
            $rgt   = ArrayHelper::getValue($parent, 'rgt');
            $level = ArrayHelper::getValue($parent, 'level');
        } else {
            $mapper = new CategoryMapper;
            $root   = $mapper->findOne($parent);

            if ($root->isNull()) {
                return new DataSet;
            }

            $lft   = $root->lft;
            $rgt   = $root->rgt;
            $level = $root->level;
        }

        $conditions[]                = 'category.lft > ' . $lft;
        $conditions[]                = 'category.rgt < ' . $rgt;
        $conditions[]                = 'category.parent_id > 0';
        $conditions['category.type'] = $type;

        if ($maxLevel) {
            $conditions[] = 'category.level <= ' . ($level + $maxLevel);
        }

        return static::find($conditions, $order, $start, $limit);
    }

    /**
     * getCategory
     *
     * @param   int|array $conditions
     *
     * @return  Data
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function getCategory($conditions)
    {
        $cats = static::find($conditions, null, 0, 1);

        return $cats[0];
    }

    /**
     * getAvailableCategories
     *
     * @param string           $type
     * @param int|array|object $parent
     * @param int              $maxLevel
     * @param array            $conditions
     * @param string           $order
     * @param int              $start
     * @param int              $limit
     *
     * @return  DataSet|Data[]
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function getAvailableCategories(
        $type,
        $parent = 1,
        $maxLevel = 0,
        $conditions = [],
        $order = 'lft',
        $start = null,
        $limit = null
    ) {
        $conditions['category.state'] = 1;

        if (Locale::isEnabled(Locale::CLIENT_CURRENT)) {
            $conditions['category.locale'] = Locale::getLocale();
        }

        return static::getCategories($type, $parent, $maxLevel, $conditions, $order, $start, $limit);
    }

    /**
     * getCategories
     *
     * @param array  $conditions
     * @param string $order
     * @param int    $start
     * @param int    $limit
     *
     * @return  Data[]|DataSet
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public static function find($conditions = [], $order = 'lft', $start = null, $limit = null)
    {
        $repository = static::getModel(true);

        if (is_object($conditions)) {
            $conditions = get_object_vars($conditions);
        }

        if (!is_array($conditions)) {
            $conditions = [$repository->getKeyName() => $conditions];
        }

        foreach ($conditions as $key => $condition) {
            if (!is_numeric($key)) {
                if (strpos($key, '.') === false) {
                    $key = 'category.' . $key;
                }

                $repository->addFilter($key, $condition);
            } else {
                $repository->getState()->push('query.where', $condition);
            }
        }

        if ($order) {
            if (strpos($order, '.') === false) {
                $order = 'category.' . $order;
            }

            $order = explode(' ', trim($order));
            $dir   = strtoupper(array_pop($order));

            if ($dir === 'ASC' || $dir === 'DESC') {
                $repository['list.direction'] = $dir;
            } else {
                array_push($order, strtolower($dir));
            }

            $repository['list.ordering'] = implode(' ', $order);
        }

        $repository['list.start'] = $start;
        $repository['list.limit'] = $limit;

        return $repository->getItems();
    }

    /**
     * getModel
     *
     * @param bool $reset
     *
     * @return CategoriesRepository
     */
    public static function getModel($reset = false)
    {
        if (!static::$repository) {
            static::$repository = new CategoriesRepository();
        }

        if ($reset) {
            static::$repository->reset();
            static::$repository->resetCache();
        }

        return static::$repository;
    }

    /**
     * Method to set property model
     *
     * @param   CategoriesRepository $repository
     *
     * @return  void
     */
    public static function setModel($repository)
    {
        static::$repository = $repository;
    }
}
