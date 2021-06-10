<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Tag;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;
use Windwalker\Legacy\Ioc;
use Windwalker\Legacy\Query\QueryElement;

/**
 * The TagField class.
 *
 * @method $this|mixed select2Options(array $value = null)
 * @method $this|bool ajax(bool $value = null)
 *
 * @since  1.0
 */
class TagListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::TAGS;

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
     * @return  string
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function buildInput($attrs)
    {
        $id = $attrs['id'];

        Select2Script::tag(
            '#' . $id,
            (array) $this->get('select2_options', []),
            (bool) $this->get('ajax', true)
        );

        return parent::buildInput($attrs);
    }

    /**
     * prepareOptions
     *
     * @return  array|\Windwalker\Legacy\Html\Option[]
     */
    protected function prepareOptions()
    {
        if (!LunaHelper::tableExists('tags') || !LunaHelper::tableExists('tag_maps')) {
            return [];
        }

        return parent::prepareOptions();
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

        if ($this->get('published')) {
            $query->where($query->quoteName($this->get('state_field', 'state')) . ' >= 1');
        }

        if ($ordering = $this->get('ordering', $this->ordering)) {
            $query->order($ordering);
        }

        $select = $this->get('select', '*');

        $query->select($select)
            ->from($query->quoteName($table));

        if ($this->get('ajax', true)) {
            $valueField = $this->get('value_field', $this->valueField);
            $value = $this->getValue();

            if (is_string($value)) {
                $value = array_filter(explode(',', $value), 'strlen');
            }

            $value = (array) $value;

            if ($value === []) {
                return [];
            }

            $query->where('%n %r', $valueField, new QueryElement('IN()', $value));
        }

        $this->postQuery($query);

        $postQuery = $this->get('post_query', $this->get('postQuery'));

        if (is_callable($postQuery)) {
            $postQuery($query, $this);
        }

        return (array) $db->setQuery($query)->loadAll();
    }

    /**
     * getAccessors
     *
     * @return  array
     *
     * @since   1.3
     */
    protected function getAccessors()
    {
        return array_merge(parent::getAccessors(), [
            'select2Options' => 'select2_options',
            'ajax',
        ]);
    }
}
