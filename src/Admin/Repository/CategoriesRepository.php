<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Helper\WarderHelper;
use Lyrasoft\Warder\Table\WarderTable;
use Phoenix\Repository\Filter\FilterHelperInterface;
use Phoenix\Repository\ListRepository;
use Windwalker\Query\Query;

/**
 * The CategoriesModel class.
 *
 * @since  1.0
 */
class CategoriesRepository extends ListRepository
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
        $this->addTable('category', LunaTable::CATEGORIES);

        if (WarderHelper::tableExists('users')) {
            $this->addTable('user', WarderTable::USERS, 'category.created_by = user.id');
        }

        if (Locale::isEnabled() && LunaHelper::tableExists('languages')) {
            $this->addTable('lang', LunaTable::LANGUAGES, 'lang.code = category.language');
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
        $query->where('category.parent_id != 0')->where('category.level >= 1');
    }

    /**
     * Configure the filter handlers.
     *
     * Example:
     * ``` php
     * $filterHelper->setHandler(
     *     'category.date',
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
     *     'category.title',
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
