<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Model;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Model\ListModel;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\Query\Query;
use Windwalker\Query\QueryElement;
use Lyrasoft\Warder\Helper\WarderHelper;
use Lyrasoft\Warder\Table\WarderTable;
use Windwalker\Utilities\ArrayHelper;

/**
 * The CategoriesModel class.
 *
 * @since  {DEPLOY_VERSION}
 */
class CategoriesModel extends ListModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'categories';

	/**
	 * Property allowFields.
	 *
	 * @var  array
	 */
	protected $allowFields = array(
		'locale', 'category.locale'
	);

	/**
	 * Property fieldMapping.
	 *
	 * @var  array
	 */
	protected $fieldMapping = array(
		'locale' => 'category.locale'
	);

	/**
	 * configureTables
	 *
	 * @return  void
	 */
	protected function configureTables()
	{
		$this->addTable('category', LunaTable::CATEGORIES);

		if (WarderHelper::tableExists('users'))
		{
			$this->addTable('user', WarderTable::USERS, 'user.id = category.created_by');
		}
	}

	/**
	 * The prepare getQuery hook
	 *
	 * @param Query $query The db query object.
	 *
	 * @return  void
	 */
	protected function prepareGetQuery(Query $query)
	{
		// Add your logic
	}

	/**
	 * The post getQuery object.
	 *
	 * @param Query $query The db query object.
	 *
	 * @return  void
	 */
	protected function postGetQuery(Query $query)
	{
	}

	/**
	 * Configure the filter handlers.
	 *
	 * Example:
	 * ``` php
	 * $filterHelper->setHandler(
	 *     'article.date',
	 *     function($query, $field, $value)
	 *     {
	 *         $query->where($field . ' >= ' . $value);
	 *     }
	 * );
	 * ```
	 *
	 * @param FilterHelperInterface $filterHelper The filter helper object.
	 *
	 * @return  void
	 */
	protected function configureFilters(FilterHelperInterface $filterHelper)
	{
		$filterHelper->setHandler('category.locale', function(Query $query, $field, $value)
		{
			if ('' !== (string) $value)
			{
				$langs = array(
					$query->quote('*'),
					$query->quote($value),
				);

				$query->where('category.language ' . new QueryElement('IN()', $langs));
			}
		});
	}

	/**
	 * Configure the search handlers.
	 *
	 * Example:
	 * ``` php
	 * $searchHelper->setHandler(
	 *     'article.title',
	 *     function($query, $field, $value)
	 *     {
	 *         return $query->quoteName($field) . ' LIKE ' . $query->quote('%' . $value . '%');
	 *     }
	 * );
	 * ```
	 *
	 * @param FilterHelperInterface $searchHelper The search helper object.
	 *
	 * @return  void
	 */
	protected function configureSearches(FilterHelperInterface $searchHelper)
	{
		// Add your logic
	}

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
	 */
	public static function getCategoryAsTree($type, $parent = 1, $maxLevel = 0, $conditions = array(), $order = 'lft', $start = null, $limit = null)
	{
		return static::createTree(static::getCategories($type, $parent, $maxLevel, $conditions, $order, $start, $limit));
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
	 */
	public static function getCategories($type, $parent = 1, $maxLevel = 0, $conditions = array(), $order = 'lft', $start = null, $limit = null)
	{
		if (is_object($parent) || is_array($parent))
		{
			$lft = ArrayHelper::getValue($parent, 'lft');
			$rgt = ArrayHelper::getValue($parent, 'rgt');
			$level = ArrayHelper::getValue($parent, 'level');
		}
		else
		{
			$root = CategoryMapper::findOne($parent);

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

		return static::find($conditions, $order, $start, $limit);
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
	 */
	public static function getAvailableCategories($type, $parent = 1, $maxLevel = 0, $conditions = array(), $order = 'lft', $start = null, $limit = null)
	{
		$conditions['category.state'] = 1;

		if (Locale::isEnabled(Locale::CLIENT_CURRENT))
		{
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
	 */
	public static function find($conditions = array(), $order = 'lft', $start = null, $limit = null)
	{
		$model = static::getInstance();

		if (is_object($conditions))
		{
			$conditions = get_object_vars($conditions);
		}

		if (!is_array($conditions))
		{
			$conditions = array($model->getRecord()->getKeyName() => $conditions);
		}

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

		if ($order)
		{
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
		}

		$model['list.start'] = $start;
		$model['list.limit'] = $limit;

		return $model->getItems();
	}
}
