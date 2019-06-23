<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Repository;

use Lyrasoft\Luna\Language\Locale;
use Lyrasoft\Luna\Table\LunaTable;
use Lyrasoft\Warder\Helper\WarderHelper;
use Lyrasoft\Warder\Table\WarderTable;
use Phoenix\Repository\Filter\FilterHelperInterface;
use Phoenix\Repository\ListRepository;
use Windwalker\Query\Query;

/**
 * The MenusRepository class.
 *
 * @since  __DEPLOY_VERSION__
 */
class MenusRepository extends ListRepository implements
    StateRepositoryInterface,
    LocaleRepositoryInterface,
    ViewAccessRepositoryInterface
{
    /**
     * Property allowFields.
     *
     * @var  array
     */
    protected $allowFields = [
        'locale',
        'menu.locale',
        'max_level',
        'has_root',
        'parent_keys',
    ];

    /**
     * Property fieldMapping.
     *
     * @var  array
     */
    protected $fieldMapping = [
        'locale' => 'menu.locale',
    ];

    /**
     * configureTables
     *
     * @return  void
     */
    protected function configureTables()
    {
        $this->addTable('menu', LunaTable::MENUS);

        if (WarderHelper::tableExists('users')) {
            $this->addTable(
                'user',
                WarderTable::USERS,
                $this->db->qn('user.id') . ' = menu.created_by'
            );
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
        $filterHelper->setHandler('menu.locale', function (Query $query, $field, $value) {
            if ('' !== (string) $value) {
                $langs = [
                    '*',
                    $value,
                ];

                $query->whereIn('menu.language', $langs);
            }
        });

        $filterHelper->setHandler('has_root', function (Query $query, $field, $value) {
            if (!$value) {
                $query->where('menu.parent_id != 0');
            }
        });

        $filterHelper->setHandler('max_level', function (Query $query, $field, $value) {
            if ($value) {
                $query->where('menu.level <= ' . (int) $value);
            }
        });

        $filterHelper->setHandler('parent_keys', function (Query $query, $field, $value) {
            if (!$value) {
                return;
            }

            if (!is_array($value)) {
                $value = array_map('trim', explode(',', $value, 2));
            }

            if (count($value) < 2) {
                throw new \LogicException('Need lft & rgt keys to search tree node.');
            }

            $query->where('menu.lft >= ' . $value[0])
                ->where('menu.rgt <= ' . $value[1]);
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
     * type
     *
     * @param string $type
     *
     * @return  static
     */
    public function type($type = null)
    {
        return $this->addFilter('menu.type', $type);
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
     * published
     *
     * @param bool|int $published
     *
     * @return static
     */
    public function published($published = true)
    {
        return $this->addFilter('menu.state', (int) $published);
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
        return $this->addFilter('menu.access', $access);
    }

    /**
     * parent
     *
     * @param int $id
     *
     * @return  static
     */
    public function parent($id)
    {
        return $this->addFilter('menu.parent_id', $id);
    }

    /**
     * parentKeys
     *
     * @param int $lft
     * @param int $rgt
     *
     * @return  static
     */
    public function parentKeys($lft, $rgt)
    {
        return $this->addFilter('parent_keys', $lft . ',' . $rgt);
    }

    /**
     * hasRoot
     *
     * @param bool $bool
     *
     * @return  static
     */
    public function hasRoot($bool = true)
    {
        return $this->addFilter('has_root', (bool) $bool);
    }

    /**
     * maxLevel
     *
     * @param int $level
     *
     * @return  static
     */
    public function maxLevel($level)
    {
        return $this->addFilter('max_level', (int) $level);
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
