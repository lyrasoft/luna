<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Model\Filter\FilterHelperInterface;
use Phoenix\Repository\ListRepository;
use Windwalker\Query\Query;
use Windwalker\Query\QueryElement;

/**
 * The ArticlesModel class.
 *
 * @since  1.0
 */
class ArticlesRepository extends ListRepository implements ContentRepositoryInterface
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
    protected $allowFields = [
        'locale',
        'category_keys',
        'mapping.target_id',
        'mapping.tag_id',
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
        $this->addTable('article', LunaTable::ARTICLES);

        if (LunaHelper::tableExists('categories') && in_array('category_id',
                $this->db->getTable(LunaTable::ARTICLES)->getColumns('category_id'))) {
            $this->addTable('category', LunaTable::CATEGORIES, 'category.id = article.category_id');
        }

        if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps')) {
            $this->addTable('map', LunaTable::TAG_MAPS, 'map.target_id = article.id AND map.type = "article"')
                ->addTable('tag', LunaTable::TAGS, 'tag.id = map.tag_id AND tag.state = 1');
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

        $select = [
            'article.*',
        ];

        if (LunaHelper::tableExists('categories') && in_array('category_id',
                $this->db->getTable(LunaTable::ARTICLES)->getColumns('category_id'))) {
            $select = $select + [
                    'category.id AS category_id',
                    'category.title AS category_title',
                    'category.alias AS category_alias',
                    'category.path AS category_path',
                ];
        }

        if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps')) {
            $select = $select + [
                    'tag.title AS tag_title',
                    'tag.alias AS tag_alias',
                ];

            $subQuery = $this->db->getQuery(true)
                ->select('tag_id, target_id')
                ->from(LunaTable::TAG_MAPS)
                ->where('type = "article"');

            $query->leftJoin(sprintf('(%s) AS mapping', $subQuery), 'mapping.target_id = article.id');
        }

        $this->set('query.select', $select);
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
        $query->group('article.id');

        if (LunaHelper::tableExists('comments')) {
            $subQuery = $this->db->getQuery(true);

            $subQuery->select(['COUNT(target_id) AS count', 'target_id'])
                ->from(LunaTable::COMMENTS)
                ->where('type = "article"')
                ->where('state = 1')
                ->group('target_id');

            $query->select('comment.count AS comments')
                ->leftJoin(sprintf('(%s) AS comment', $subQuery), 'comment.target_id = article.id');
        }

        if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps')) {
            $query->select('GROUP_CONCAT(DISTINCT CONCAT(tag.title, ":" , tag.alias) SEPARATOR "||") AS tags');
        }
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

                $query->where('article.language ' . new QueryElement('IN()', $langs));
            }
        });

        $filterHelper->setHandler('category_keys', function (Query $query, $field, $value) {
            if (!$value) {
                return;
            }

            if (!is_array($value)) {
                $value = array_map('trim', explode(',', $value, 2));
            }

            if (count($value) < 2) {
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
     * filterTag
     *
     * @param int $tagId
     *
     * @return  static
     */
    public function tag($tagId)
    {
        return $this->addFilter('mapping.tag_id', $tagId);
    }

    /**
     * published
     *
     * @param bool|int $bool
     *
     * @return static
     */
    public function published($bool = true)
    {
        return $this->addFilter('article.state', (int) $bool);
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
     * filterCategory
     *
     * @param mixed $category
     *
     * @return  static
     */
    public function category($category)
    {
        return $this->addFilter('article.category_id', $category);
    }

    /**
     * categoryKeys
     *
     * @param int $lft
     * @param int $rgt
     *
     * @return  static
     */
    public function categoryKeys($lft, $rgt)
    {
        return $this->addFilter('category_keys', $lft . ',' . $rgt);
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
        return $this->addFilter('article.access', $access);
    }
}
