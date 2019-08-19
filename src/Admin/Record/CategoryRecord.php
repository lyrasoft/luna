<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Record;

use Lyrasoft\Luna\Admin\Record\Columns\CategoryDataInterface;
use Lyrasoft\Luna\Admin\Record\Traits\ContentValidationTrait;
use Lyrasoft\Luna\Table\LunaTable;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Repository\Exception\ValidateFailException;
use Windwalker\Event\Event;
use Windwalker\Record\NestedRecord;

/**
 * The CategoryRecord class.
 *
 * @since  1.0
 */
class CategoryRecord extends NestedRecord implements CategoryDataInterface
{
    use ContentValidationTrait;

    /**
     * Property table.
     *
     * @var  string
     */
    protected $table = LunaTable::CATEGORIES;

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
     * Method to store a node in the database table.
     *
     * @param boolean $updateNulls True to update null values as well.
     *
     * @return NestedRecord True on success.
     *
     * @throws \Exception
     * @since   2.0
     */
    public function store($updateNulls = false)
    {
        return parent::store($updateNulls);
    }

    /**
     * Checks that the object is valid and able to be stored.
     *
     * This method checks that the parent_id is non-zero and exists in the database.
     * Note that the root node (parent_id = 0) cannot be manipulated with this class.
     *
     * @return  static  True if all checks pass.
     *
     * @throws  \Windwalker\Core\Repository\Exception\ValidateFailException
     * @throws  \Exception
     * @throws  \RuntimeException on database error.
     * @throws  \UnexpectedValueException
     * @since   2.0
     */
    public function validate()
    {
        $this->checkParent();

        try {
            $this->checkAlias('alias', ['parent_id', 'language']);
        } catch (ValidateFailException $e) {
            throw new ValidateFailException(
                __('phoenix.message.same.alias.same.level', $this->alias),
                $e->getCode(),
                $e
            );
        }

        parent::validate();

        return $this;
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
