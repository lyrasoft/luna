<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Field\Menu;

use Lyrasoft\Luna\Table\LunaTable;
use Phoenix\Field\ModalField;

/**
 * The MenuModalField class.
 *
 * @method  mixed|$this  menuType(string $value = null)
 *
 * @since  1.0
 */
class MenuModalField extends ModalField
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::MENUS;

    /**
     * Property view.
     *
     * @var  string
     */
    protected $view = 'menus';

    /**
     * Property package.
     *
     * @var  string
     */
    protected $package = 'admin';

    /**
     * Property titleField.
     *
     * @var  string
     */
    protected $titleField = 'title';

    /**
     * Property keyField.
     *
     * @var  string
     */
    protected $keyField = 'id';

    /**
     * getUrl
     *
     * @return  string
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function getUrl()
    {
        $query = $this->get('query', []);

        $query['type'] = $this->menuType();

        $this->set('query', $query);

        return parent::getUrl();
    }

    /**
     * getAccessors
     *
     * @return  array
     */
    protected function getAccessors()
    {
        return array_merge(parent::getAccessors(), [
            'menuType' => 'type'
        ]);
    }
}
