<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Model;

use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Helper\WarderHelper;
use Lyrasoft\Warder\Table\WarderTable;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Model\ListModel;
use Windwalker\Core\Ioc;
use Windwalker\Query\Query;

/**
 * The CommentsModel class.
 * 
 * @since  1.0
 */
class CommentsModel extends ListModel
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'comments';

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
		$this->addTable('comment', LunaTable::COMMENTS);

		if (WarderHelper::tableExists('users'))
		{
			$this->addTable('user',   WarderTable::USERS, 'comment.user_id = user.id')
				->addTable('replyer', WarderTable::USERS, 'comment.reply_user_id = replyer.id');
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
		Ioc::getDispatcher()->triggerEvent('onLunaCommentModelPrepareGetQuery', [
			'model' => $this,
			'query' => $query,
			'type'  => $this['comment.type']
		]
		);
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
	 *     'comment.date',
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
	 *     'comment.title',
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
