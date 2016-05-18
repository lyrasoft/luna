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
use Lyrasoft\Luna\Model\CategoriesModel;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\Utilities\ArrayHelper;

/**
 * The CategoryHelper class.
 *
 * @since  {DEPLOY_VERSION}
 */
class CategoryHelper
{
	/**
	 * Property model.
	 *
	 * @var  CategoriesModel
	 */
	protected static $model;

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
	 *
	 * @return  Node|Node[]
	 */
	public static function getCategoryAsTree($type, $parent = 1, $maxLevel = 0, $conditions = array())
	{
		return static::createTree(static::getCategories($type, $parent, $maxLevel, $conditions));
	}

	/**
	 * getCategories
	 *
	 * @param string           $type
	 * @param int|array|object $parent
	 * @param int              $maxLevel
	 * @param array            $conditions
	 *
	 * @return  Data[]|DataSet
	 */
	public static function getCategories($type, $parent = 1, $maxLevel = 0, $conditions = array())
	{
		if (is_object($parent) || is_array($parent))
		{
			$lft = ArrayHelper::getValue($parent, 'lft');
			$rgt = ArrayHelper::getValue($parent, 'rgt');
			$level = ArrayHelper::getValue($parent, 'level');
		}
		else
		{
			$mapper = new CategoryMapper;
			$root = $mapper->findOne($parent);

			if ($root->isNull())
			{
				return new DataSet;
			}

			$lft = $root->lft;
			$rgt = $root->rgt;
			$level = $root->level;
		}

		$conditions[] = 'category.lft > ' . $lft;
		$conditions[] = 'category.rgt < ' . $rgt;
		$conditions[] = 'category.parent_id > 0';
		$conditions['category.type'] = $type;

		if ($maxLevel)
		{
			$conditions[] = 'category.level <= ' . ($level + $maxLevel);
		}

		return static::find($conditions);
	}

	/**
	 * getAvailableCategories
	 *
	 * @param string $type
	 * @param int    $parent
	 * @param int    $maxLevel
	 * @param array  $conditions
	 *
	 * @return  DataSet|Data[]
	 */
	public static function getAvailableCategories($type, $parent = 1, $maxLevel = 0, $conditions = array())
	{
		$conditions['category.state'] = 1;

		if (Locale::isEnabled(Locale::CLIENT_CURRENT))
		{
			$conditions['category.locale'] = Locale::getLocale();
		}

		return static::getCategories($type, $parent, $maxLevel, $conditions);
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
	 */
	public static function find($conditions = array(), $order = 'lft', $start = null, $limit = null)
	{
		$model = static::getModel();

		foreach ($conditions as $key => $condition)
		{
			if (!is_numeric($key))
			{
				if (strpos($key, '.') === false)
				{
					$key = 'category.' . $key;
				}

				$model->addFilter($key, $condition);
			}
			else
			{
				$model->getState()->push('query.where', $condition);
			}
		}

		if (strpos($order, '.') === false)
		{
			$order = 'category.' . $order;
		}

		$order = explode(' ', trim($order));
		$dir = strtoupper(array_pop($order));

		if ($dir == 'ASC' || $dir == 'DESC')
		{
			$model['list.direction'] = $dir;
		}
		else
		{
			array_push($order, $dir);
		}

		$model['list.ordering'] = implode(' ', $order);
		$model['list.start'] = $start;
		$model['list.limit'] = $limit;

		return $model->getItems();
	}

	/**
	 * getModel
	 *
	 * @return  CategoriesModel
	 */
	public static function getModel()
	{
		if (!static::$model)
		{
			static::$model = new CategoriesModel;
		}

		return static::$model;
	}

	/**
	 * Method to set property model
	 *
	 * @param   CategoriesModel $model
	 *
	 * @return  void
	 */
	public static function setModel($model)
	{
		static::$model = $model;
	}
}
