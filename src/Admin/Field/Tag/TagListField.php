<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Tag;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Script\Select2Script;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;

/**
 * The TagField class.
 *
 * @method $this|mixed select2Options(array $value)
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
     */
    public function buildInput($attrs)
    {
        $id = $attrs['id'];

        Select2Script::tag('#' . $id, (array) $this->get('select2_options', []));

        return parent::buildInput($attrs);
    }

    /**
     * prepareOptions
     *
     * @return  array|\Windwalker\Html\Option[]
     */
    protected function prepareOptions()
    {
        if (!LunaHelper::tableExists('tags') || !LunaHelper::tableExists('tag_maps')) {
            return [];
        }

        return parent::prepareOptions();
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
        ]);
    }
}
