<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Menu;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Luna\Menu\MenuService;
use Lyrasoft\Luna\Script\Select2Script;
use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ItemListField;
use Windwalker\Ioc;

/**
 * The TypeListField class.
 *
 * @since  1.0
 */
class TypeListField extends ItemListField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::MENUS;

    /**
     * Property valueField.
     *
     * @var  string
     */
    protected $valueField = 'type';

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
     * @return  mixed|void
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
        $menuService = Ioc::service(MenuService::class);

        return $menuService->getMenuTypes();
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
