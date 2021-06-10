<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\Table\Table;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Table\WarderTable;
use Phoenix\Repository\Filter\FilterHelperInterface;
use Phoenix\Repository\ListRepository;
use Windwalker\Legacy\Database\Driver\AbstractDatabaseDriver;
use Windwalker\Legacy\Query\Query;
use Windwalker\Legacy\Structure\Structure;

/**
 * The MenusRepository class.
 *
 * @since  1.0
 */
class MenusRepository extends ListRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'Menus';

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
     * Instantiate the model.
     *
     * @param   Structure|array        $config The model config.
     * @param   AbstractDatabaseDriver $db     The database driver.
     *
     * @since   1.0
     */
    public function __construct($config = null, AbstractDatabaseDriver $db = null)
    {
        parent::__construct($config, $db);
    }

    /**
     * configureTables
     *
     * @return  void
     */
    protected function configureTables()
    {
        $this->from('menu', LunaTable::MENUS)
            ->leftJoin(
                'user',
                WarderTable::USERS,
                $this->db->qn('user.id') . ' = menu.created_by'
            )
            ->leftJoin('lang', LunaTable::LANGUAGES, 'lang.code = menu.language');
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
        $query->where('menu.parent_id != 0')->where('menu.level >= 1');
    }

    /**
     * Configure the filter handlers.
     *
     * Example:
     * ``` php
     * $filterHelper->setHandler(
     *     'menu.date',
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
     *     'menu.title',
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
