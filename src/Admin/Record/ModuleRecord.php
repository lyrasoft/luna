<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Traits\ModuleDataTrait;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Event\Event;
use Windwalker\Record\Record;

/**
 * The ModuleRecord class.
 *
 * @since  1.0
 */
class ModuleRecord extends Record
{
    use ModuleDataTrait;

    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::MODULES;

    /**
     * Property keys.
     *
     * @var  string
     */
    protected $keys = 'id';

    /**
     * onAfterLoad
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterLoad(Event $event)
    {
        if ($this->params && is_string($this->params)) {
            $this->params = json_decode($this->params);
        }
    }

    /**
     * onBeforeStore
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onBeforeStore(Event $event)
    {
        if ($this->params && !is_string($this->params)) {
            $this->params = json_encode($this->params);
        }
    }

    /**
     * onAfterStore
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterStore(Event $event)
    {
        // Add your logic
    }

    /**
     * onAfterDelete
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterDelete(Event $event)
    {
        // Add your logic
    }
}
