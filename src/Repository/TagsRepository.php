<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Repository\Filter\FilterHelperInterface;
use Phoenix\Repository\ListRepository;
use Windwalker\Query\Query;
use Windwalker\Query\QueryElement;

/**
 * The CategoriesModel class.
 *
 * @since  1.0
 */
class TagsRepository extends ListRepository
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = 'tags';

    /**
     * Property allowFields.
     *
     * @var  array
     */
    protected $allowFields = [
        'locale',
    ];

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
        $this->addTable('tag', LunaTable::TAGS)
            ->addTable('map', LunaTable::TAG_MAPS, 'tag.id = map.tag_id');
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
        $query->group('tag.id');
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
        $filterHelper->setHandler('locale', function (Query $query, $field, $value) {
            if ('' !== (string) $value) {
                $langs = [
                    $query->quote('*'),
                    $query->quote($value),
                ];

                $query->where('tag.language ' . new QueryElement('IN()', $langs));
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
     * published
     *
     * @param bool|int $state
     *
     * @return  static
     */
    public function published($state = true)
    {
        return $this->addFilter('tag.state', (int) $state);
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
     * onlyAvailable
     *
     * @return  static
     */
    public function onlyAvailable()
    {
        $this->published(true);

        if (Locale::isEnabled(Locale::CLIENT_CURRENT)) {
            $this->locale(Locale::getLocale());
        }

        return $this;
    }
}
