<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Columns\ConfigDataInterface;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Event\Event;
use Windwalker\Legacy\Record\Record;

/**
 * The ConfigRecord class.
 *
 * @since  1.0
 */
class ConfigRecord extends Record implements ConfigDataInterface
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::CONFIGS;

    /**
     * Property keys.
     *
     * @var  string
     */
    protected $keys = ['type', 'subtype'];

    /**
     * onAfterLoad
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterLoad(Event $event)
    {
        // Add your logic
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
