<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Module;

use Lyrasoft\Luna\Admin\Table\LunaTable;
use Lyrasoft\Luna\Module\ModuleHelper;
use Phoenix\Field\ItemListField;
use Windwalker\Html\Option;

/**
 * The ModuleField class.
 *
 * @since  1.0
 */
class ModuleListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::MODULES;

    /**
     * Property ordering.
     *
     * @var  string
     */
    protected $ordering = 'type';

    /**
     * createOption
     *
     * @param object $item
     * @param string $valueField
     * @param string $textField
     * @param array  $attribs
     *
     * @return  Option
     */
    protected function createOption($item, $valueField = 'id', $textField = 'title', $attribs = [])
    {
        $value = isset($item->$valueField) ? $item->$valueField : null;
        $text  = isset($item->$textField) ? $item->$textField : null;

        $moduleType = ModuleHelper::getModuleType($item->type);

        $text = sprintf(
            '[%s] %s',
            $moduleType->name,
            $text
        );

        return new Option($text, $value, $attribs);
    }
}
