<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Category;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;
use Windwalker\Core\Language\Translator;
use Windwalker\Html\Option;
use Windwalker\Query\Query;

/**
 * The CategoryField class.
 *
 * @method  mixed|$this  categoryType(string $value = null)
 * @method  mixed|$this  showRoot(bool $value = null)
 * @method  mixed|$this  maxLevel(integer $value = null)
 * @method  mixed|$this  minLevel(integer $value = null)
 *
 * @since  1.0
 */
class CategoryListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::CATEGORIES;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = 'lft';

    /**
     * postQuery
     *
     * @param Query $query
     *
     * @return  void
     */
    protected function postQuery(Query $query)
    {
        $type = $this->get('type');

        if ($type) {
            $query->where('type = ' . $query->quote($type));
        }

        if ($level = $this->get('max_level')) {
            $query->where('level <= ' . (int) $level);
        }

        if ($level = $this->get('min_level')) {
            $query->where('level >= ' . (int) $level);
        }

        $query->where('parent_id != 0');
    }

    /**
     * prepareOptions
     *
     * @return  array|\Windwalker\Html\Option[]
     */
    protected function prepareOptions()
    {
        if (!LunaHelper::tableExists('categories')) {
            return [];
        }

        $options = parent::prepareOptions();

        if ($this->get('show_root', false)) {
            $langPrefix = LunaHelper::getLangPrefix();

            array_unshift(
                $options,
                new Option(Translator::translate($langPrefix . '.category.root'), '1')
            );
        }

        return $options;
    }

    /**
     * getAccessors
     *
     * @return  array
     */
    protected function getAccessors()
    {
        return array_merge(parent::getAccessors(), [
            'categoryType' => 'type',
            'showRoot' => 'show_root',
            'maxLevel' => 'max_level',
            'minLevel' => 'minLevel',
        ]);
    }
}
