<?php
/**
 * Part of Front project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Repository\Filter\FilterHelperInterface;
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

        if (LunaHelper::tableExists('categories')
            && in_array('category_id', $this->db->getTable(LunaTable::ARTICLES)->getColumns('category_id'), true)) {
            $this->addTable('category', LunaTable::CATEGORIES, 'category.id = article.category_id');
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
        $query->group([
            'page.id',
            'page.alias',
            'article.id',
            'article.page_id',
            'article.title',
            'article.alias',
            'article.category_id',
            'article.image',
            'article.introtext',
            'article.fulltext',
            'article.created_by',
            'article.created',
            'category.title',
            'category.alias',
            'category.path',
            'comment.count',
        ]);

        if (LunaHelper::tableExists('pages')
            && in_array('page_id', $this->db->getTable(LunaTable::ARTICLES)->getColumns('page_id'), true)) {
            $query->leftJoin(LunaTable::PAGES . ' AS page', 'page.id = article.page_id')
                ->select(['page.id AS page_id', 'page.alias AS page_alias']);
        }

        $select = [
            'article.id',
            'article.title',
            'article.alias',
            'article.image',
            'article.introtext',
            'article.fulltext',
            'article.created_by',
            'article.created',
        ];

        if (LunaHelper::tableExists('categories')
            && in_array('category_id', $this->db->getTable(LunaTable::ARTICLES)->getColumns('category_id'), true)) {
            $select += [
                'category.id AS category_id',
                'category.title AS category_title',
                'category.alias AS category_alias',
                'category.path AS category_path',
            ];
        }

        if (LunaHelper::tableExists('tags') && LunaHelper::tableExists('tag_maps')) {
            $select += [
                'tag.title AS tag_title',
                'tag.alias AS tag_alias',
            ];

            $subQuery = $this->db->getQuery(true)
                ->select('tag_id, target_id')
                ->from(LunaTable::TAG_MAPS)
                ->where('type = %q', 'article');

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
        if (LunaHelper::tableExists('comments')) {
            $subQuery = $this->db->getQuery(true);

            $subQuery->select(['COUNT(target_id) AS count', 'target_id'])
                ->from(LunaTable::COMMENTS)
                ->where('type = %q', 'article')
                ->where('state = 1')
                ->group('target_id');

            $query->select('comment.count AS comments')
                ->leftJoin(sprintf('(%s) AS comment', $subQuery), 'comment.target_id = article.id');
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
