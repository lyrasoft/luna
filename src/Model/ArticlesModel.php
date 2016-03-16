<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Model;

use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Model\ListModel;
use Windwalker\Query\Query;
use Windwalker\Query\QueryElement;

/**
 * The ArticlesModel class.
 * 
 * @since  1.0
 */
class ArticlesModel extends ListModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'articles';

	/**
	 * Property allowFields.
	 *
	 * @var  array
	 */
	protected $allowFields = array(
		'locale', 'category_keys'
	);

	/**
	 * Property fieldMapping.
	 *
	 * @var  array
	 */
	protected $fieldMapping = array();

	/**
	 * configureTables
	 *
	 * @return  void
	 */
	protected function configureTables()
	{
		$this->addTable('article', LunaTable::ARTICLES)
			->addTable('category', LunaTable::CATEGORIES, 'category.id = article.category_id')
			->addTable('map',      LunaTable::TAG_MAPS,   'map.target_id = article.id AND map.type = "article"')
			->addTable('tag',      LunaTable::TAGS,       'tag.id = map.tag_id AND tag.state = 1');
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
		$this->set('query.select', array(
			'article.*',
			'category.id AS category_id',
			'category.title AS category_title',
			'category.alias AS category_alias',
			'category.path AS category_path',
			'tag.title AS tag_title',
			'tag.alias AS tag_alias',
		));

		$subQuery = $this->db->getQuery(true)
			->select('tag_id, target_id')
			->from(LunaTable::TAG_MAPS)
			->where('type = "article"')
			->group('tag_id');

		$query->leftJoin(sprintf('(%s) AS mapping', $subQuery), 'mapping.target_id = article.id');
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
//		$query->select('COUNT(DISTINCT comment.id) AS comments');

		$subQuery = $this->db->getQuery(true);

		$subQuery->select(array('COUNT(id)', 'target_id'))
			->from(LunaTable::COMMENTS)
			->where('type = "article"')
			->where('state = 1')
			->group('id');

		$query->leftJoin(sprintf('(%s) AS comment', $subQuery), 'comment.target_id = article.id');

		$query->group('article.id')
			->select('GROUP_CONCAT(DISTINCT CONCAT(tag.title, ":" , tag.alias) SEPARATOR "||") AS tags');
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
		$filterHelper->setHandler('locale', function(Query $query, $field, $value)
		{
			if ('' !== (string) $value)
			{
				$langs = array(
					$query->quote('*'),
					$query->quote($value),
				);

				$query->where('article.language ' . new QueryElement('IN()', $langs));
			}
		});

		$filterHelper->setHandler('category_keys', function(Query $query, $field, $value)
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
}
