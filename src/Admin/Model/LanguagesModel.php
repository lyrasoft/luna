<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Model;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Model\ListModel;
use Windwalker\Query\Query;

/**
 * The LanguagesModel class.
 * 
 * @since  1.0
 */
class LanguagesModel extends ListModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'languages';

	/**
	 * Property allowFields.
	 *
	 * @var  array
	 */
	protected $allowFields = [];

	/**
	 * Property fieldMapping.
	 *
	 * @var  array
	 */
	protected $fieldMapping = [];

	/**
	 * configureTables
	 *
	 * @return  void
	 */
	protected function configureTables()
	{
		$this->addTable('language', LunaTable::LANGUAGES);
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
		// Add your logic
	}

	/**
	 * Configure the filter handlers.
	 *
	 * Example:
	 * ``` php
	 * $filterHelper->setHandler(
	 *     'language.date',
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
		// Configure filters
	}

	/**
	 * Configure the search handlers.
	 *
	 * Example:
	 * ``` php
	 * $searchHelper->setHandler(
	 *     'language.title',
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
		// Configure searches
	}
}
