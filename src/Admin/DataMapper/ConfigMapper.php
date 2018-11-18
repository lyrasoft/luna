<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\DataMapper;

use Lyrasoft\Luna\Admin\Record\ConfigRecord;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\DataMapper\AbstractDatabaseMapperProxy;
use Windwalker\Event\Event;

/**
 * The ConfigMapper class.
 *
 * @since  1.0
 */
class ConfigMapper extends AbstractDatabaseMapperProxy
{
    /**
     * Property table.
     *
     * @var  string
     */
    protected static $table = LunaTable::CONFIGS;

    /**
     * Property keys.
     *
     * @var  string
     */
    protected static $keys = ['type', 'subtype'];

    /**
     * Property dataClass.
     *
     * @var  string
     */
    protected static $dataClass = ConfigRecord::class;

    /**
     * onAfterFind
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterFind(Event $event)
    {
        // Add your logic
    }

    /**
     * onAfterCreate
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterCreate(Event $event)
    {
        // Add your logic
    }

    /**
     * onAfterUpdate
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterUpdate(Event $event)
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

    /**
     * onAfterFlush
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterFlush(Event $event)
    {
        // Add your logic
    }

    /**
     * onAfterUpdateAll
     *
     * @param Event $event
     *
     * @return  void
     */
    public function onAfterUpdateAll(Event $event)
    {
        // Add your logic
    }
}
