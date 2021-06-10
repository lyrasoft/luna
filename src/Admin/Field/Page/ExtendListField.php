<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Page;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;
use Windwalker\Legacy\Ioc;

/**
 * The ModuleField class.
 *
 * @since  1.0
 */
class ExtendListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::PAGES;

    /**
     * Property valueField.
     *
     * @var  string
     */
    protected $valueField = 'extends';

    /**
     * Property textField.
     *
     * @var  string
     */
    protected $textField = 'name';

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = null;

    /**
     * buildInput
     *
     * @param array $attrs
     *
     * @return  mixed
     */
    public function buildInput($attrs)
    {
        $this->prepareScript();

        return parent::buildInput($attrs);
    }

    /**
     * getItems
     *
     * @return  \stdClass[]
     */
    protected function getItems()
    {
        $db = Ioc::getDatabase();

        $query = $db->getQuery(true);
        $table = $this->get('table', $this->table);

        if (!$table) {
            return [];
        }

        $select = $this->get('select', 'DISTINCT extends');

        $query->select($select)
            ->from($table)
            ->where('extends != ""')
            ->order('extends');

        $this->postQuery($query);

        $postQuery = $this->get('postQuery');

        if (is_callable($postQuery)) {
            $postQuery($query, $this);
        }

        $items = (array) $db->setQuery($query)->loadColumn();

        $items = array_combine($items, $items);

        $extends = LunaHelper::getPackage()->get('page.extends');

        foreach ((array) $extends as $extend => $name) {
            if (is_numeric($extend)) {
                $extend = $name;
            }

            $items[$extend] = $name;
        }

        ksort($items);

        $options = [];

        foreach ($items as $k => $n) {
            $name = $k === $n ? $n : $k . ' (' . __($n) . ')';

            $options[] = (object) [
                'name' => $name,
                'extends' => $k,
            ];
        }

        return $options;
    }

    /**
     * prepareScript
     *
     * @return  void
     */
    protected function prepareScript()
    {
        $options = (array) $this->get('options');

        if ($this->get('allow_add', false)) {
            $options['tags'] = true;

            Select2Script::select2('#' . $this->getId(), ['tags' => true, 'minimumResultsForSearch' => 0]);
        }
    }
}
