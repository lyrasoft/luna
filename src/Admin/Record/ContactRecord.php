<?php
/**
 * Part of Luna project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Traits\ContactDataTrait;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Event\Event;
use Windwalker\Legacy\Record\Record;

/**
 * The ContactRecord class.
 *
 * @since  1.0
 */
class ContactRecord extends Record
{
    use ContactDataTrait;

    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::CONTACTS;

    /**
     * Property keys.
     *
     * @var  string
     */
    protected $keys = 'id';

    /**
     * Property casts.
     *
     * @var  array
     */
    protected $casts = [
        'state' => 'integer',
        'details' => 'json',
    ];

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
