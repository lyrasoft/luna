<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Repository;

use Lyrasoft\Luna\Admin\DataMapper\CategoryMapper;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Helper\WarderHelper;
use Lyrasoft\Warder\Table\WarderTable;
use Phoenix\Repository\Filter\FilterHelperInterface;
use Phoenix\Repository\ListRepository;
use Windwalker\Legacy\Query\Query;

/**
 * The ArticlesModel class.
 *
 * @since  1.0
 */
class ArticlesRepository extends ListRepository
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
        $this->from('article', LunaTable::ARTICLES);

        if (LunaHelper::tableExists('categories')
            && \in_array('category_id', $this->db->getTable(LunaTable::ARTICLES)->getColumns('category_id'), true)) {
            $this->leftJoin('category', LunaTable::CATEGORIES, 'category.id = article.category_id');
        }

        if (WarderHelper::tableExists('users')) {
            $this->leftJoin(
                'user',
                WarderTable::USERS,
                $this->db->format('%n = %n', 'user.id', 'article.created_by')
            );
        }

        if (Locale::isEnabled() && LunaHelper::tableExists('languages')) {
            $this->leftJoin('lang', LunaTable::LANGUAGES, 'lang.code = article.language');
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
        // Add your logic
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
        $filterHelper->setHandler(
            'article.category_id',
            static function (Query $query, string $field, string $value) {
                if ($value !== '') {
                    $category = CategoryMapper::findOne($value);

                    if ($category->notNull()) {
                        $query->where('category.lft >= %a', $category->lft);
                        $query->where('category.rgt <= %a', $category->rgt);
                    }
                }
            }
        );
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
        // Configure searches
    }
}
