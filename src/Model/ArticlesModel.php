<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Model;

use Lyrasoft\Luna\Admin\Table\Table;
use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Model\ListModel;
use Windwalker\Query\Query;

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
	protected $allowFields = array();

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
		$this->addTable('article', LunaHelper::getTable('articles'))
			->addTable('category', LunaHelper::getTable('categories'), 'category.id = article.category_id')
			->addTable('map',      LunaHelper::getTable('tag_maps'),   'map.target_id = article.id AND map.type = "article"')
			->addTable('mapping',  LunaHelper::getTable('tag_maps'),   'mapping.target_id = article.id AND mapping.type = "article"')
			->addTable('tag',      LunaHelper::getTable('tags'),       'tag.id = map.tag_id')
			->addTable('comment',  LunaHelper::getTable('comments'),   'comment.target_id = article.id AND comment.type = "article"');
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
		$query->select('COUNT(DISTINCT comment.id) AS comments');

		$query->group('article.id')
			->select('GROUP_CONCAT(DISTINCT CONCAT(tag.title, ":" , tag.alias) SEPARATOR "||") AS tags');

		$query->where('tag.state = 1')
			->where('comment.state = 1');
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
		// Add your logic
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
