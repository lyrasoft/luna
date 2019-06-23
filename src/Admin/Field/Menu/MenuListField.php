<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Menu;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;
use Windwalker\Html\Option;
use Windwalker\Query\Query;

/**
 * The MenuField class.
 *
 * @method  mixed|$this  menuType(string $value = null)
 * @method  mixed|$this  showRoot(bool $value = null)
 * @method  mixed|$this  maxLevel(integer $value = null)
 * @method  mixed|$this  minLevel(integer $value = null)
 *
 * @since  1.0
 */
class MenuListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::MENUS;

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
        if (!LunaHelper::tableExists('menus')) {
            return [];
        }

        $options = parent::prepareOptions();

        if ($this->get('show_root', false)) {
            $langPrefix = LunaHelper::getLangPrefix();

            array_unshift(
                $options,
                new Option(__($langPrefix . '.menu.root'), '1')
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
            'menuType' => 'type',
            'showRoot' => 'show_root',
            'maxLevel' => 'max_level',
            'minLevel' => 'minLevel',
        ]);
    }
}
