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
use Lyrasoft\Luna\Repository\CategorizedRepositoryInterface;
use Lyrasoft\Luna\Repository\LocaleRepositoryInterface;
use Lyrasoft\Luna\Repository\StateRepositoryInterface;
use Lyrasoft\Luna\Repository\ViewAccessRepositoryInterface;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Luna\Tree\Node;
use Lyrasoft\Luna\Tree\TreeBuilder;
use Lyrasoft\Warder\Helper\WarderHelper;
use Lyrasoft\Warder\Table\WarderTable;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Model\ListModel;
use Windwalker\Data\Data;
use Windwalker\Data\DataSet;
use Windwalker\Query\Query;
use Windwalker\Query\QueryElement;
use Windwalker\Utilities\ArrayHelper;

/**
 * The CategoriesModel class.
 *
 * @since  1.0
 */
class CategoriesModel extends ListModel implements StateRepositoryInterface, LocaleRepositoryInterface,
	ViewAccessRepositoryInterface
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
	protected $allowFields = [
		'locale', 'category.locale', 'max_level', 'has_root', 'parent_keys'
	];

	/**
	 * Property fieldMapping.
	 *
	 * @var  array
	 */
	protected $fieldMapping = [
		'locale' => 'category.locale'
	];

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
				$langs = [
					$query->quote('*'),
					$query->quote($value),
				];

				$query->where('category.language ' . new QueryElement('IN()', $langs));
			}
		});

		$filterHelper->setHandler('has_root', function(Query $query, $field, $value)
		{
			if (!$value)
			{
				$query->where('category.parent_id != 0');
			}
		});

		$filterHelper->setHandler('max_level', function(Query $query, $field, $value)
		{
			if (!$value)
			{
				$query->where('category.level <= ' . (int) $value);
			}
		});

		$filterHelper->setHandler('parent_keys', function(Query $query, $field, $value)
		{
			if (!$value)
			{
				return;
			}

			if (!is_array($value))
			{
				$value = array_map('trim', explode(',', $value, 2));
			}

			if (count($value) < 2)
			{
				throw new \LogicException('Need category lft & rgt keys to search tree node.');
			}

			$query->where('category.lft >= ' . $value[0])
				->where('category.rgt <= ' . $value[1]);
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
	public static function getCategoryAsTree($type, $parent = 1, $maxLevel = 0, $conditions = [], $order = 'lft', $start = null, $limit = null)
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
	public static function getCategories($type, $parent = 1, $maxLevel = 0, $conditions = [], $order = 'lft', $start = null, $limit = null)
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
	public static function getAvailableCategories($type, $parent = 1, $maxLevel = 0, $conditions = [], $order = 'lft', $start = null, $limit = null)
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
	public static function find($conditions = [], $order = 'lft', $start = null, $limit = null)
	{
		$model = static::getInstance();

		if (is_object($conditions))
		{
			$conditions = get_object_vars($conditions);
		}

		if (!is_array($conditions))
		{
			$conditions = [$model->getRecord()->getKeyName() => $conditions];
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

			if ($dir === 'ASC' || $dir === 'DESC')
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

	/**
	 * type
	 *
	 * @param string $type
	 *
	 * @return  static
	 */
	public function type($type = null)
	{
		return $this->addFilter('category.type', $type);
	}

	/**
	 * locale
	 *
	 * @param string $locale
	 *
	 * @return  static
	 */
	public function locale($locale)
	{
		return $this->addFilter('locale', $locale);
	}

	/**
	 * published
	 *
	 * @param bool|int $published
	 *
	 * @return static
	 */
	public function published($published = true)
	{
		return $this->addFilter('category.state', (int) $published);
	}

	/**
	 * access
	 *
	 * @param mixed $access
	 *
	 * @return  static
	 */
	public function access($access)
	{
		return $this->addFilter('category.access', $access);
	}

	/**
	 * filterCategory
	 *
	 * @param int $id
	 *
	 * @return  static
	 */
	public function parent($id)
	{
		return $this->addFilter('category.parent_id', $id);
	}

	/**
	 * parentKeys
	 *
	 * @param int $lft
	 * @param int $rgt
	 *
	 * @return  static
	 */
	public function parentKeys($lft, $rgt)
	{
		return $this->addFilter('parent_keys', $lft . ',' . $rgt);
	}

	/**
	 * hasRoot
	 *
	 * @param bool $bool
	 *
	 * @return  static
	 */
	public function hasRoot($bool = true)
	{
		return $this->addFilter('has_root', (bool) $bool);
	}

	/**
	 * maxLevel
	 *
	 * @param int $level
	 *
	 * @return  static
	 */
	public function maxLevel($level)
	{
		return $this->addFilter('max_level', (int) $level);
	}

	/**
	 * onlyAvailable
	 *
	 * @return  static
	 */
	public function onlyAvailable()
	{
		$this->published(true);

		if (Locale::isEnabled(Locale::CLIENT_CURRENT))
		{
			$this->locale(Locale::getLocale());
		}

		return $this;
	}
}
