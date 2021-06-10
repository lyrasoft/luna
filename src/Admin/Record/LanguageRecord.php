<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Traits\LanguageDataTrait;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Legacy\Event\Event;
use Windwalker\Legacy\Record\Record;

/**
 * The LanguageRecord class.
 *
 * @since  1.0
 */
class LanguageRecord extends Record
{
    use LanguageDataTrait;

    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::LANGUAGES;

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
